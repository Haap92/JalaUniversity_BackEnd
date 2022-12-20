import snakeBody from "../entities/snakeBody"

export default interface snakeBodyRepository {
    create: (snakeBody: snakeBody) => Promise<snakeBody>
    read: (id: number) => Promise<snakeBody>
    update:(snakeBody: snakeBody) => Promise<void>
    delete:(id: number) => Promise<string>

}