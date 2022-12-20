import Board from "../entities/board";

export default interface UserRepository {

    create: (board: Board) => Promise<Board>
    read: (id: number) => Promise<Board>
    delete:(id: number) => Promise<string>

}