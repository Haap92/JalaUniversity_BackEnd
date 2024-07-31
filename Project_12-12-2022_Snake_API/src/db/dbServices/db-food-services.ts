import { AppDataSource } from '../db-source';
import { injectable } from 'inversify';
import { FoodRepository } from '../../domain/repository/foodRepository';
import DBFood from '../dbEntities/db-food';

@injectable()
export default class FoodDataService implements FoodRepository  {
    
    async create(food: DBFood){
        const repository = AppDataSource.getMongoRepository(DBFood);
        const findFood = await repository.find({});
        food.id = 1 + findFood.length;
        await repository.save(food);
        return food;
    }

    async read(id: number){
        const repository = AppDataSource.getMongoRepository(DBFood);
        return await repository.findOneBy({
            id: id
        });
    }

    async update(food: DBFood){
        const repository = AppDataSource.getMongoRepository(DBFood);
        const currentFood = await repository.findOneBy({id: food.id});
        const updatedFood = {...food, _id: currentFood._id};
        await repository.save(updatedFood);
    }

    async delete(id: number){
        const repository = AppDataSource.getMongoRepository(DBFood);
        await repository.delete({
            id: id
        });
        return `Food with ${id} deleted`;
    }
}