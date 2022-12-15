import { Request, Response} from "express";
import { AppDataSource } from "../../db/db-source";
import BoardRepository from "../../domain/repository/boardRepository";
import createBoard from "../../services/factories/createBoard";
import { container } from "../../inversify/config";

export default class BoardController {
    
    static createBySize(req: Request, res: Response) {
        async function createTheBoard() {
            const input = parseFloat(req.params.size);
            const boardCreator = new createBoard();
            const board = boardCreator.createBoard(input);
            await AppDataSource.initialize();
            const newBoardCreator = container.get<BoardRepository>('BoardService');
            const newBoard = await newBoardCreator.create(board);
            res.send(newBoard);
            await AppDataSource.destroy()
            }
        createTheBoard();
    }

    static printBoard(req: Request, res: Response) {

        function printTheBoard() {
            const input = parseFloat(req.params.size);
            res.send(Array.from({ length: input }, () =>
            Array.from({ length: input }, () => '  ')));
        }
        printTheBoard();
    }
}
