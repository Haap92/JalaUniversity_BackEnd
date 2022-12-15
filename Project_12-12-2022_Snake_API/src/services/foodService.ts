import { injectable } from 'inversify';
import Food from '../domain/entities/Food';
import { container } from '../inversify/config';
import FoodRepository from '../domain/repository/FoodRepository';

@injectable()
export default class FoodService implements FoodRepository {

FoodDataService: FoodRepository = container.get<FoodRepository>('FoodDataService')

    async create(food: Food) {
        const result = await this.FoodDataService.create(food);
            return result;
    }

    async read(id: number) {
        const data = await this.FoodDataService.read(id);
            return data;
    }

    async delete(id: number) {
        const result = await this.FoodDataService.delete(id);
            return result;
    }
}
