import Food from "../entities/food";

export default interface UserRepository {

    create: (food: Food) => Promise<Food>
    read: (id: number) => Promise<Food>
    update:(food: Food) => Promise<void>
    delete:(id: number) => Promise<string>

}