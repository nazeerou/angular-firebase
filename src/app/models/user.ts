export class User {
    constructor(
        public uid: string = null,
        public name: string = null,
        public email: string = null,
        public password: string = null,
        public role: Role
    ) {} 
}

export interface Role {
     id: string,
     admin: boolean,
     supervisor: boolean,
     agent: boolean,
     customer: boolean
}