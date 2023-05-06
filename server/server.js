const express = require('express');
const app = express();
const path = require('path');
const port = 3002;
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Vérifiez les informations d'identification de l'utilisateur ici

    if (res.status(200)) {
        res.send('Login successfull');
    } else {
        res.status(401).send('Invalid username or password');
    }
})

app.listen(port, () => {
    console.log('Server listening on port ' , port);
})
