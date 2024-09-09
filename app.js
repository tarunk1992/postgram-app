// 



const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const { MONGOURI } = require('./config/keys');

const path = require("path");

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

mongoose.connect(MONGOURI);
mongoose.connection.on('connected', () => {
    console.log('connected to mongo yeee');
});
mongoose.connection.on('error', (err) => {
    console.log("error connecting", err);
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'clientSide', 'build' ,'index.html')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'clientSide', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log("server is running", PORT);
});
