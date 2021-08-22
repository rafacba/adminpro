import { Hospital } from "./hospital.model";

export class Medico {

    constructor(
        public nombre?: string,
        public img?: string,
        public usuario?: string,
        public hospital?: {
            nombre:string;
            id_hospital:string;
        },
        public _id?: string
    ) { }
}