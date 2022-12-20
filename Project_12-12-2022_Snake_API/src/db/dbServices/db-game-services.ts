import { AppDataSource } from '../db-source';
import { injectable } from 'inversify';
import GameRepository from '../../domain/repository/gameRepository';
import DBGame from '../dbEntities/db-game';

@injectable()
export default class GameDataService implements GameRepository  {
    
    async create(game: DBGame){
        const repository = AppDataSource.getRepository(DBGame);
        await repository.save(game);
        return game
    }

    async read(id: number){
        const repository = AppDataSource.getRepository(DBGame);
        return await repository.findOneBy({
            id: id
        })
    }

    async update(game: DBGame){
        const repository = AppDataSource.getRepository(DBGame);
        await repository.save(game)
    }

    async delete(id: number){
        const repository = AppDataSource.getRepository(DBGame);
        await repository.delete({
            id: id
        })
        return `Game with ${id} deleted`
    }
}