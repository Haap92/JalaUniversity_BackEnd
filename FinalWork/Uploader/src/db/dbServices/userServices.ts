import { ObjectID } from "typeorm";
import { AppDataSource } from "../db-source";
import User from "../dbEntities/user";

export default class UserService {
    
    async create(food: User){
        const repository = AppDataSource.getMongoRepository(User);
        await repository.save(food);
        return food;
    }

    async read(id: number){
        const repository = AppDataSource.getMongoRepository(User);
        return await repository.findOneBy({
            id: id
        });
    }

    async update(user: User){
        const repository = AppDataSource.getMongoRepository(User);
        await repository.save(user);
    }

    async delete(id: ObjectID){
        const repository = AppDataSource.getMongoRepository(User);
        await repository.delete({
            id: id
        });
        return `Food with ${id} deleted`;
    }
}