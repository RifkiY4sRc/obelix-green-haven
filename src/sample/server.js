const express = require('express');
const cors = require('cors');
const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Path ke service account key file
const keyFilePath = path.join(__dirname, 'virtual-dynamo-478710-n7-74b14b2bf2b8.json');

// Inisialisasi Google Auth
const auth = new GoogleAuth({
  keyFile: keyFilePath,
  scopes: ['https://www.googleapis.com/auth/dialogflow']
});

const DIALOGFLOW_API_URL = 'https://dialogflow.googleapis.com/v3/projects/virtual-dynamo-478710-n7/locations/global/agents/5f750e3f-7665-4628-bc5e-7c34c5e1c5c6/sessions/';

// Endpoint untuk chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    console.log('Received message:', message);
    
    // Dapatkan access token
    const authClient = await auth.getClient();
    const accessTokenResponse = await authClient.getAccessToken();
    const accessToken = accessTokenResponse.token;
    
    console.log('Access token obtained successfully');
    
    // Generate session ID
    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Kirim ke Dialogflow
    const dialogflowResponse = await axios.post(
      `${DIALOGFLOW_API_URL}${sessionId}:detectIntent`,
      {
        queryInput: {
          text: { 
            text: message 
          },
          languageCode: 'id',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('Dialogflow response received');
    
    // Extract response
    let botResponse = 'Maaf, tidak ada respons dari bot.';
    const responseMessages = dialogflowResponse.data.queryResult?.responseMessages;
    
    if (responseMessages && responseMessages.length > 0) {
      const textMessage = responseMessages.find(msg => msg.text);
      if (textMessage && textMessage.text && textMessage.text.text && textMessage.text.text.length > 0) {
        botResponse = textMessage.text.text[0];
      }
    }
    
    // Juga cek fulfillmentText sebagai fallback
    if (botResponse === 'Maaf, tidak ada respons dari bot.' && dialogflowResponse.data.queryResult?.fulfillmentText) {
      botResponse = dialogflowResponse.data.queryResult.fulfillmentText;
    }
    
    console.log('Bot response:', botResponse);
    
    res.json({ 
      response: botResponse,
      sessionId: sessionId 
    });
    
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Looking for service account key at: ${keyFilePath}`);
});