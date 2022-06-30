const express = require('express');
require('dotenv').config();
const path = require('path');

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

const SHEET_API = require('../helper_functions/sheet_api');

app.post('/fetch_data', async (req, res) => {
    let body = req.body;
    let result = await SHEET_API.get_data(body.sheet_id, body.sheet_name);
    res.send(result);
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`The web server has started on port ${PORT}`);
});