import Snake from "../entities/Snake";

export interface SnakeRepository {

    create: (snake: Snake) => Promise<Snake>
    read: (id: number) => Promise<Snake>
    findAll(): Promise<Snake[]>
    update:(snake: Snake) => Promise<void>
    delete:(id: number) => Promise<string>

}