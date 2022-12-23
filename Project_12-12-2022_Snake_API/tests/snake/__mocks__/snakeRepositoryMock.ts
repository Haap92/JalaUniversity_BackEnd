import { injectable } from 'inversify';
import { SnakeRepository } from '../../../src/domain/repository/snakeRepository';
import Snake from '../../../src/domain/entities/snake';

@injectable()
export default class SnakeRepositoryMock implements SnakeRepository  {
    
    
    async create(snake: Snake){

        return snake;
    }

    async read(id: number){
      return new Snake;

    }
    
    findAll(): Promise<Snake[]> {
      throw new Error('Method not implemented.');
    }

    async update(snake: Snake){
      await console.log(snake);
      
    }

    async delete(id: number){

        return "deleted";
    }
}