require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const port = 3002;
const cors = require('cors');
const CardId = require('./models/CardId');
const multer = require('multer');
const vision = require('@google-cloud/vision');
const fs = require('fs');
const _toCardId = require("./services/CardExtract");
// const _toCardId = require('./services/CardExtract')

app.use(express.static(path.join(__dirname, 'client/public')));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Remplacez par l'URL de votre application React
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
}));

const visionClient = new vision.ImageAnnotatorClient( );

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'upload' + '-' + uniqueSuffix + '.jpg');
    },
});

const upload = multer({ storage });

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'client/public') });
});

app.get('/home', (req, res) => {
    res.send('Welcome to the home page');
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.sendStatus(200);
    } else {
        res.status(400).send('Bad request');
    }
});

app.post('/analyse', upload.single('file'), async (req, res) => {
    if (req.file) {
        try {
            const file = req.file;
            const buffer = fs.readFileSync(file.path);
            const [result] = await visionClient.textDetection(buffer);
            const detections = result.textAnnotations;
            const cardResult = _toCardId.toCardId(detections)

            const card = new CardId.CardId(
                cardResult
            );
            const mrz = `${card.zla1 + card.zla2}`
            res.json({ card, mrz });
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Une erreur s\'est produite lors de l\'analyse du document.'});
        }
    } else {
        res.status(400).send('No file');
    }
});

app.post('/analyse-mrz', (req, res) => {
    if (req.data) {
        res.sendStatus(200);
    } else {
        res.status(400).send('No ZLA');
    }

})

app.listen(port, () => {
    console.log('Server listening on port ' , port);
})
