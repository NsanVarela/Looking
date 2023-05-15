import React, {useState} from 'react'
import axios from 'axios'
import {makeStyles} from '@material-ui/core/styles'
import {
    Grid,
    Typography,
    Button,
    createTheme,
    ThemeProvider,
    Box,
    TextField,
    Card,
    CardMedia,
    CardActionArea,
    CardContent
} from '@mui/material'
import {CardId} from "../../../server/models/CardId"
import LOGO from '../assets/images/logo-looking.png'
import CNI1 from '../assets/images/maelys.jpg'
import CNI3 from '../assets/images/selkis.jpeg'
import CNI2 from '../assets/images/michael-cni.jpg'

const cards = [
    {id: 1, name: 'Maëlys', src: CNI1},
    {id: 2, name: 'Mickael', src: CNI2},
    {id: 3, name: 'Voldemort', src: CNI3},
]

function verifyMrz(ligne, somme = 0) {
    const factors = [7, 3, 1]
    const chars = Array.from(ligne)
    let result = 0
    let offset = 0

    chars.forEach(char => {
        if (char === '<') {
            char = 0
        } else if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
            char = char.charCodeAt(0) - 55
        } else if (char >= 0 && char <= 9) {
            char = parseInt(char)
        } else {
            const factor = offset % 3
            result += char * factors[factor]
            offset += 1;
        }

    })
    return ((result % 10) === somme);
}

const Home = () => {

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
        logo: {
            display: 'flex',
            justifyContent: 'space-around',
        },
        baseline: {
            fontSize: '2rem',
            fontWeight: '300',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '7rem',
        },
        select: {
            fontSize: '1rem',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            marginTop: '5rem',
            marginBottom: '3rem',
            textAlign: 'center',
            fontWeight: '300',
        },
        cards: {
            display: 'flex',
            justifyContent: 'space-around',
        },
        cniCard: {},
        dropZone: {
            width: '30rem',
            height: '21rem',
            border: '2px dashed #aaa',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '3rem auto'
        },
        draggedImage: {
            width: '26rem',
            height: '17rem'
        },
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


    const [draggedImage, setDraggedImage] = useState(null);

    const handleDragStart = (event, image) => {
        setDraggedImage(image);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, card) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setSelectedFile(droppedFile);
    };


    return (
        <ThemeProvider theme={theme}>
            <Grid item xs={12} sm={12} id="analyser-with-google">
                <Box component="form" noValidate encType="multipart/form-data">
                    <div className={classes.logo}>
                        <img src={LOGO} alt="Logo"/>
                    </div>
                    <p className={classes.baseline} textAlign="center">Instantly extract text from images</p>
                    <hr/>
                    <p className={classes.select} textAlign="center">Sélectionner une image à analyser</p>
                    <div className={classes.cards}>
                        {cards.map(card =>
                            <Card sx={{maxWidth: 345}}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={card.src}
                                        alt="Carte Nationale d'Identité"
                                        draggable
                                        onDragStart={(event) => handleDragStart(event, card.src)}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {card.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )}
                    </div>

                    <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className={classes.dropZone}
                    >
                        {draggedImage ? (
                            <img
                                src={draggedImage}
                                alt="Dragged Image"
                                className={classes.draggedImage}
                            />
                        ) : (
                            <p>Faire glisser une image ici</p>
                        )}
                    </div>
                    <div className={classes.imageContainer}>
                        {draggedImage && (<div>
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

                    {mrzStatut && (
                        <Typography id="mrz-status">
                            {mrzStatut}
                        </Typography>
                    )}

                </Grid>)}
        </ThemeProvider>
    );
}

export default Home;
