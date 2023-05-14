const CardId = require('../models/CardId')

const toCardId = (datasCni) => {
    let properties = (datasCni[0].description.trim()).split(/\r|\n/)
    let cardId = new CardId.CardId

    properties.forEach(function (element) {
        const line = element.toUpperCase()
        if (line !== '') {
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
