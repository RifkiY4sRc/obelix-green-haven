// API Configuration
export const API_CONFIG = {
    BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://34.34.222.106:3001',
    CHAT_ENDPOINT: '/api/chat',
    TIMEOUT: 30000, // 30 seconds
};

export const getFullChatUrl = () => `${API_CONFIG.BACKEND_URL}${API_CONFIG.CHAT_ENDPOINT}`;
