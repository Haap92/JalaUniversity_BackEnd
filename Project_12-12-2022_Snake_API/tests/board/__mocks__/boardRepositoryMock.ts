import "reflect-metadata";
import { injectable } from "inversify";
import Board from "../../../src/domain/entities/board";
import { BoardRepository } from "../../../src/domain/repository/boardRepository";

@injectable()
export default class BoardRepositoryMock implements BoardRepository {
    

    async create (board: Board): Promise<Board> {
        return board;
    }

    async read(id: number): Promise<Board> {

        return new Board;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async delete(id: number): Promise<string>{
        throw new Error('Method not implemented.');
    }
}