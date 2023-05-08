const express = require('express');
// const session = require('express-session');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const app = express();
const path = require('path');
const port = 3002;
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
// app.use(session({
//     secret: 'mysecretkey',
//     resave: false,
//     saveUninitialized: true
// }));
//
// passport.use(new GithubStrategy({
//     clientID: GITHUB_CLIENT_ID,
//     clientSecret: GITHUB_CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/auth/github/callback'
// },
//     function(accessToke, refreshToken, profile, done) {
//     const userData = {
//         id: profile.id,
//         username: profile.username,
//         email: profile.email,
//         photoUrl: profile.photos[0].value,
//     };
//     return done(null, userData);
//     })
// );
//
// app.get('/auth/github', passport.authenticate('github'));
//
// app.get('/auth/github/callback',
//     passport.authenticate('github', { failureRedirect: '/login' }),
//     function(req, res) {
//     res.redirect('/home');
//     })

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

app.listen(port, () => {
    console.log('Server listening on port ' , port);
})
