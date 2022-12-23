import { AppDataSource } from '../db-source';
import { injectable } from 'inversify';
import { BoardRepository } from '../../domain/repository/boardRepository';
import DBBoard from '../dbEntities/db-board';

@injectable()
export default class BoardDataService implements BoardRepository  {
    
    async create(board: DBBoard){
        const repository = AppDataSource.getRepository(DBBoard);
        await repository.save(board);
        return board;
    }

    async read(id: number){
        const repository = AppDataSource.getRepository(DBBoard);
        return await repository.findOneBy({
            id: id
        });
    }

    async delete(id: number){
        const repository = AppDataSource.getRepository(DBBoard);
        await repository.delete({
            id: id
        });
        return `Board with ${id} deleted`;
    }
}