import { AppDataSource } from '../db-source';
import { injectable } from 'inversify';
import FoodRepository from '../../domain/repository/FoodRepository';
import DBFood from '../dbEntities/db-Food';

@injectable()
export default class FoodDataService implements FoodRepository  {
    
    async create(food: DBFood){
        const repository = AppDataSource.getRepository(DBFood);
        await repository.save(food);
        return food;
    }

    async read(id: number){
        const repository = AppDataSource.getRepository(DBFood);
        return await repository.findOneBy({
            id: id
        });
    }

    async update(food: DBFood){
        const repository = AppDataSource.getRepository(DBFood);
        await repository.save(food);
    }

    async delete(id: number){
        const repository = AppDataSource.getRepository(DBFood);
        await repository.delete({
            id: id
        });
        return `Food with ${id} deleted`;
    }
}