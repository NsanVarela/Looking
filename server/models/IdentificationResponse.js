class IdentificationResponse{
    constructor(_verify,_message, card, mrz, mrzStatus) {
        this._verify = _verify
        this._message = _message
        this._cardId = card
        this._mrz = mrz
        this._mrzStatus = mrzStatus
    }
    
    get verify() {
        return this._verify;
    }
    set verify(value) {
        this._verify = value;
    }
    
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }

    get cardId() {
        return this._cardId;
    }
    set cardId(value) {
        this._cardId = value;
    }

    get mrz() {
        return this._mrz
    }
    set mrz(value) {
        this._mrz = value
    }

    get mrzStatus() {
        return this._mrzStatus;
    }
    set mrzStatus(value) {
        this._mrzStatus = value;
    }

}

module.exports = IdentificationResponse