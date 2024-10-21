import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Typography,IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; 

export default function ChatPopup({ open, handleClose, ownerName }) {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // Add the new message to the chat history (for now, it will be static without a backend)
    setChatMessages([...chatMessages, { sender: 'User', content: message }]);
    setMessage(''); // Clear the input
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Chat with {ownerName}
      <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="chat-box" style={{ minHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
          {chatMessages.length === 0 ? (
            <Typography>No messages yet.</Typography>
          ) : (
            chatMessages.map((msg, index) => (
              <Typography key={index}>
                <strong>{msg.sender}:</strong> {msg.content}
              </Typography>
            ))
          )}
        </div>

        {/* Message Input Field */}
        <TextField
          fullWidth
          placeholder="Type your message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />

        {/* Send Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          style={{ marginTop: '10px', display: 'block', marginLeft: 'auto',backgroundColor: '#00BFB4', color: '#fff' ,'&:hover': { backgroundColor: '#009A8F' }}}
        >
          Send
        </Button>
      </DialogContent>
    </Dialog>
  );
}
