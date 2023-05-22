const CardId = require('../models/CardId')

const toCardId = (datasCni) => {
    let properties = (datasCni[0].description.trim()).split(/\r|\n/)
    let cardId = new CardId.CardId

    let securityFieldConcatenated = '';
    let docNumberIsolated = '';
    let docType = '';
    let nationality = '';
    let lastname = '';
    let firstname = '';
    let sexe = '';
    let dateOfBirth = '';
    let placeOfBirth = '';
    let high = '';
    let zla = [];
    let foundElement = '';

    for (let i = 0; i < properties.length; i++) {
        const element = properties[i].toUpperCase();

        if (element.startsWith('RÉPUBLIQUE') || element.startsWith('FRANÇAISE')) {
            if (securityFieldConcatenated === '') {
                securityFieldConcatenated = element;
            } else {
                securityFieldConcatenated += ' ' + element;
            }
        } else if (element === 'RÉPUBLIQUE FRANÇAISE') {
            foundElement = element;
        }

        if (element.includes(`CARTE NATIONALE`)) {
            let pos = element.indexOf(':')
            let docNumber = element.substring(pos + 1, element.length)
            docNumberIsolated = docNumber.match(/\d/g).join("");
        }

        if (element.startsWith(`CARTE NATIONALE`)) {
            let pos = element.indexOf('CARTE')
            docType = element.substring(pos, pos + 26)
        }

        if (element.match(`NATIONALIT`)) {
            let pos = element.indexOf('NATIONALIT')
            nationality = element.substring(pos, element.length)
        }

        if (element.includes(`NOM`) && !element.startsWith(`PRÉNOM`) && !element.includes(`USAGE`)) {
            let pos = element.indexOf(':')
            lastname = element.substring(pos + 1, element.length)
        }

        if (element.startsWith(`PRÉNOM`)) {
            let pos = element.indexOf(':')
            firstname = element.substring(pos + 1, element.length)
        }

        if (element.includes(`SEXE`)) {
            let pos = element.indexOf(':')
            sexe = element.substring(pos + 1, element.length)
        }

        if (element.includes(`NÉ(E) LE`) || element.startsWith("NELL:")) {
            let pos = element.indexOf('NÉ')
            dateOfBirth = element.substring(6).trim();
        }

        if (element.includes(`À`)) {
            let pos = element.indexOf('À')
            placeOfBirth = element.substring(pos + 1, element.length)
        }

        if (element.includes(`TAILLE`)) {
            let pos = element.indexOf('TAILLE')
            high = element.substring(pos + 7, element.length)
        }

        if (element.includes('<')) {
            zla.push(element);
        }
    }

    cardId.securityField = securityFieldConcatenated;
    cardId.docType = docType;
    cardId.docNumber = docNumberIsolated;
    cardId.nationality = nationality;
    cardId.lastname = lastname;
    cardId.firstname = firstname;
    cardId.gender = sexe;
    cardId.birth = dateOfBirth;
    cardId.placeOfBirth = placeOfBirth;
    cardId.size = high;
    cardId.zla1 = zla[0];
    cardId.zla2 = zla[1];
    return cardId
}

module.exports = {
    toCardId
};
