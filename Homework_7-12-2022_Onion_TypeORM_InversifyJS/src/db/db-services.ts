import { AppDataSource } from './db-source';
import DBUser from './db-user';
import UserRepository from '../repository/userRepository';
import { injectable } from 'inversify';

@injectable()
export default class UserDataService implements UserRepository  {
    
    async create(user: DBUser){
        const repository = AppDataSource.getRepository(DBUser);
        await repository.save(user)
    }

    async read(id: number){
        const repository = AppDataSource.getRepository(DBUser);
        return await repository.findOneBy({
            id: id
        })
    }

    async update(user: DBUser){
        const repository = AppDataSource.getRepository(DBUser);
        await repository.save(user)
    }

    async delete(id: number){
        const repository = AppDataSource.getRepository(DBUser);
        await repository.delete({
            id: id
        })
        return `User with ${id} deleted`
    }
}