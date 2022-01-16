export class Customers {
    id?: string;
    name: string;
    city: string;
    email: string;
    phone: number;

    constructor(name: string, city: string, email: string, phone: number) {
        this.name = name;
        this.city = city;
        this.email = email;
        this.phone = phone;
    }
}