import { AppDataSource } from '../db-source';
import { injectable } from 'inversify';
import BoardRepository from '../../repository/boardRepository';
import DBBoard from './db-board';

@injectable()
export default class BoardDataService implements BoardRepository  {
    
    async create(board: DBBoard){
        const repository = AppDataSource.getRepository(DBBoard);
        await repository.save(board)
    }

    async read(id: number){
        const repository = AppDataSource.getRepository(DBBoard);
        return await repository.findOneBy({
            id: id
        })
    }

    async delete(id: number){
        const repository = AppDataSource.getRepository(DBBoard);
        await repository.delete({
            id: id
        })
        return `User with ${id} deleted`
    }
}