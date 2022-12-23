import SnakeEatsAndCollisionService from '../../src/services/snakeEatsAndCollisionService';

test('Get the typeof snakeAte', async()=>{
  const snakeAte = await SnakeEatsAndCollisionService.didSnakeAteFood(1, 1, 5);
  expect(typeof snakeAte === 'boolean').toBeTruthy();
});