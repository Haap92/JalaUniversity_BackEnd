import User from "../../entities/user";
import DBUser from "../../../db/dbEntities/db-user";

export class UserMapper {
    static toDomain(raw: DBUser): User{
        const user = new User();
        user.id = raw.id
        user.name = raw.name
        return user;
    }
}