import SnakeService from "../../src/services/coreServices/snakeService";
import { Container } from "inversify";
import SnakeRepositoryMock from "./__mocks__/SnakeRepositoryMock";
import createSnake from '../../src/services/factories/createsnake';
import { snakeMock } from './__mocks__/snakeMock';
import "reflect-metadata";

let component: SnakeService;
beforeEach(async () => {
  const container = new Container();

  container.bind<SnakeService>("snakeService").to(SnakeService);
  container
    .bind<SnakeRepositoryMock>("snakeRepositoryMock")
    .to(SnakeRepositoryMock);
  component = container.get<SnakeService>("snakeService");
});

test('Create a Snake', async()=>{
  const snakeCreator = new createSnake();
  const snake = snakeCreator.createSnake(5);
  expect(typeof snake === 'object').toBeTruthy();
});

test('Compare a Snake', async()=>{
  const snakeCreator = new createSnake();
  const snake = snakeCreator.createSnake(5);
  expect(snake.axisY === snakeMock.axisY).toBeTruthy();
});

test('Create Snake', async()=>{
  const snakeCreator = new createSnake();
  const snake = snakeCreator.createSnake(5);
  expect(snake).not.toBe({
      id: 1,
      axisX: 5,
      axisY: 5,
      direction: 'UP',
      length: 1,
      body: "[]",
      name: "Player",
      score: 0

   });
});

 test('Read a snake', async()=>{
   const snake = await component.read(1);
   expect(snake).toBeTruthy();
 });
