export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,     // private can be accessed only with getter fun()
        private _tokenValidity: number
    ) {}

    get token() {
        if(!this._tokenValidity || new Date().getTime() > this._tokenValidity) {
            return null;
        }
        else {
            return this._token;
        }
    }
}