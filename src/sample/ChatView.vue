```vue
<template>
  <div class="chat-view">
    <div class="chat-header">
      <div class="bot-avatar">🤖</div>
      <div class="chat-info">
        <h3>Assistant Bot</h3>
        <div class="status">
          <div class="status-dot"></div>
          Online
        </div>
      </div>
    </div>
    
    <div class="messages-container" ref="messagesContainer">
      <div v-for="message in messages" :key="message.id" 
           :class="['message', message.type]">
        <div class="message-bubble">
          {{ message.text }}
        </div>
      </div>
      
      <div v-if="isTyping" class="typing-indicator">
        <div class="typing-bubble">
          <div class="typing-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="chat-input">
      <div class="input-container">
        <textarea v-model="currentMessage" 
                  @input="adjustTextareaHeight"
                  @keydown.enter.prevent="sendMessage"
                  class="input-field" 
                  placeholder="Ketik pesan Anda..."
                  :disabled="isTyping"></textarea>
        <button @click="sendMessage" 
                @mousedown="startLongPress"
                @mouseup="endLongPress"
                @mouseleave="endLongPress"
                @touchstart="startLongPress"
                @touchend="endLongPress"
                :disabled="!currentMessage.trim() || isTyping"
                class="send-button">
          ➤
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import ChatService from '../services/ChatService';

export default {
  name: 'ChatView',
  setup() {
    const messages = ref([]);
    const currentMessage = ref('');
    const isTyping = ref(false);
    const guestId = ref('');
    let longPressTimer = null;
    const longPressDuration = 1000; // 1 second for long press
    const isLongPress = ref(false); // Track if long-press occurred

    // Initialize guest ID
    onMounted(async () => {
      let storedGuestId = localStorage.getItem('guestId');
      if (!storedGuestId) {
        storedGuestId = uuidv4();
        localStorage.setItem('guestId', storedGuestId);
      }
      guestId.value = storedGuestId;

      // Fetch chat history
      const history = await ChatService.getChatHistory(guestId.value);
      messages.value = history.length > 0 ? history : [
        {
          id: `bot-${Date.now()}`,
          type: 'bot',
          text: 'Halo! Saya adalah assistant bot Anda. Bagaimana saya bisa membantu Anda hari ini?',
          timestamp: new Date()
        }
      ];
      await scrollToBottom();
    });

    const sendMessage = async () => {
      if (isLongPress.value) return; // Prevent sendMessage if long-press occurred
      if (!currentMessage.value.trim() || isTyping.value) return;

      const userMessage = {
        id: `user-${Date.now()}`,
        type: 'user',
        text: currentMessage.value,
        timestamp: new Date(),
      };

      messages.value.push(userMessage);
      const messageText = currentMessage.value;
      currentMessage.value = '';
      await scrollToBottom();
      isTyping.value = true;

      try {
        const botResponseText = await ChatService.sendMessage(messageText, guestId.value);
        messages.value.push({
          id: `bot-${Date.now()}`,
          type: 'bot',
          text: botResponseText,
          timestamp: new Date(),
        });
      } catch (error) {
        console.error('Error in sendMessage:', error);
        messages.value.push({
          id: `bot-${Date.now()}`,
          type: 'bot',
          text: error.message || 'Maaf, terjadi kesalahan. Silakan coba lagi.',
          timestamp: new Date(),
        });
      } finally {
        isTyping.value = false;
        await scrollToBottom();
      }
    };

    const clearChatHistory = async () => {
      try {
        await ChatService.clearChatHistory(guestId.value);
        messages.value = [
          {
            id: `bot-${Date.now()}`,
            type: 'bot',
            text: 'Halo! Saya adalah assistant bot Anda. Bagaimana saya bisa membantu Anda hari ini?',
            timestamp: new Date()
          }
        ];
        await scrollToBottom();
      } catch (error) {
        console.error('Error clearing chat history:', error);
        messages.value.push({
          id: `bot-${Date.now()}`,
          type: 'bot',
          text: 'Maaf, terjadi kesalahan saat menghapus riwayat chat: ' + error.message,
          timestamp: new Date(),
        });
      }
    };

    const startLongPress = () => {
      isLongPress.value = false; // Reset at the start
      longPressTimer = setTimeout(() => {
        isLongPress.value = true; // Mark as long-press
        clearChatHistory();
      }, longPressDuration);
    };

    const endLongPress = () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    };

    const scrollToBottom = async () => {
      await nextTick();
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    };

    const adjustTextareaHeight = (event) => {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
    };

    return {
      messages,
      currentMessage,
      isTyping,
      sendMessage,
      adjustTextareaHeight,
      startLongPress,
      endLongPress
    };
  }
};
</script>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  padding: 20px 25px;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
}

.bot-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.chat-info h3 {
  font-size: 18px;
  margin-bottom: 2px;
}

.chat-info .status {
  font-size: 14px;
  color: #34c759;
  display: flex;
  align-items: center;
  gap: 5px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #34c759;
}

.messages-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
}

.message {
  margin-bottom: 15px;
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-bubble {
  max-width: 80%;
  padding: 12px 18px;
  border-radius: 20px;
  word-wrap: break-word;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.message.user {
  display: flex;
  justify-content: flex-end;
}

.message.user .message-bubble {
  background: linear-gradient(135deg, #007AFF 0%, #0051d5 100%);
  color: white;
  border-bottom-right-radius: 6px;
}

.message.bot {
  display: flex;
  justify-content: flex-start;
}

.message.bot .message-bubble {
  background: white;
  color: #333;
  border-bottom-left-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.typing-indicator {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
}

.typing-bubble {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  border-bottom-left-radius: 6px;
  padding: 15px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #c7c7cc;
  animation: typing 1.4s infinite;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-10px); }
}

.chat-input {
  padding: 20px;
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.input-container {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

.input-field {
  flex: 1;
  border: 2px solid #e5e5e7;
  border-radius: 25px;
  padding: 12px 20px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  resize: none;
  max-height: 100px;
  min-height: 45px;
}

.input-field:focus {
  border-color: #007AFF;
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
}

.send-button {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #007AFF 0%, #0051d5 100%);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 18px;
}

.send-button:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 122, 255, 0.3);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
</style>