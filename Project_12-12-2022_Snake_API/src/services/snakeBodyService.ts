import { injectable } from 'inversify';
import SnakeBody from '../domain/entities/snakeBody';
import { container } from '../inversify/config';
import SnakeBodyRepository from '../domain/repository/snakeBodyRepository';

@injectable()
export default class SnakeBodyService implements SnakeBodyRepository {

snakeBodyDataService: SnakeBodyRepository = container.get<SnakeBodyRepository>('SnakeBodyDataService');

    async create(snakeBody: SnakeBody) {
        const result = await this.snakeBodyDataService.create(snakeBody);
            return result;
    }

    async read(id: number) {
        const data = await this.snakeBodyDataService.read(id);
            return data;
    }

    async update(snakeBody: SnakeBody) {
        const result = await this.snakeBodyDataService.update(snakeBody);
            return result;
    }

    async delete(id: number) {
        const result = await this.snakeBodyDataService.delete(id);
            return result;
    }
}
