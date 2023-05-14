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
// const _toCardId = require('./services/CardExtract')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

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
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

app.get('/home', (req, res) => {
    // traitement de la requête GET pour la route '/home'
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
            // const cardResult = _toCardId.toCardId(detections)

            const securityField = detections[1].description + ' ' + detections[2].description;
            const docType = detections[3].description + ' ' + detections[4].description + ' ' + detections[5].description;
            const docNumber = detections[8].description;
            const nationality = detections[9].description + ' ' + detections[10].description;
            const lastname = detections[13].description;
            const firstname = detections[18].description + detections[19].description + ' ' + detections[20].description;
            const gender = detections[23].description;
            const birth = detections[26].description;
            const placeOfBirth = detections[27].description + detections[28].description + ' ' + detections[29].description + ' ' + detections[30].description + ' ' + detections[31].description + ' ' + detections[32].description;
            const size = detections[33].description;
            const zla1 = detections[42].description + detections[43].description;
            const zla2 = detections[44].description + detections[45].description + detections[46].description + detections[47].description + detections[48].description + detections[49].description + detections[50].description;

            const card = new CardId.CardId(
                securityField,
                docType,
                docNumber,
                nationality,
                lastname,
                firstname,
                gender,
                birth,
                placeOfBirth,
                size,
                zla1,
                zla2
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
