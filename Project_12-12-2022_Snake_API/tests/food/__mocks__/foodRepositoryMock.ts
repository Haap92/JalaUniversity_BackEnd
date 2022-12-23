import { injectable } from 'inversify';
import { FoodRepository } from '../../../src/domain/repository/foodRepository';
import Food from '../../../src/domain/entities/food';

@injectable()
export default class FoodRepositoryMock implements FoodRepository  {
    
    async create(food: Food){

        return food;
    }

    async read(id: number){
      return new Food;

    }

    async update(food: Food){
      await console.log(food);
      
    }

    async delete(id: number){

        return "deleted";
    }
}