import { Service } from "./service";

export interface UserInterface {
    name: string,
    age: number,
    picture: string,
    services: Service[]
}