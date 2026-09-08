export const usersApi = {
  getUserProfile: async (userId) => ({ id: userId, name: "User" }),
  updateUserProfile: async (userId, data) => ({ id: userId, ...data }),
};
export default usersApi;
