import Snake from "../domain/entities/snake";
import DirectionsService from "./directionsService";
import RandomNumberService from "./randomNumberService";

export default class createSnake {
    createSnake(): Snake {
        const snake = new Snake
        const randomX = new RandomNumberService().randomNumber
        const randomY = new RandomNumberService().randomNumber
        const randomDir = new DirectionsService().snakeDirection()
        snake.axisX = randomX(15)
        snake.axisY = randomY(5)*3
        snake.direction = randomDir
        return snake
    }
}