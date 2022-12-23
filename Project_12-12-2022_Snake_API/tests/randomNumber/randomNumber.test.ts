import RandomNumberService from "../../src/services/factories/randomNumberService";



test('Get a random number', async()=>{
  const randomNumber = new RandomNumberService().randomNumber(5);
  expect(typeof randomNumber === 'number').toBeTruthy();
});

test('Get a random number between 0 and 5', async()=>{
  const randomNumber = new RandomNumberService().randomNumber(5);
  expect(randomNumber <= 5).toBeTruthy();
});

test('Get a random number between 0 and 5', async()=>{
  const randomNumber = new RandomNumberService().randomNumber(5);
  expect(randomNumber > 5).not.toBeTruthy();
});