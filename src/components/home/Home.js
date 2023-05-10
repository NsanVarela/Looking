import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Button,
    createTheme,
    ThemeProvider,
    Box,
    TextField,
    MenuItem
} from '@mui/material';
import {CardId} from "../../../server/models/CardId";

const Home = () => {

    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const cardId = new CardId();

    const handleSubmitWithGoogle = async (event) => {
        event.preventDefault();
        const fileInput = document.getElementById('file-to-google');
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:3002/googleSubmit', formData);
        } catch (error) {
            console.log("Une erreur s'est produite lors de la requête POST");
        }
    }

    const verifyDocument = () => {
        if (imagePreviewUrl) {
            const formData = new FormData();
            formData.append('image', imagePreviewUrl);

            axios
                .post('http://localhost:3002/analyse-document', formData)
                .then((response) => {
                    // traitemetn de la réponse du serveur
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    const readURL = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setImagePreviewUrl(e.target.result);
                console.log('imagePreviewUrl:', e.target.result);
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const genders = [
        {value: 'Masculin'},
        {value: 'Féminin'}
    ]

    const theme = createTheme({
        components: {
            MuiInput: {
                variants: [
                    {
                        props: { variant: 'uploadInfo'},
                        style: {
                            display: 'none',
                        }
                    }
                ],
            },
            MuiButton: {
                variants: [
                    {
                        props: { variant: 'contained', color: 'primary' },
                        style: {
                            marginTop: `2rem`,
                            marginBottom: `2rem`,
                        },
                    },
                ],
            },
        },
    });

    const useStyles = makeStyles((theme) => ({
        setupContainer: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'lightsalmon',
            maxWidth: '50%',
            margin: '2rem auto',
            border: 'solid transparent',
            borderRadius: '0.5rem',
        },
        inputContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        input: {
            marginTop: '2rem'
        },
        imageContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            maxWidth: '50%',
            margin: '2rem auto',
        },
        previewImage: {
            maxWidth: '100%',
            maxHeight: '100%',
            marginBottom: '2rem',
        },
    }));

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2} >
                {/*<Grid item xs={12} sm={6} id="analyser-with-abbyy">
                    <form action="/abbyy" method="POST" encType="multipart/form-data">
                        <Typography variant="h2" textAlign="center">ABBYY API</Typography>
                        <hr />
                        <Typography variant="body1" textAlign="center">
                            Sélectionner une image à uploader (png, jpg, jpeg)
                        </Typography>
                        <input
                            type="file"
                            name="filename"
                            id="file-to-abbyy"
                            accept=".jpg, .jpeg, .png"
                            onChange="readURL(this);"
                        />
                        <div>
                            <Button type="submit" variant="contained" color="primary" size="small" >
                                Analyser avec ABBYY
                            </Button>
                        </div>
                    </form>
                </Grid>*/}

                <Grid item xs={12} sm={12} id="analyser-with-google">
                    <Box component="form" onSubmit={handleSubmitWithGoogle} noValidate>
                        <Typography variant="h2" textAlign="center">GOOGLE VISION API</Typography>
                        <hr />
                        <Typography variant="body1" textAlign="center">
                            Sélectionner une image à uploader (png, jpg, jpeg)
                        </Typography>
                        <div className={classes.setupContainer}>
                            <div className={classes.inputContainer}>
                                <input
                                    type="file"
                                    name="filename"
                                    id="file-to-google"
                                    className={classes.input}
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(event) => readURL(event)}
                                />
                            </div>
                            <div className={classes.imageContainer}>
                                {imagePreviewUrl && (
                                    <img className={classes.previewImage} src={imagePreviewUrl} alt="Image Preview" />
                                )}
                                {imagePreviewUrl && (<div>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={verifyDocument}
                                    >
                                        Lancer l'analyse
                                    </Button>
                                </div>)}
                            </div>

                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} id="img-preview-container">
                    <div className="message-container">
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} textAlign="center">
                <Typography variant="h2">Informations extraites</Typography>
                <hr />
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100ch' },
                    }}
                    id="result-container">
                    <Typography id="mrz-data">MRZ : {cardId.zla1 + cardId.zla2}</Typography>
                    <Typography id="mrz-status">Statut MRZ :</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                label="Nationalité"
                                name="nationality"
                                id="nationality"
                                value={cardId.nationality}
                            />
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                label="Nom"
                                name="lastname"
                                id="lastname"
                                value={cardId.lastname}
                            />
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                label="Prénom(s)"
                                name="firstname"
                                id="firstname"
                                value={cardId.firstname}
                            />
                            <TextField
                                id="filled-select-currency"
                                select
                                label="Genre"
                                variant="outlined"
                            >
                                {genders.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/*<FormControl fullWidth variant="outlined">
                                <InputLabel>Genre</InputLabel>
                                <Select label="Genre" name="gender" id="gender" value={cardId.gender}>
                                    <MenuItem value="M">Masculin</MenuItem>
                                    <MenuItem value="F">Féminin</MenuItem>
                                </Select>
                            </FormControl>*/}
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                label="Date de naissance"
                                name="birth"
                                id="birth"
                                value={cardId.birth}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                label="Type de document"
                                name="docType"
                                id="docType"
                                value={cardId.docType}
                            />
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                label="Numéro de document"
                                name="docNumber"
                                id="docNumber"
                                value={cardId.docNumber}
                            />
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                label="Pays"
                                name="country"
                                id="country"
                                value={cardId.placeOfBirth}
                            />
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                label="ZLA Ligne 1"
                                name="zla1"
                                id="zla1"
                                value={cardId.zla1}
                            />
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                label="ZLA Ligne 2"
                                name="zla2"
                                id="zla2"
                                value={cardId.zla2}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </ThemeProvider>

    );
}

export default Home;
