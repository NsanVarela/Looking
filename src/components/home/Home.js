import React from 'react';
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

const Home = () => {

    let securityField;
    let docType;
    let docNumber;
    let lastname;
    let firstname;
    let gender;
    let birth;
    let placeOfBirth;
    let size;
    let zla1;
    let zla2;
    let nationality;
    const cardId = {
        securityField, docType, docNumber, nationality, lastname, firstname, gender, birth, placeOfBirth, size, zla1, zla2
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

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2} >
                <Grid item xs="12" sm="6" id="analyser-with-abbyy">
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
                </Grid>

                <Grid item xs="12" sm="6" id="analyser-with-google">
                    <form action="/google" method="POST" encType="multipart/form-data">
                        <Typography variant="h2" textAlign="center">GOOGLE VISION API</Typography>
                        <hr />
                        <Typography variant="body1" textAlign="center">
                            Sélectionner une image à uploader (png, jpg, jpeg)
                        </Typography>
                        <input
                            type="file"
                            name="filename"
                            id="file-to-google"
                            accept=".jpg, .jpeg, .png"
                            onChange="readURL(this);"
                        />
                        <div>
                            <Button type="submit" variant="contained" color="primary" size="small">
                                Analyser avec GOOGLE
                            </Button>
                        </div>
                    </form>
                </Grid>
                <Grid item xs="12" sm="12" id="img-preview-container">
                    <Grid item xs="12" sm="12">
                        <img id="image-preview" src="https://bit.ly/1ez08le" alt="upload your image" />
                    </Grid>
                    <div className="message-container">
                    </div>
                </Grid>
            </Grid>
            <Grid xs="12" sm="12" textAlign="center">
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
                                margin="1rem"
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
{/*                            <FormControl fullWidth variant="outlined">
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
