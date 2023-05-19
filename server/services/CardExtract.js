const CardId = require('../models/CardId')

const toCardId = (datasCni) => {
    let properties = (datasCni[0].description.trim()).split(/\r|\n/)
    let cardId = new CardId.CardId
    console.log('properties : ', properties);

    let securityFieldConcatenated = '';
    let foundElement = '';

    for (let i = 0; i < properties.length; i++) {
        const element = properties[i].toUpperCase();

        if (element.startsWith('RÉPUBLIQUE') || element.startsWith('FRANÇAISE')) { // *********************** OK : sécurité
            if (securityFieldConcatenated === '') {
                securityFieldConcatenated = element;
            } else {
                securityFieldConcatenated += ' ' + element;
            }
        } else if (element === 'RÉPUBLIQUE FRANÇAISE') {
            foundElement = element;
        }

        if (element.includes(`CARTE NATIONALE`)) { // *********************** OK : numéro de document
            let pos = element.indexOf(':')
            let docNumber = element.substring(pos + 1, element.length)
            let docNumberIsolated = docNumber.match(/\d/g).join("");
        }

        if (element.startsWith(`CARTE NATIONALE`)) { // *********************** OK : type de document
            let pos = element.indexOf('CARTE')
            let docType = element.substring(pos, pos + 26)
        }

        if (element.match(`NATIONALIT`)) { // *********************** OK : nationalité
            let pos = element.indexOf('NATIONALIT')
            const nationality = element.substring(pos, element.length)
        }

        if (element.includes(`NOM`) && !element.startsWith(`PRÉNOM`) && !element.includes(`USAGE`)) { // *********************** OK : nom
            let pos = element.indexOf(':')
            let lastname = element.substring(pos + 1, element.length)
        }

        if (element.startsWith(`PRÉNOM`)) { // *********************** OK : prenom
            let pos = element.indexOf(':')
            let firstname = element.substring(pos + 1, element.length)
        }
    }

    console.log('Concatenated:', securityFieldConcatenated);
    console.log('Found Element:', foundElement);







    properties.forEach(function (element) {
        const line = element.toUpperCase()
        if (line !== '') {
            if (line.startsWith(`RÉPUBLIQUE`) || line.startsWith(`FRANÇAISE`)) {
                let pos = line.indexOf('RÉPUBLIQUE')
                let pos1 = line.indexOf('FRANÇAISE')
                let sub = line.substring(pos, pos.length) + ' ' + line.substring(pos1, pos1.length)
                // console.log('sub : ', sub)
                let securityField = line.substring(pos, line.length)
                // console.log('securityField : ', securityField)
            }
            if (line.includes(`RÉPUBLIQUE FRANÇAISE`)) {
                let pos = line.indexOf('RÉPUBLIQUE')
                let securityField = line.substring(pos, line.length)
                cardId.securityField = securityField.toUpperCase()
            }
            else if (line.includes(`CARTE NATIONALE D'IDENTITÉ`)) {
                let pos = line.indexOf('CARTE')
                let docType = line.substring(pos, pos + 26)
                cardId.docType = docType.toUpperCase()
            }
            else if (line.includes('N°')) {
                let pos = line.indexOf('N°')
                let docNumber = line.substring(pos + 3, pos + 15)
                cardId.docNumber = docNumber.toUpperCase()
            }
            else if (line.includes(`NATIONALITÉ`)) {
                let pos = line.indexOf('NATIONALITÉ')
                let nationality = line.substring(pos + 14, pos + 20)
                cardId.nationality = nationality.toUpperCase()
            }
            else if (line.includes(`NOM :`)) {
                let pos = line.indexOf('NOM')
                let lastname = line.substring(pos + 2, pos + 10)
                cardId.lastname = lastname.toUpperCase()
            }
            else if (line.includes(`PRÉNOM`)) {
                let pos = line.indexOf('PRÉNOM')
                let firstname = line.substring(pos + 10, pos + 20)
                cardId.firstname = firstname.toUpperCase()
            }
            else if (line.includes(`SEXE`)) {
                let pos = line.indexOf('SEXE')
                let nextPos = line.indexOf('NÉ(E)')
                let gender = line.substring(pos + 6, pos + 7)
                cardId.gender = gender.toUpperCase()
            }
            else if (line.includes(`NÉ(E)`)) {
                let pos = line.indexOf('NÉ(E)')
                let birth = line.substring(pos + 10, line.length)
                cardId.birth = birth.toUpperCase()
            }
            else if (line.includes(`À :`)) {
                let pos = line.indexOf('À :')
                let placeOfBirth = line.substring(pos, line.length)
                cardId.placeOfBirth = placeOfBirth.toUpperCase()
            }
            else if (line.includes(`TAILLE`)) {
                let pos = line.indexOf('TAILLE')
                let size = line.substring(pos + 6, line.length)
                cardId.size = size.toUpperCase()
            }
            else if ((line.includes("ID")) && (line.includes("<"))) {
                let pos = line.indexOf('ID')
                let zla1 = line.substring(pos, line.length)
                cardId.zla1 = zla1.toUpperCase()
            }
            else if ((line.includes(`NICOLAS`)) && (line.includes(`<`))) {
                let pos = line.indexOf(((line.includes(`NICOLAS`)) && (line.includes(`<`))))
                let zla2 = line.substring(pos, line.length)
                cardId.zla2 = zla2.toUpperCase()
            }
        }
    })
    return cardId
}

module.exports = {
    toCardId
};
