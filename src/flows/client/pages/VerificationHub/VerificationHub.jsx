import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/Components";
import { verificationApi } from "@/features/verification/api/verificationApi";

export default function VerificationHub() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [businessName, setBusinessName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [regDocument, setRegDocument] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchVerificationStatus();
  }, []);

  const fetchVerificationStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await verificationApi.getStatus();
      setStatus(res?.data || res);
    } catch (err) {
      console.warn("Error fetching client verification status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBusinessVerification = async (e) => {
    e.preventDefault();
    if (!regDocument && !taxId.trim()) {
      setFeedbackMsg({ type: "error", text: "Please provide a Tax ID / Registration number or upload your incorporation certificate." });
      return;
    }

    setSubmitting(true);
    setFeedbackMsg({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("business_name", businessName);
      formData.append("tax_id", taxId);
      if (regDocument) {
        formData.append("document", regDocument);
      }

      await verificationApi.submitBusiness(formData);
      setFeedbackMsg({ type: "success", text: "Business documents submitted for compliance review!" });
      fetchVerificationStatus();
    } catch (err) {
      console.error("Business verification error:", err);
      setFeedbackMsg({ type: "error", text: err?.message || "Failed to submit verification documents." });
    } finally {
      setSubmitting(false);
    }
  };

  const isApproved = status?.business_status === "approved" || status?.status === "approved";
  const isPending = status?.business_status === "pending" || status?.status === "pending";

  return (
    <DashboardLayout>
      <div style={{ padding: "32px 40px", maxWidth: "900px", margin: "0 auto" }}>
        <header className="mb-4">
          <h1 className="fs-3 fw-bold mb-1">Business &amp; Company Verification</h1>
          <p className="text-secondary mb-0">Verify your enterprise or agency credentials to unlock verified employer badges and higher escrow limits.</p>
        </header>

        {error && <div className="alert alert-danger mb-4">{error}</div>}

        {isApproved ? (
          <div className="card p-5 border-success text-center bg-white shadow-sm rounded-3">
            <div className="fs-1 mb-2">🛡️</div>
            <h3 className="fs-4 fw-bold text-success mb-2">Your Business is Fully Verified!</h3>
            <p className="text-secondary mb-0">Your company has passed all compliance requirements. You have verified status across the marketplace.</p>
          </div>
        ) : isPending ? (
          <div className="card p-5 border-warning text-center bg-white shadow-sm rounded-3">
            <div className="fs-1 mb-2">⏳</div>
            <h3 className="fs-4 fw-bold text-warning-emphasis mb-2">Verification Under Review</h3>
            <p className="text-secondary mb-0">Our compliance officers are reviewing your business incorporation documents. We will notify you upon approval.</p>
          </div>
        ) : (
          <div className="card p-4 border rounded-3 shadow-sm bg-white">
            <h4 className="fs-5 fw-bold mb-3">Submit Company Documents</h4>

            {feedbackMsg.text && (
              <div className={`alert ${feedbackMsg.type === "success" ? "alert-success" : "alert-danger"} py-2`}>
                {feedbackMsg.text}
              </div>
            )}

            <form onSubmit={handleSubmitBusinessVerification}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Company / Entity Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Acme Technologies Inc."
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Tax ID / CIN / GST / Business Registration Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. US-EIN-987654321 or GSTIN"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Certificate of Incorporation / Business Proof (PDF or Image)</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="form-control"
                  onChange={(e) => setRegDocument(e.target.files[0])}
                />
                {regDocument && (
                  <small className="text-success mt-1 d-block">
                    Selected document: {regDocument.name}
                  </small>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary px-4 py-2"
                style={{ backgroundColor: "#103ca4", borderColor: "#103ca4" }}
                disabled={submitting}
              >
                {submitting ? "Submitting for Verification..." : "Submit Documents"}
              </button>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
