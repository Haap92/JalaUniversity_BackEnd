import Game from '../../domain/entities/game';

export default class CreateGame {

    createGame (status: string, speed: number) {

        const game = new Game;

        game.status = status;
        game.speed = speed;
        game.gameBoard = ' ';
        
        return game;
    }
}