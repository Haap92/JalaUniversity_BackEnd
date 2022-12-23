import { Request, Response} from "express";
import { BoardRepository } from "../../domain/repository/boardRepository";
import createBoard from "../../services/factories/createBoard";
import { container } from "../../inversify/config";

export default class BoardController {
    
    static createBySize(req: Request, res: Response) {
        async function createTheBoard() {
            const boardSize = parseFloat(req.params.size);
            const boardCreator = new createBoard();
            const board = boardCreator.createBoard(boardSize);
            const newBoardCreator = container.get<BoardRepository>('BoardService');
            const newBoard = await newBoardCreator.create(board);
            res.send(newBoard);
            }
        createTheBoard();
    }

    static printBoard(req: Request, res: Response) {

        function printTheBoard() {
            const boardSize = parseFloat(req.params.size);
            res.send(Array.from({ length: boardSize }, () =>
            Array.from({ length: boardSize }, () => '  ')));
        }
        printTheBoard();
    }
}
