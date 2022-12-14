import Snake from "../domain/entities/snake";
import RandomNumberService from "./randomNumberService";

export default class createSnake {
    createSnake(): Snake {
        const snake = new Snake
        const randomX = new RandomNumberService().randomNumber(15)
        const randomY = new RandomNumberService().randomNumber(15)
        snake.axisX = randomX
        snake.axisY = randomY
        return snake
    }
}