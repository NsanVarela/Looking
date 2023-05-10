import React from 'react';
import axios from 'axios';
import {Box, Button} from "@mui/material";

const GithubAuthButton = () => {
    const handleGithubAuth = async () => {
        try {
            const response = await axios.get('http://localhost:3001/auth/github');
            window.location.href = response.data.redirectUrl;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box component="form" onSubmit={handleGithubAuth} noValidate sx={{ mt: 1 }}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Se connecter avec Github
            </Button>
        </Box>
    );
};

export default GithubAuthButton;
