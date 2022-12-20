import Food from "../../domain/entities/food";
import Snake from "../../domain/entities/Snake";
import SnakeBody from "../../domain/entities/snakeBody";
import SnakeRepository from "../../domain/repository/snakeRepository";
import SnakeBodyRepository from "../../domain/repository/snakeBodyRepository";
import { container } from "../../inversify/config";
import { directions, minimunAxis } from "./snakeDirectionConstant";

export default class SnakeEatsFood {

    static async snakeEatsFacingLeft(snake: Snake, food: Food){

        const biggerSnake = []
        const body = new SnakeBody;
        const updateSnakeScore = container.get<SnakeRepository>('SnakeService');
        const createSnakebody = container.get<SnakeBodyRepository>('SnakeBodyService');

        if (snake.axisX == food.axisX && snake.axisY == food.axisY && snake.direction == directions[0]){
            body.axisX = snake.axisX + minimunAxis;
            body.axisY = snake.axisY;
            snake.length = snake.length + minimunAxis
            snake.score = snake.score + 10           
        }

        await updateSnakeScore.update(snake)
        const snakeBody = await createSnakebody.create(body)
        biggerSnake.push(snake)
        biggerSnake.push(snakeBody)
        return biggerSnake
    }

    static async snakeEatsFacingUp(snake: Snake, food: Food){

        const biggerSnake = []
        const body = new SnakeBody;
        const updateSnakeScore = container.get<SnakeRepository>('SnakeService');
        const createSnakebody = container.get<SnakeBodyRepository>('SnakeBodyService');

        if (snake.axisX == food.axisX && snake.axisY == food.axisY && snake.direction == directions[1]){
            body.axisX = snake.axisX; 
            body.axisY = snake.axisY - minimunAxis;
            snake.score = snake.score + 10         
        }

        await updateSnakeScore.update(snake)
        const snakeBody = await createSnakebody.create(body)
        biggerSnake.push(snake)
        biggerSnake.push(snakeBody)
        return biggerSnake
    }

    static async snakeEatsFacingRight(snake: Snake, food: Food){

        const biggerSnake = []
        const body = new SnakeBody;
        const updateSnakeScore = container.get<SnakeRepository>('SnakeService');
        const createSnakebody = container.get<SnakeBodyRepository>('SnakeBodyService');

        if (snake.axisX == food.axisX && snake.axisY == food.axisY && snake.direction == directions[2]){
            body.axisX = snake.axisX - minimunAxis;
            body.axisY = snake.axisY;
            snake.score = snake.score + 10          
        }

        await updateSnakeScore.update(snake)
        const snakeBody = await createSnakebody.create(body)
        biggerSnake.push(snake)
        biggerSnake.push(snakeBody)
        return biggerSnake
    }

    static async snakeEatsFacingDown(snake: Snake, food: Food){

        const biggerSnake = []
        const body = new SnakeBody;
        const updateSnakeScore = container.get<SnakeRepository>('SnakeService');
        const createSnakebody = container.get<SnakeBodyRepository>('SnakeBodyService');

        if (snake.axisX == food.axisX && snake.axisY == food.axisY && snake.direction == directions[3]){
            body.axisX = snake.axisX;
            body.axisY = snake.axisY + minimunAxis;
            snake.score = snake.score + 10
        }

        await updateSnakeScore.update(snake)
        const snakeBody = await createSnakebody.create(body)
        biggerSnake.push(snake)
        biggerSnake.push(snakeBody)
        return biggerSnake
    }
}