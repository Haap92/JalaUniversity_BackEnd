import { Request, Response} from "express";
import { AppDataSource } from "../../db/db-source";
import BoardRepository from "../../domain/repository/boardRepository";
import createBoard from "../../factories/createBoard";
import { container } from "../../inversify/config";

export default class BoardController {
    
    createBySize(req: Request, res: Response) {
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
}
