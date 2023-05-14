import React, {useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Button,
    createTheme,
    ThemeProvider,
    Box,
    TextField,
} from '@mui/material';
import {CardId} from "../../../server/models/CardId";

function verifyMrz(ligne, somme = 0){
    const factors = [7,3,1]
    const chars = Array.from(ligne)
    let result = 0
    let offset = 0

    chars.forEach(char => {
        if(char === '<') {
            char = 0
        } else if (char.charCodeAt(0)>= 65 && char.charCodeAt(0) <= 90) {
            char = char.charCodeAt(0) - 55
        } else if (char >= 0 && char <= 9) {
            char = parseInt(char)
        } else {
            const factor = offset % 3
            result += char * factors[factor]
            offset += 1 ;
        }

    })
    return ((result % 10) === somme);
}

const Home = () => {

    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const [cniCard, setCniCard] = useState('');
    const [zla, setZla] = useState('');
    const [mrzStatut, setMrzStatut] = useState('');

    let cardId = new CardId();

    const uploadFile = async (event) => {
        event.preventDefault();
        const fileInput = document.getElementById('file-to-google');
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:3002/upload', formData);
        } catch (error) {
            console.log("Une erreur s'est produite lors de la requête POST");
        }
    }

    const launchAnalyse = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios
                .post('http://localhost:3002/analyse', formData)
                .then((response) => {
                    // response = resp
                    cardId = {
                        birth: response.data.card._birth,
                        docNumber: response.data.card._docNumber,
                        docType: response.data.card._docType,
                        firstname: response.data.card._firstname,
                        gender: response.data.card._gender,
                        lastname: response.data.card._lastname,
                        nationality: response.data.card._nationality,
                        placeOfBirth: response.data.card._placeOfBirth,
                        securityField: response.data.card._securityField,
                        size: response.data.card._size,
                        zla1: response.data.card._zla1,
                        zla2: response.data.card._zla2,
                    }
                    setCniCard(cardId);
                    setZla(cardId.zla1 + cardId.zla2)
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    const cniCardValidate = async () => {
        const statut = verifyMrz(zla)
        let mrzMessage = '';
        switch (statut) {
            case true:
                mrzMessage = `La Carte Nationale d'Identité est valide`;
                setMrzStatut(mrzMessage)
                return mrzStatut;
            case false:
                mrzMessage = `La Carte Nationale d'Identité n'est pas valide`
                setMrzStatut(mrzMessage)
                return mrzStatut;
            default:
                return null;
        }
    }

    const readURL = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                setSelectedFile(file);
                setImagePreviewUrl(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const theme = createTheme({
        components: {
            MuiInput: {
                variants: [
                    {
                        props: {variant: 'uploadInfo'},
                        style: {
                            display: 'none',
                        }
                    }
                ],
            },
            MuiButton: {
                variants: [
                    {
                        props: {variant: 'contained', color: 'primary'},
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
                <Grid item xs={12} sm={12} id="analyser-with-google">
                    <Box component="form" onSubmit={uploadFile} noValidate encType="multipart/form-data">
                        <Typography variant="h2" textAlign="center">GOOGLE VISION API</Typography>
                        <hr/>
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
                                    <img className={classes.previewImage} src={imagePreviewUrl} alt="Image Preview"/>
                                )}
                                {imagePreviewUrl && (<div>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={launchAnalyse}
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

            {cniCard && (
                <Grid item xs={12} sm={12} textAlign="center">
                    <Typography variant="h3">
                        Informations extraites
                    </Typography>
                    <hr/>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {m: 1, width: '100ch'},
                        }}
                        id="result-container"
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="filled"
                                    label="Nationalité"
                                    name="nationality"
                                    id="nationality"
                                    disabled
                                    value={`${cniCard.nationality}`}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="filled"
                                    label="Nom"
                                    name="lastname"
                                    id="lastname"
                                    disabled
                                    value={`${cniCard.lastname}`}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="filled"
                                    label="Prénom(s)"
                                    name="firstname"
                                    id="firstname"
                                    disabled
                                    value={`${cniCard.firstname}`}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="filled"
                                    label="Genre"
                                    name="gender"
                                    id="gender"
                                    disabled
                                    value={`${cniCard.gender}`}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="filled"
                                    label="Date de naissance"
                                    name="birth"
                                    id="birth"
                                    disabled
                                    value={`${cniCard.birth}`}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="filled"
                                    label="Type de document"
                                    name="docType"
                                    id="docType"
                                    disabled
                                    value={`${cniCard.docType}`}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="filled"
                                    label="Numéro de document"
                                    name="docNumber"
                                    id="docNumber"
                                    disabled
                                    value={`${cniCard.docNumber}`}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="filled"
                                    label="Pays"
                                    name="country"
                                    id="country"
                                    disabled
                                    value={`${cniCard.placeOfBirth}`}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="filled"
                                    label="Taille"
                                    name="size"
                                    id="size"
                                    disabled
                                    value={`${cniCard.size}`}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="filled"
                                    label="ZLA"
                                    name="zla"
                                    id="zla"
                                    disabled
                                    value={`${cniCard.zla1}${cniCard.zla2}`}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component="form" onSubmit={cniCardValidate} noValidate encType="multipart/form-data">
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={cniCardValidate}
                        >
                            Tester la validité de cette Carte Nationale d'Identité
                        </Button>
                    </Box>

                    {mrzStatut &&(
                        <Typography id="mrz-status">
                            {mrzStatut}
                        </Typography>
                    )}

                </Grid>)}
        </ThemeProvider>

    );
}

export default Home;
