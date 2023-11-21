export class User {
    firstname: string;
    lastname: string;
    birthday: number;
    street: string;
    zipcode: number;
    city: string;
    mail: string;
    id: string;

    constructor(obj?:any) {
        this.firstname = obj ? obj.firstname : '';
        this.lastname = obj ? obj.lastname : '';
        this.birthday = obj ? obj.birthday : '';
        this.street = obj ? obj.street : '';
        this.zipcode = obj ? obj.zipcode : '';
        this.city = obj ? obj.city : '';
        this.mail = obj ? obj.mail : '';
        this.id = obj ? obj.id : '';
    }

    public getJSON() {
        return {
            firstname: this.firstname,
            lastname: this.lastname,
            birthday: this.birthday,
            street: this.street,
            zipcode: this.zipcode,
            city: this.city,
            mail: this.mail
        }
    }
}