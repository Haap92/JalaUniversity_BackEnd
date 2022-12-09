import { AppDataSource } from './db-source';
import User from './db-user';
import { UserRepository } from '../repository/userRepository';

export default class UserDataService implements UserRepository  {
    
    async create(user: User){
        const repository = AppDataSource.getRepository(User);
        await repository.save(user)
    }

    async read(id: number){
        const repository = AppDataSource.getRepository(User);
        return await repository.findOneBy({
            id: id
        })
    }

    async update(user: User){
        const repository = AppDataSource.getRepository(User);
        await repository.save(user)
    }

    async delete(id: number){
        const repository = AppDataSource.getRepository(User);
        return await repository.delete({
            id: id
        })
    }
}