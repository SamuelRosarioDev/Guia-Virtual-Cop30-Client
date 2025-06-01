import type { CountryType, UserType } from "../enum/users.enum";

export type User = {
    idUser: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    country: CountryType;
    typeUser: UserType;
    isAdmin: boolean;
}