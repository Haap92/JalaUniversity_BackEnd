import Game from "../entities/game"

export default interface SnakeRepository {
    create: (game: Game) => Promise<Game>
    read: (id: number) => Promise<Game>
    update:(game: Game) => Promise<void>
    delete:(id: number) => Promise<string>

}