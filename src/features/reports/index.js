export const reportsApi = {
  getReports: async () => [],
  generateReport: async (type) => ({ id: Date.now().toString(), type, status: "generated" }),
};
export default reportsApi;
