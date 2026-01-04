import axios from 'axios';
// import { db } from '../firebase/config';
// import { collection, addDoc, query, where, orderBy, getDocs, deleteDoc } from 'firebase/firestore';

// URL ke backend proxy
const BACKEND_API_URL = 'http://localhost:3001/api/chat';

const ChatService = {
  // eslint-disable-next-line no-unused-vars
  async sendMessage(messageText, guestId) {
    try {
      console.log('Sending message to backend:', messageText);

      // Save user message to Firestore
      // await this.saveMessage(guestId, messageText, 'user');

      // Send message to backend
      const response = await axios.post(BACKEND_API_URL, {
        message: messageText
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000 // 30 second timeout
      });

      console.log('Backend API Response:', response.data);

      const botResponse = response.data.response || 'Maaf, tidak ada respons dari bot.';

      // Save bot response to Firestore
      // await this.saveMessage(guestId, botResponse, 'bot');

      return botResponse;
    } catch (error) {
      console.error('Error calling Backend API:', error);

      // Save error message to Firestore
      // const errorMessage = 'Maaf, terjadi kesalahan. Silakan coba lagi.';
      // await this.saveMessage(guestId, errorMessage, 'bot');

      // Handle different error types
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Backend server tidak berjalan. Pastikan server backend sudah dijalankan di port 3001.');
      } else if (error.response) {
        throw new Error(`Backend error: ${error.response.data?.error || error.response.statusText}`);
      } else if (error.request) {
        throw new Error('Tidak dapat terhubung ke backend server. Periksa koneksi internet Anda.');
      } else {
        throw new Error(`Error: ${error.message}`);
      }
    }
  },

  async saveMessage(guestId, text, type) {
    try {
      /*
      const messageData = {
        guestId,
        text,
        type,
        timestamp: new Date(),
        id: `${type}-${Date.now()}`
      };
      await addDoc(collection(db, 'chatMessages'), messageData);
      */
      console.log('Firebase saveMessage disabled:', { guestId, text, type });
    } catch (error) {
      console.error('Error saving message to Firestore:', error);
      throw error;
    }
  },

  async getChatHistory(guestId) {
    try {
      /*
      const q = query(
        collection(db, 'chatMessages'),
        where('guestId', '==', guestId),
        orderBy('timestamp', 'asc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data());
      */
      console.log('Firebase getChatHistory disabled for guestId:', guestId);
      return [];
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  },

  async getUniqueGuestIds() {
    try {
      /*
      const q = query(collection(db, 'chatMessages'));
      const querySnapshot = await getDocs(q);
      const guestIds = new Set(querySnapshot.docs.map(doc => doc.data().guestId));
      return Array.from(guestIds).sort();
      */
      console.log('Firebase getUniqueGuestIds disabled');
      return [];
    } catch (error) {
      console.error('Error fetching unique guest IDs:', error);
      return [];
    }
  },

  async clearChatHistory(guestId) {
    try {
      /*
      const q = query(
        collection(db, 'chatMessages'),
        where('guestId', '==', guestId)
      );
      const querySnapshot = await getDocs(q);
      const deletePromises = [];
      querySnapshot.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
      });
      await Promise.all(deletePromises);
      */
      console.log(`Firebase clearChatHistory disabled for guestId ${guestId}`);
    } catch (error) {
      console.error('Error clearing chat history:', error);
      throw new Error('Gagal menghapus riwayat chat: ' + error.message);
    }
  }
};

export default ChatService;