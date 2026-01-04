import axios, { AxiosError } from 'axios';
import { getFullChatUrl, API_CONFIG } from '@/config/api';

export interface ChatResponse {
    response: string;
    sessionId: string;
}

export interface ChatError {
    message: string;
    type: 'connection' | 'server' | 'timeout' | 'unknown';
}

/**
 * Send a message to the chatbot backend and get a response
 */
export const sendMessage = async (
    messageText: string,
    guestId: string
): Promise<string> => {
    try {
        console.log('Sending message to backend:', messageText);

        const response = await axios.post<ChatResponse>(
            getFullChatUrl(),
            { message: messageText },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: API_CONFIG.TIMEOUT,
            }
        );

        console.log('Backend API Response:', response.data);

        const botResponse = response.data.response || 'Maaf, tidak ada respons dari bot.';
        return botResponse;
    } catch (error) {
        console.error('Error calling Backend API:', error);
        throw handleChatError(error);
    }
};

/**
 * Handle and format chat errors for user-friendly messages
 */
const handleChatError = (error: unknown): Error => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        // Connection refused - backend server not running
        if (axiosError.code === 'ECONNREFUSED' || axiosError.code === 'ERR_NETWORK') {
            return new Error(
                'Backend server tidak berjalan. Pastikan server backend sudah dijalankan di port 3001.'
            );
        }

        // Timeout
        if (axiosError.code === 'ECONNABORTED') {
            return new Error(
                'Permintaan timeout. Server membutuhkan waktu terlalu lama untuk merespons.'
            );
        }

        // Server responded with error
        if (axiosError.response) {
            const errorData = axiosError.response.data as { error?: string };
            return new Error(
                `Backend error: ${errorData.error || axiosError.response.statusText}`
            );
        }

        // Request made but no response
        if (axiosError.request) {
            return new Error(
                'Tidak dapat terhubung ke backend server. Periksa koneksi internet Anda.'
            );
        }
    }

    // Unknown error
    return new Error(
        error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.'
    );
};

export default {
    sendMessage,
};
