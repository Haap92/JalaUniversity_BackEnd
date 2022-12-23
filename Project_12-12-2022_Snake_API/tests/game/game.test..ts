import GameService from "../../src/services/coreServices/gameService";
import { Container } from "inversify";
import GameRepositoryMock from "./__mocks__/gameRepositoryMock";
import createGame from '../../src/services/factories/creategame';
import "reflect-metadata";

let component: GameService;
beforeEach(async () => {
  const container = new Container();

  container.bind<GameService>("gameService").to(GameService);
  container
    .bind<GameRepositoryMock>("gameRepositoryMock")
    .to(GameRepositoryMock);
  component = container.get<GameService>("gameService");
});

test('Create a game', async()=>{
  const gameCreator = new createGame();
  const game = gameCreator.createGame('Ready to Play', 1000);
  expect(typeof game === 'object').toBeTruthy();
});

test('Create game', async()=>{
  const gameCreator = new createGame();
  const game = gameCreator.createGame('Ready to Play', 1000);
  expect(game).toBe({
      id: 1,
      status: 'Ready to Play',
      speed: 1000,
      gameBoard: ' '

   });
});

 test('Read a game', async()=>{
   const game = await component.read(1);
   expect(game).toBeTruthy();
 });
