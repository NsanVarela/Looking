class CardId {

    constructor(securityField, docType, docNumber, nationality, lastname, firstname, gender, birth, placeOfBirth, size, zla1, zla2) {
        this._securityField = securityField
        this._docType = docType
        this._docNumber = docNumber
        this.nationality = nationality
        this._lastname = lastname
        this._firstname = firstname
        this._gender = gender
        this._birth = birth
        this._placeOfBirth = placeOfBirth
        this._size = size
        this._zla1 = zla1
        this._zla2 = zla2
    }

    get securityField() {
        return this._securityField
    }
    set securityField(value) {
        this._securityField = value
    }

    get docType() {
        return this._docType
    }
    set docType(value) {
        this._docType = value
    }

    get docNumber() {
        return this._docNumber
    }
    set docNumber(value) {
        this._docNumber = value
    }

    get nationality() {
        return this._nationality
    }
    set nationality(value) {
        this._nationality = value
    }

    get lastname() {
        return this._lastname
    }
    set lastname(value) {
        this._lastname = value
    }

    get firstname() {
        return this._firstname
    }
    set firstname(value) {
        this._firstname = value
    }

    get gender() {
        return this._gender
    }
    set gender(value) {
        this._gender = value
    }

    get birth() {
        return this._birth
    }
    set birth(value) {
        this._birth = value
    }

    get placeOfBirth() {
        return this._placeOfBirth
    }
    set placeOfBirth(value) {
        this._placeOfBirth = value
    }

    get size() {
        return this._size
    }
    set size(value) {
        this._size = value
    }
    
    get zla1() {
        return this._zla1;
    }
    set zla1(value) {
        this._zla1 = value;
    }
    
    get zla2() {
        return this._zla2;
    }
    set zla2(value) {
        this._zla2 = value;
    }

}

module.exports = {
	CardId
}
