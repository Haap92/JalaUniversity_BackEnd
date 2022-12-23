import { injectable } from "inversify";
import Board from "../../domain/entities/board";
import { BoardRepository } from "../../domain/repository/boardRepository";
import { container } from "../../inversify/config";

@injectable()
export default class BoardService implements BoardRepository {

boardDataService: BoardRepository = container.get<BoardRepository>('BoardDataService');

  async create(board: Board) {
    const result = await this.boardDataService.create(board);
    return result;
  }

  async read(id: number) {
    const data = await this.boardDataService.read(id);
    return data;
  }

  async delete(id: number) {
    const result = await this.boardDataService.delete(id);
    return result;
  }
}
