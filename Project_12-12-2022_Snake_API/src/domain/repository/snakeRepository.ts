import Snake from "../entities/Snake"

export default interface SnakeRepository {
    create: (snake: Snake) => Promise<void>
    read: (id: number) => Promise<Snake>
    delete:(id: number) => Promise<string>

}