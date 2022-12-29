import DBFood from "../dbEntities/db-food";
import Food from "../../domain/entities/food";

export class FoodMapper {
    static toDomain(raw: DBFood): Food{
        const food = new Food();
        food.id = raw.id;
        food.axisX = raw.axisX;
        food.axisY = raw.axisY;
        return food;
    }
}