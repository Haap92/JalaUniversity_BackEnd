import Snake from "../domain/entities/snake";
import RandomNumberService from "./randomNumberService";

export default class createSnake {
    createSnake(): Snake {
        const snake = new Snake
        const randomX = new RandomNumberService().randomNumber
        const randomY = new RandomNumberService().randomNumber
        snake.axisX = randomX(15)
        snake.axisY = randomY(15)
        return snake
    }
}