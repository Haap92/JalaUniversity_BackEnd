import "reflect-metadata";
import { Container } from "inversify";
import BoardDataService from "../db/dbServices/db-board-services";
import BoardRepository from "../domain/repository/boardRepository";
import BoardService from "../services/boardService";
import SnakeDataService from "../db/dbServices/db-snake-services";
import SnakeRepository from "../domain/repository/snakeRepository";
import SnakeService from "../services/snakeService";
import FoodDataService from "../db/dbServices/db-food-services";
import FoodRepository from "../domain/repository/foodRepository";
import FoodService from "../services/foodService";
import GameDataService from "../db/dbServices/db-game-services";
import GameRepository from "../domain/repository/gameRepository";
import GameService from "../services/gameService";

const container = new Container();

container.bind<BoardRepository>('BoardService').to(BoardService);
container.bind<BoardRepository>('BoardDataService').to(BoardDataService);
container.bind<SnakeRepository>('SnakeService').to(SnakeService);
container.bind<SnakeRepository>('SnakeDataService').to(SnakeDataService);
container.bind<FoodRepository>('FoodService').to(FoodService);
container.bind<FoodRepository>('FoodDataService').to(FoodDataService);
container.bind<GameRepository>('GameService').to(GameService);
container.bind<GameRepository>('GameDataService').to(GameDataService);


export { container };