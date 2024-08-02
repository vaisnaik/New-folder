const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 6200;


const API_KEY = '2ffde4d2b9c92d19a1b81cae1b21724b';


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    
    if (!city) {
        return res.status(400).send('City query parameter is required');
    }

    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});
