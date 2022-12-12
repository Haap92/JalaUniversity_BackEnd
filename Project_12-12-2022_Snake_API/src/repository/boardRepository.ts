import Board from "../entities/board";

export default interface UserRepository {
    create: (board: Board) => Promise<void>
    read: (id: number) => Promise<Board>
    delete:(id: number) => Promise<string>
    

}