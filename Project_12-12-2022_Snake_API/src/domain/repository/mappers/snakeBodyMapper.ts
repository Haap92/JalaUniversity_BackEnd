import DBFood from "../../../db/dbEntities/db-food";
import Food from "../../entities/food";

export class FoodMapper {
    static toDomain(raw: DBFood): Food{
        const food = new Food();
        food.id = raw.id;
        food.axisX = raw.axisX;
        food.axisY = raw.axisY;
        return food;
    }
}