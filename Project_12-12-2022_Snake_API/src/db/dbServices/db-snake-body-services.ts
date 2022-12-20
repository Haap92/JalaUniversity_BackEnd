import { AppDataSource } from '../db-source';
import { injectable } from 'inversify';
import SnakeBodyRepository from '../../domain/repository/snakeBodyRepository';
import DBSnakeBody from '../dbEntities/db-snake-body';

@injectable()
export default class SnakeBodyDataService implements SnakeBodyRepository  {
    
    async create(snakeBody: DBSnakeBody){
        const repository = AppDataSource.getRepository(DBSnakeBody);
        await repository.save(snakeBody);
        return snakeBody
    }

    async read(id: number){
        const repository = AppDataSource.getRepository(DBSnakeBody);
        return await repository.findOneBy({
            id: id
        })
    }

    async update(snakeBody: DBSnakeBody){
        const repository = AppDataSource.getRepository(DBSnakeBody);
        await repository.save(snakeBody)
    }

    async delete(id: number){
        const repository = AppDataSource.getRepository(DBSnakeBody);
        await repository.delete({
            id: id
        })
        return `snakeBody with ${id} deleted`
    }
}