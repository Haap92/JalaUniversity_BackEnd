import { AppDataSource } from '../db-source';
import { injectable } from 'inversify';
import SnakeRepository from '../../domain/repository/snakeRepository';
import DBSnake from '../dbEntities/db-snake';

@injectable()
export default class SnakeDataService implements SnakeRepository  {
    
    async create(snake: DBSnake){
        const repository = AppDataSource.getRepository(DBSnake);
        await repository.save(snake);
        return snake
    }

    async read(id: number){
        const repository = AppDataSource.getRepository(DBSnake);
        return await repository.findOneBy({
            id: id
        })
    }

    async delete(id: number){
        const repository = AppDataSource.getRepository(DBSnake);
        await repository.delete({
            id: id
        })
        return `User with ${id} deleted`
    }
}