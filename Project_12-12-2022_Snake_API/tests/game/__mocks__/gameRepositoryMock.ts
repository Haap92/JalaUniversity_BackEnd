import { injectable } from 'inversify';
import { GameRepository } from '../../../src/domain/repository/gameRepository';
import Game from '../../../src/domain/entities/game';

@injectable()
export default class GameRepositoryMock implements GameRepository  {
    
    
    async create(game:Game){

        return game;
    }

    async read(id: number){
      return new Game;

    }

    async update(game: Game){
      await console.log(game);
      
    }

    async delete(id: number){

        return "deleted";
    }
}