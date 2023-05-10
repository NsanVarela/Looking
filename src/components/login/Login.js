import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    TextField,
    Button,
    Grid,
    createTheme,
    ThemeProvider,
    Container,
    CssBaseline,
    Avatar,
    Box,
    Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GithubAuthButton from "./GithubAuthButton";
import {CardId} from "../../../server/models/CardId";

const theme = createTheme();

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3002/login', { email, password });

            if (response.status === 200) {
                const cardId = new CardId();
                console.log('200 + infos : ', email, password, cardId);
                navigate('/home');
            } else {
                console.log('Il y a eu une erreur lors de l\'envoi du formulaire');
            }
        } catch (error) {
            console.log(error, 'Il y a eu une erreur lors de l\'envoi du formulaire');
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Se connecter
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleEmailChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Se connecter
                        </Button>
                    </Box>
                </Box>
                <hr />
                <Box>
                    <GithubAuthButton />
                </Box>
            </Container>
        </ThemeProvider>
        // <GithubAuthButton />
        /*<form onSubmit={handleSubmit}>
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
        </form>*/
    );
}
