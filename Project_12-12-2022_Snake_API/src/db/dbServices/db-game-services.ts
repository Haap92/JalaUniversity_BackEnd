import { AppDataSource } from "../db-source";
import { injectable } from "inversify";
import { GameRepository } from "../../domain/repository/gameRepository";
import DBGame from "../dbEntities/db-game";

@injectable()
export default class GameDataService implements GameRepository {
  async create(game: DBGame) {
    const repository = AppDataSource.getMongoRepository(DBGame);
    const findGame = await repository.find({});
    game.id = 1 + findGame.length;
    await repository.save(game);
    return game;
  }

  async read(id: number) {
    const repository = AppDataSource.getMongoRepository(DBGame);
    return await repository.findOneBy({
      id: id,
    });
  }

  async update(game: DBGame) {
    const repository = AppDataSource.getMongoRepository(DBGame);
    const currentGame = await repository.findOneBy({id: game.id});
    const updatedGame = {...game, _id: currentGame._id};
    await repository.save(updatedGame);
  }

  async delete(id: number) {
    const repository = AppDataSource.getMongoRepository(DBGame);
    await repository.delete({
      id: id,
    });
    return `Game with ${id} deleted`;
  }
}
