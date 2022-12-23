import Game from "../entities/game";

export interface GameRepository {

    create: (game: Game) => Promise<Game>
    read: (id: number) => Promise<Game>
    update:(game: Game) => Promise<void>
    delete:(id: number) => Promise<string>

}