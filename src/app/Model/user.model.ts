export class User {
    constructor(
        public email: string ,
        public uId: string ,
        // tslint:disable-next-line:variable-name
        public token: string) {}
        // tslint:disable-next-line:variable-name
    //     private _tokenExpirationDate: Date) {}
    // get token(): any {
    //     if (!this._token) {
    //         return null;
    //     }
    //     return this._token ;
    // }
}
