import Food from "../entities/food"

export default interface UserRepository {
    create: (food: Food) => Promise<Food>
    read: (id: number) => Promise<Food>
    delete:(id: number) => Promise<string>

}