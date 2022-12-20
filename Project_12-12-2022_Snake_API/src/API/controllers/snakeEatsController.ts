import { Request, Response } from "express"
import Food from "../../domain/entities/food"
import Snake from "../../domain/entities/Snake"
import SnakeEatsFood from "../../services/factories/snakeEatsFood"
import FoodService from "../../services/foodService"
import SnakeService from "../../services/snakeService"

export default class SnakeEatsController {

    static async snakeAteLeft(req: Request, res:Response){
        const axisX = 5
        const axisY = 5

        const snake = new Snake;
        snake.axisX = axisX;
        snake.axisY = axisY; 
        snake.direction = "LEFT";
        snake.length = 1
        snake.name = "Player";
        snake.score = 0;   

        const snakeDataAccess = new SnakeService;
        const newSnake = await snakeDataAccess.create(snake);
        

        const food = new Food;
        food.axisX = axisX;
        food.axisY = axisY;

        const foodDataAccess = new FoodService;
        const newFood = await foodDataAccess.create(food);

        const snakeEats = SnakeEatsFood.snakeEatsFacingLeft(newSnake, newFood)
        res.send(await snakeEats)
        
    }
}