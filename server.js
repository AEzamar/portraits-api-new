const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;
const path = require('path');

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));

const portraits = {
    'head of boy': {
        'author': 'Lucien Freud',
        'year': 1956,
        'technique': 'Oil on Canvas',
        'source': '/imgs/head-of-boy.jpg'
    },
    'ella': {
        'author': 'Gerhard Richter',
        'year': 2007,
        'tecnique': 'Oil on Canvas',
        'source': '/imgs/ella.jpg'
    },
    'self portrait': {
        'author': 'Francis Bacon',
        'year': 1972,
        'technique': 'Oil on Canvas',
        'source': '/imgs/self-portrait.jpg'
    },
    'default': {
        'author': 'unknown',
        'year': 'unknown',
        'technique': 'unknown',
        'source': '/imgs/404.jpg'
    }
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/api/portraits', (req, res) => {
    res.json(portraits);
})

app.get('/api/:portraitN', (req, res) => {
    const portraitName = req.params.portraitN.toLowerCase();
    if(portraits[portraitName]) {
        res.render('index.ejs', { source: portraits[portraitName]['source'] });
    }else {
        res.render('index.ejs', { source: portraits['default']['source'] });
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
})