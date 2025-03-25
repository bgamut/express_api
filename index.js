// Import Express
const express = require('express');
const app = express();

const port = ProcessingInstruction.env.PORT || 8080;
// Define a route
app.get('/', (req, res) => {
    res.send('Welcome to the Express.js Tutorial');
});
app.get('/light', (req, res) => {
    res.send('test light api ');
});
// Start the server
app.listen(port, () => {
    'Server started on port ${port}';
});


