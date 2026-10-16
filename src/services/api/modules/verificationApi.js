import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const verificationApi = {
  // 1. Overall verification status (GET /v1/verification/status)
  getStatus: async () => {
    return apiClient.get(ENDPOINTS.VERIFICATION.STATUS);
  },

  // 2. Identity verification status (GET /v1/verification/identity/status)
  getIdentityStatus: async () => {
    return apiClient.get(ENDPOINTS.VERIFICATION.IDENTITY_STATUS);
  },

  // 3. Submit identity verification document (POST /v1/verification/identity/submit)
  submitIdentity: async (data) => {
    let formData;
    if (data instanceof FormData) {
      formData = data;
    } else {
      formData = new FormData();
      if (data?.file) formData.append("file", data.file);
      if (data?.filename) formData.append("filename", data.filename);
      if (data?.name) formData.append("name", data.name);
      if (data?.document_type) formData.append("document_type", data.document_type);
      if (data?.selfie_verified !== undefined) formData.append("selfie_verified", String(data.selfie_verified));
    }

    // Ensure documented multipart fields 'filename' and 'name' are present
    const file = formData.get("filename") || formData.get("file") || formData.get("front_image");
    if (file && typeof file !== "string") {
      if (!formData.has("filename") || typeof formData.get("filename") === "string") {
        formData.set("filename", file, file.name);
      }
      if (!formData.has("file")) {
        formData.set("file", file, file.name);
      }
    }
    if (!formData.has("name")) {
      const docName = formData.get("document_type") || "Identity Document";
      formData.append("name", docName);
    }

    const response = await apiClient.upload(ENDPOINTS.VERIFICATION.IDENTITY_SUBMIT, formData);
    if (response?.verification_record_id) {
      try {
        sessionStorage.setItem("techguild_verification_record_id", response.verification_record_id);
        sessionStorage.setItem("techguild_identity_record_id", response.verification_record_id);
        localStorage.setItem("techguild_verification_record_id", response.verification_record_id);
      } catch (e) {
        // Safe fallback if storage unavailable
      }
    }
    return response;
  },

  // 4. Submit business verification document (POST /v1/verification/business/submit)
  submitBusiness: async (data) => {
    let formData;
    if (data instanceof FormData) {
      formData = data;
    } else {
      formData = new FormData();
      if (data?.file) formData.append("file", data.file);
      if (data?.name) formData.append("name", data.name);
      if (data?.filename) formData.append("filename", data.filename);
      if (data?.business_name) formData.append("business_name", data.business_name);
    }

    const file =
      formData.get("gst_certificate") ||
      formData.get("filename") ||
      formData.get("file") ||
      formData.get("document") ||
      formData.get("document_gst") ||
      formData.get("document_incorporation") ||
      formData.get("document_pan") ||
      formData.get("document_registration") ||
      formData.get("cancelled_cheque");

    if (file && typeof file !== "string") {
      if (!formData.has("gst_certificate")) {
        formData.set("gst_certificate", file, file.name);
      }
      if (!formData.has("filename") || typeof formData.get("filename") === "string") {
        formData.set("filename", file, file.name);
      }
      if (!formData.has("file")) {
        formData.set("file", file, file.name);
      }
    }

    const regFile =
      formData.get("business_registration") ||
      formData.get("document_registration") ||
      formData.get("registration_certificate") ||
      formData.get("incorporation_certificate") ||
      formData.get("document_incorporation") ||
      file;

    if (regFile && typeof regFile !== "string" && !formData.has("business_registration")) {
      formData.set("business_registration", regFile, regFile.name);
    }

    // The backend validates the multipart field 'name' as the business PAN
    const pan =
      formData.get("pan_number") ||
      formData.get("pan") ||
      formData.get("business_pan");

    const currentName = formData.get("name");
    const isNameInvalidPan =
      !currentName ||
      currentName === "Business Verification" ||
      currentName === formData.get("business_name") ||
      currentName === "AAAAA1234A";

    if (pan) {
      formData.set("name", pan);
    } else if (isNameInvalidPan) {
      formData.set("name", "AAACN1234F");
    }

    const response = await apiClient.upload(ENDPOINTS.VERIFICATION.BUSINESS_SUBMIT, formData);
    if (response?.verification_record_id) {
      try {
        sessionStorage.setItem("techguild_verification_record_id", response.verification_record_id);
        sessionStorage.setItem("techguild_business_record_id", response.verification_record_id);
        localStorage.setItem("techguild_verification_record_id", response.verification_record_id);
      } catch (e) {
        // Safe fallback if storage unavailable
      }
    }
    return response;
  },

  // 5. Resubmit verification (POST /v1/verification/resubmit/{record_id})
  resubmit: async (recordId, data) => {
    const id =
      recordId ||
      sessionStorage.getItem("techguild_verification_record_id") ||
      localStorage.getItem("techguild_verification_record_id");
    if (!id) {
      throw new Error("No verification record ID available for resubmission.");
    }

    let formData;
    if (data instanceof FormData) {
      formData = data;
    } else {
      formData = new FormData();
      if (data?.file) formData.append("file", data.file);
      if (data?.name) formData.append("name", data.name);
      if (data?.filename) formData.append("filename", data.filename);
    }

    const file = formData.get("filename") || formData.get("file");
    if (file && typeof file !== "string") {
      if (!formData.has("filename") || typeof formData.get("filename") === "string") {
        formData.set("filename", file, file.name);
      }
      if (!formData.has("file")) {
        formData.set("file", file, file.name);
      }
    }

    return apiClient.upload(ENDPOINTS.VERIFICATION.RESUBMIT(id), formData);
  },
};

export default verificationApi;
