const express = require('express');
const session = require('express-session');
// const jwt = require('jsonwebtoken');
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const app = express();
const path = require('path');
const port = 3002;
const cors = require('cors');
const CardId = require('./models/CardId');
const multer = require('multer');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

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

/*app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true
}));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
},
    function(accessToke, refreshToken, profile, done) {
    const userData = {
        id: profile.id,
        username: profile.username,
        email: profile.email,
        photoUrl: profile.photos[0].value,
    };
    return done(null, userData);
    })
);

app.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login',  failureFlash: true } ),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/home');
    });*/

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Vérifiez les informations d'identification de l'utilisateur ici

    if (res.status(200)) {
        console.log('Login successfull');
        res.send('Authentication successful');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

app.get('/home', (req, res) => {
    // traitement de la requête GET pour la route '/home'
    res.send('Welcome to the home page');
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        console.log('in post googleSubmit : ', req.file.filename);
        res.sendStatus(200);
    } else {
        res.status(400).send('Bad request');
    }
});

app.post('/analyse', upload.single('file'), async (req, res) => {
    if (req.file) {
        console.log('analyse launcher');
        try {
            const file = req.file;
            console.log('file : ', file);
            // const [result] = await client.documentTextDetection(file);
            // const fullTextAnnotation = result.fullTextAnnotation;
            // console.log(fullTextAnnotation.text);
            // // Traite la réponse et renvoie la réponse au client
            // res.json({ text: fullTextAnnotation.text });
            res.send('reçu');
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Une erreur s\'est produite lors de l\'analyse du document.'});
        }
    } else {
        res.status(400).send('No file');
    }
});

app.listen(port, () => {
    console.log('Server listening on port ' , port);
})
