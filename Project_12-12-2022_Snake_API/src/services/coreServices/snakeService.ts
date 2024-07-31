import { injectable } from "inversify";
import Snake from "../../domain/entities/Snake";
import { container } from "../../inversify/config";
import { SnakeRepository } from "../../domain/repository/snakeRepository";


@injectable()
export default class SnakeService implements SnakeRepository {
  snakeDataService: SnakeRepository =
    container.get<SnakeRepository>("SnakeDataService");

  async create(snake: Snake) {
    const result = await this.snakeDataService.create(snake);
    return result;
  }

  async read(id: number) {
    const data = await this.snakeDataService.read(id);
    return data;
  }

  async findAll(): Promise<Snake[]> {
    const data = await this.snakeDataService.findAll();
    return data;
  }

  async update(snake: Snake) {
    const result = await this.snakeDataService.update(snake);
    return result;
  }

  async delete(id: number) {
    const result = await this.snakeDataService.delete(id);
    return result;
  }
}
