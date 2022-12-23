import Board from "../entities/board";

export interface BoardRepository {

    create: (board: Board) => Promise<Board>
    read: (id: number) => Promise<Board>
    delete:(id: number) => Promise<string>

}