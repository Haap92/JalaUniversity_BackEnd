import { AppDataSource } from '../db-source';
import { injectable } from 'inversify';
import { SnakeRepository } from '../../domain/repository/snakeRepository';
import DBSnake from '../dbEntities/db-snake';
import Snake from '../../domain/entities/Snake';

@injectable()
export default class SnakeDataService implements SnakeRepository  {
    
    async create(snake: DBSnake){
        const repository = AppDataSource.getRepository(DBSnake);
        await repository.save(snake);
        return snake;
    }

    async read(id: number){
        const repository = AppDataSource.getRepository(DBSnake);
        return await repository.findOneBy({
            id: id
        });
    }

    async findAll(): Promise<Snake[]> {
        const repository = AppDataSource.getRepository(DBSnake);
        const snakeArray = await repository.find();
        return snakeArray;
        
    }

    async update(snake: DBSnake){
        const repository = AppDataSource.getRepository(DBSnake);
        await repository.save(snake);
    }

    async delete(id: number){
        const repository = AppDataSource.getRepository(DBSnake);
        await repository.delete({
            id: id
        });
        return `Snake with ${id} deleted`;
    }
}