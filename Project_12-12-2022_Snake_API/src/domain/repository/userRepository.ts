import User from "../entities/user";

export default interface UserRepository {

    create: (user: User) => Promise<User>
    read: (id: number) => Promise<User>
    update:(user: User) => Promise<void>
    delete:(id: number) => Promise<string>

}