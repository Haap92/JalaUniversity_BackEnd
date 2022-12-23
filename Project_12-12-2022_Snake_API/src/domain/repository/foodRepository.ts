import Food from "../entities/food";

export interface FoodRepository {

    create: (food: Food) => Promise<Food>
    read: (id: number) => Promise<Food>
    update:(food: Food) => Promise<void>
    delete:(id: number) => Promise<string>

}