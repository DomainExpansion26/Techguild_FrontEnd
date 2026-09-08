export const messagingApi = {
  getConversations: async () => [],
  sendMessage: async (recipientId, text) => ({ id: Date.now().toString(), recipientId, text }),
};
export default messagingApi;
