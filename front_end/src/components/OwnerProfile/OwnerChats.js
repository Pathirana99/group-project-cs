// src/components/OwnerProfile/OwnerChat.js
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Divider, Paper, Box, TextField, Button } from '@mui/material';

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
    <Box sx={{ display: 'flex', height: '100%',marginTop:'32px' }}>
      {/* Conversation List */}
      <Paper sx={{ width: '30%', maxHeight: '100vh', overflowY: 'auto', padding: 2,backgroundColor:'white',borderLeft:'4px solid #00BFB4' }}>
        <Typography variant="h6" sx={{ mb: 2 ,fontSize:'24px'}}>Conversations</Typography>
        <List>
          {conversations.map((conv) => (
            <ListItem
            sx={{color:'black'}}
              button
              key={conv.id}
              selected={selectedChat === conv.id}
              onClick={() => fetchMessages(conv.id)}
            >
              <ListItemText primary={conv.user} sx={{padding:'10px'}}/>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Chat Messages */}
      <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column', maxHeight: '100vh', padding: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 ,fontSize:"32px",fontWeight:'600',color:'#3DC0B9',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>
          {selectedChat ? `Chat with ${conversations.find(c => c.id === selectedChat)?.user}` : 'Select a conversation'}
        </Typography>
        
        <Box sx={{ flex: 1, overflowY: 'auto', padding: 1}}>
          {messages.map((msg, index) => (
            <Box key={index} sx={{ mb: 1, textAlign: msg.sender === 'Owner' ? 'right' : 'left' }}>
              <Typography variant="body1"  >
                {msg.text}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Message Input */}
        {selectedChat && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button variant="contained" sx={{ml: 1,backgroundColor: '#00BFB4', color: '#fff',padding:'10px 10px',marginTop:'-20px','&:hover': { backgroundColor: '#009A8F' }}} onClick={handleSendMessage}>
              Send
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default OwnerChats;
