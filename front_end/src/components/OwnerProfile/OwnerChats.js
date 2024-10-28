import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Divider, Paper, Box, TextField, Button, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OwnerChats = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch conversation list for the owner (mock data for now)
    setConversations([
      { id: 1, user: 'User1' },
      { id: 2, user: 'User2' },
      { id: 3, user: 'User3' },
    ]);
  }, []);

  const fetchMessages = (conversationId) => {
    // Fetch messages based on conversation ID (mock data for now)
    const chatMessages = {
      1: [{ sender: 'User1', text: 'Hello!' }, { sender: 'Owner', text: 'Hi, how can I help you?' }],
      2: [{ sender: 'User2', text: 'Is the room available?' }, { sender: 'Owner', text: 'Yes, it is.' }],
      3: [{ sender: 'User3', text: 'Can we arrange a visit?' }, { sender: 'Owner', text: 'Sure, when would you like to come?' }],
    };
    setMessages(chatMessages[conversationId] || []);
    setSelectedChat(conversationId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [...prev, { sender: 'Owner', text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <Box sx={{ height: '100%', marginTop: '32px'}}>
      {/* Display Conversation List or Messages based on selectedChat */}
      {selectedChat === null ? (
        // Conversation List
        <Paper sx={{ maxHeight: '100vh', overflowY: 'auto', padding: 2, backgroundColor: 'white', borderLeft: '4px solid #00BFB4' }}>
          <Typography variant="h6" sx={{ mb: 2, fontSize: '24px' }}>Conversations</Typography>
          <List>
            {conversations.map((conv) => (
              <ListItem
                button
                key={conv.id}
                onClick={() => fetchMessages(conv.id)}
                sx={{ padding: '10px', color: 'black' }}
              >
                <ChatBubbleOutlineIcon sx={{ mr: 1 }} />
                <ListItemText primary={conv.user} />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        // Chat Messages
        <Paper sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100vh', padding: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={() => setSelectedChat(null)} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: '24px', color: '#3DC0B9', fontFamily: '"Josefin Sans", sans-serif' }}>
              Chat with {conversations.find(c => c.id === selectedChat)?.user}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', padding: 1 }}>
            {messages.map((msg, index) => (
              <Box key={index} sx={{ mb: 1, textAlign: msg.sender === 'Owner' ? 'right' : 'left' }}>
                <Typography variant="body1">{msg.text}</Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Message Input */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: 'center', 
            gap: 1 
          }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              sx={{ mb: { xs: 1, sm: 0 } }}
            />
            <Button
              variant="contained"
              sx={{
                ml: 1,
                backgroundColor: '#00BFB4',
                marginTop:'-20px',
                color: '#fff',
                padding: { xs: '6px 10px', sm: '10px 20px' },
                width: { xs: '100%', sm: 'auto' },
                '&:hover': { backgroundColor: '#009A8F' },
              }}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default OwnerChats;
