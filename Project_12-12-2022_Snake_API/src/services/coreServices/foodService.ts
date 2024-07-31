import { injectable } from "inversify";
import Food from "../../domain/entities/food";
import { container } from '../../inversify/config';
import { FoodRepository } from "../../domain/repository/foodRepository";

@injectable()
export default class FoodService implements FoodRepository {

FoodDataService: FoodRepository = container.get<FoodRepository>('FoodDataService');

  async create(food: Food) {
    const result = await this.FoodDataService.create(food);
    return result;
  }

  async read(id: number) {
    const data = await this.FoodDataService.read(id);
    return data;
  }

  async update(food: Food) {
    const result = await this.FoodDataService.update(food);
    return result;
  }

  async delete(id: number) {
    const result = await this.FoodDataService.delete(id);
    return result;
  }
}
