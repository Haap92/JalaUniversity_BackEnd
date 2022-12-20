import Food from "../../domain/entities/Food";
import RandomNumberService from "./randomNumberService";

export default class createFood {
    createFood(boardSize: number): Food {

        const food = new Food;
        const randomX = new RandomNumberService().randomNumber;
        const randomY = new RandomNumberService().randomNumber;

        food.axisX = randomX(boardSize);
        food.axisY = randomY(boardSize);
        
        return food;
    }
}