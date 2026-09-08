import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const verificationApi = {
  // Overall verification status
  getStatus: async () => {
    return apiClient.get(ENDPOINTS.VERIFICATION.STATUS);
  },

  // Identity verification status
  getIdentityStatus: async () => {
    return apiClient.get(ENDPOINTS.VERIFICATION.IDENTITY_STATUS);
  },

  // Submit identity verification document (Multipart/Form-Data)
  submitIdentity: async (data) => {
    if (data instanceof FormData) {
      if (!data.has("file") && data.has("front_image")) {
        data.append("file", data.get("front_image"));
      }
      if (!data.has("filename") && data.has("file")) {
        data.append("filename", data.get("file"));
      }
      if (!data.has("name") && data.has("document_type")) {
        data.append("name", data.get("document_type"));
      }
      return apiClient.upload(ENDPOINTS.VERIFICATION.IDENTITY_SUBMIT, data);
    }

    const formData = new FormData();
    if (data?.file) {
      formData.append("file", data.file);
      formData.append("filename", data.file);
    }
    if (data?.name) formData.append("name", data.name);
    return apiClient.upload(ENDPOINTS.VERIFICATION.IDENTITY_SUBMIT, formData);
  },

  // Submit business verification document (Multipart/Form-Data)
  submitBusiness: async (data) => {
    if (data instanceof FormData) {
      if (!data.has("file") && data.has("document")) {
        data.append("file", data.get("document"));
      }
      if (!data.has("name") && data.has("business_name")) {
        data.append("name", data.get("business_name"));
      }
      if (!data.has("filename") && data.has("file")) {
        data.append("filename", data.get("file")?.name || "business_document.jpg");
      }
      return apiClient.upload(ENDPOINTS.VERIFICATION.BUSINESS_SUBMIT, data);
    }

    const formData = new FormData();
    if (data?.file) formData.append("file", data.file);
    if (data?.name) formData.append("name", data.name);
    if (data?.filename) formData.append("filename", data.filename);
    return apiClient.upload(ENDPOINTS.VERIFICATION.BUSINESS_SUBMIT, formData);
  },

  // Resubmit verification
  resubmit: async (recordId, data) => {
    const formData = data instanceof FormData ? data : new FormData();
    if (!(data instanceof FormData)) {
      if (data?.file) formData.append("file", data.file);
      if (data?.name) formData.append("name", data.name);
      if (data?.filename) formData.append("filename", data.filename);
    }
    return apiClient.upload(ENDPOINTS.VERIFICATION.RESUBMIT(recordId), formData);
  },
};

export default verificationApi;
