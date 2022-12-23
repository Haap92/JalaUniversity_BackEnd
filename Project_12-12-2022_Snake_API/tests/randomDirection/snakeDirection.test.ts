import SnakeRandomDirectionService from '../../src/services/snakeRandomDirectionService';


test('Define a Random Direction with String type', async()=>{
  const snakeDirection = new SnakeRandomDirectionService().snakeDirection();
  expect(typeof snakeDirection === 'string').toBeTruthy();
});
