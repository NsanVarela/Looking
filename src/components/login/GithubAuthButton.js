import React from 'react';
import axios from 'axios';

const GithubAuthButton = () => {
    const handleGithubAuth = async () => {
        try {
            const response = await axios.get('http://localhost:3002/auth/github');
            window.location.href = response.data.redirectUrl;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={handleGithubAuth}>Se connecter avec Github</button>
    );
};

export default GithubAuthButton;
