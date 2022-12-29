import { AppDataSource } from '../db-source';
import { injectable } from 'inversify';
import { SnakeRepository } from '../../domain/repository/snakeRepository';
import DBSnake from '../dbEntities/db-snake';
import Snake from '../../domain/entities/Snake';

@injectable()
export default class SnakeDataService implements SnakeRepository  {
    
    async create(snake: DBSnake){
        const repository = AppDataSource.getMongoRepository(DBSnake);
        const findSnake = await repository.find({});
        snake.id = 1 + findSnake.length;
        await repository.save(snake);
        return snake;
    }

    async read(id: number){
        const repository = AppDataSource.getMongoRepository(DBSnake);
        return await repository.findOneBy({
            id: id
        });
    }

    async findAll(): Promise<Snake[]> {
        const repository = AppDataSource.getMongoRepository(DBSnake);
        const snakeArray = await repository.find();
        return snakeArray;
        
    }

    async update(snake: DBSnake){
        const repository = AppDataSource.getMongoRepository(DBSnake);
        const currentSnake = await repository.findOneBy({id: snake.id});
        const updatedSnake = {...snake, _id: currentSnake._id};
        await repository.save(updatedSnake);
    }

    async delete(id: number){
        const repository = AppDataSource.getMongoRepository(DBSnake);
        await repository.delete({
            id: id
        });
        return `Snake with ${id} deleted`;
    }
}