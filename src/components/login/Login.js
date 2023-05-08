import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {TextField, Button, Grid, createTheme} from '@mui/material';
// import GithubAuthButton from './GithubAuthButton';

const theme = createTheme();

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3002/login', { username, password });

            if (response.status === 200) {
                console.log('Le formulaire a été envoyé avec succès');
                navigate('/home');
            } else {
                console.log('Il y a eu une erreur lors de l\'envoi du formulaire');
            }
        } catch (error) {
            console.log(error, 'Il y a eu une erreur lors de l\'envoi du formulaire');
        }

    };

    return (
        // <GithubAuthButton />
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                        Login
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
