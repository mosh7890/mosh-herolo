const express = require('express');
const compression = require('compression');
const favicon = require('express-favicon');

const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(compression());
app.use(favicon(path.join(__dirname, 'dist/m.png')));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port);