const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/chat', (req, res) => {
    const username = req.session.username; // Access username from local storage
  const chatHistory = readChatHistory(); // Read chat history from file

  const chatForm = `
  
    <h1>Chat Box</h1>
    <form action="/chat" method="POST">
      <input type="text" name="message">
      <button type="submit">Send</button>
    </form>`;
  const chatHistoryHTML = chatHistory.map(({ username, message }) => {
    return `<p>${username}: ${message}</p>`;
  }).join('');

  res.send('<h3>Messages</h3>'+chatHistoryHTML + chatForm);
});

router.post('/chat', (req, res) => {
  const { message } = req.body;
  const username = req.session.username; 
  appendMessageToFile(username, message); // Append message to the file
  res.redirect('/chat');
});

function readChatHistory() {
  try {
    const data = fs.readFileSync('messages.txt', 'utf8');
    const messages = data.split('\n').filter(Boolean).map((line) => {
      const [username, message] = line.split(': ');
      return { username, message };
    });
    return messages;
  } catch (error) {
    console.error('Error reading chat history:', error);
    return [];
  }
}

function appendMessageToFile(username, message) {
  const messageToAppend = `${username}: ${message}\n`;
  fs.appendFile('messages.txt', messageToAppend, (err) => {
    if (err) {
      console.error('Error appending message to file:', err);
    }
  });
}

module.exports = router;
