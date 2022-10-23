
export class User {
    id!: string
    name!: string
    email!: string
    login: null | number = null //represents last login timestamp
    hash!: string
    type: 'teacher' | 'student' = 'student'
}