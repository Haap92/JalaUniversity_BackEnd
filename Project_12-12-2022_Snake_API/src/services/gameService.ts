import { injectable } from 'inversify';
import Game from '../domain/entities/game';
import { container } from '../inversify/config';
import GameRepository from '../domain/repository/gameRepository';

@injectable()
export default class GameService implements GameRepository {

gameDataService: GameRepository = container.get<GameRepository>('GameDataService');

    async create(game: Game) {
        const result = await this.gameDataService.create(game);
            return result;
    }

    async read(id: number) {
        const data = await this.gameDataService.read(id);
            return data;
    }

    async update(game: Game) {
        const result = await this.gameDataService.update(game);
            return result;
    }

    async delete(id: number) {
        const result = await this.gameDataService.delete(id);
            return result;
    }
}
