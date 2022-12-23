import FoodService from "../../src/services/coreServices/foodService";
import { Container } from "inversify";
import FoodRepositoryMock from "./__mocks__/foodRepositoryMock";
import createFood from '../../src/services/factories/createFood';
import "reflect-metadata";

let component: FoodService;
beforeEach(async () => {
  const container = new Container();

  container.bind<FoodService>("FoodService").to(FoodService);
  container
    .bind<FoodRepositoryMock>("FoodRepositoryMock")
    .to(FoodRepositoryMock);
  component = container.get<FoodService>("FoodService");
});

test('Create a Food', async()=>{
  const foodCreator = new createFood();
  const food = foodCreator.createFood(5);
  expect(typeof food === 'object').toBeTruthy();
});

test('Create Food', async()=>{
  const foodCreator = new createFood();
  const food = foodCreator.createFood(5);
  expect(food).not.toBe({
      id: 1,
       axisX: 5,
       axisY: 5
   });
});

test('Read a Food', async()=>{
  const food = await component.read(1);
  expect(food).toBeTruthy();
});
