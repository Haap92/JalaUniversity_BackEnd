import FoodRepository from "../../domain/repository/FoodRepository";
import SnakeRepository from "../../domain/repository/snakeRepository";
import { container } from "../../inversify/config";
import { directions, node } from "./snakeDirectionConstant";

export default class SnakeEatsFood {

    static async didSnakeAteFood(snakeId: number, foodId: number) {

        const nextPosition = await this.snakeNextPosition(snakeId);
        const readFoodPosition = container.get<FoodRepository>('FoodService');
        const food = await readFoodPosition.read(foodId);

        const axisX = food.axisX;
        const axisY = food.axisY;

        const foodPosition = [];
        foodPosition.push(axisX);
        foodPosition.push(axisY);

        const nextFoodPosition = JSON.stringify(foodPosition);

        if(nextPosition == nextFoodPosition) {
            return true;
        }
    }

    static async snakeEats(snakeId: number) {

        const updateSnakeScore = container.get<SnakeRepository>('SnakeService');
        const snake = await updateSnakeScore.read(snakeId);
          
        if (snake.direction == directions[0]) {

            const body = [];
            const axisX = snake.axisX + snake.length;
            const axisY = snake.axisY;
            body.push(axisX);
            body.push(axisY);

            snake.length = snake.length + node;
            snake.body = JSON.stringify(body);
            snake.score = snake.score + 10;
            await updateSnakeScore.update(snake);
   
            return snake;

        }else if (snake.direction == directions[1]) {

            const body = [];
            const axisX = snake.axisX; 
            const axisY = snake.axisY - snake.length;
            body.push(axisX);
            body.push(axisY);

            snake.length = snake.length + node;
            snake.body = JSON.stringify(body);
            snake.score = snake.score + 10;   

            await updateSnakeScore.update(snake);

            return snake;

        }else if (snake.direction == directions[2]) {

            const body = [];
            const axisX = snake.axisX - snake.length;
            const axisY = snake.axisY;
            body.push(axisX);
            body.push(axisY);

            snake.length = snake.length + node;
            snake.body = JSON.stringify(body);
            snake.score = snake.score + 10; 
            await updateSnakeScore.update(snake);

            return snake;         

        }else if (snake.direction == directions[3]) {

            const body = [];
            const axisX = snake.axisX;
            const axisY = snake.axisY + snake.length;
            body.push(axisX);
            body.push(axisY);

            snake.length = snake.length + node;
            snake.body = JSON.stringify(body);
            snake.score = snake.score + 10;
            await updateSnakeScore.update(snake);

            return snake;
        }           
    }


    static async snakeNextPosition(snakeId: number) {
        
        const snakeReader = container.get<SnakeRepository>('SnakeService');
        const snake = await snakeReader.read(snakeId);
        const snakePosition = [];

        if (snake.direction == directions[0]){
            snakePosition.push(snake.axisX - node);
            snakePosition.push(snake.axisY);
            return JSON.stringify(snakePosition);

        }else if (snake.direction == directions[1]){
            snakePosition.push(snake.axisX);
            snakePosition.push(snake.axisY + node);
            return JSON.stringify(snakePosition);

        }else if (snake.direction == directions[2]){
            snakePosition.push(snake.axisX + node);
            snakePosition.push(snake.axisY);
            return JSON.stringify(snakePosition);

        }else if (snake.direction == directions[3]){
            snakePosition.push(snake.axisX);
            snakePosition.push(snake.axisY - node);
            return JSON.stringify(snakePosition);
        }
    }
}