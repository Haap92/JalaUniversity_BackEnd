import Snake from '../../domain/entities/Snake';
import Food from '../../domain/entities/food';
import Board from '../../domain/entities/board';
export default class CreateGameBoard {

    static createEmptyBoard(board: Board) {

        const size = board.gridX
        
        const emptyBoard = Array.from({ length: size }, () => 
        Array.from({ length: size }, () => "_"));

        return emptyBoard;
    }

    static createBoardWithSnakes(emptyBoard: string[][], snake: Snake) {

        const boardWithSnakes = emptyBoard;
        const positionX = snake.axisX;
        const positionY = snake.axisY;
        boardWithSnakes[positionX][positionY] = "S";

        return boardWithSnakes;
    }

    static createBoardWithSnakesAndFood(boardWithSnakes: string[][], food: Food) {

        const boardWithSnakesAndFood = boardWithSnakes;
        const positionX = food.axisX;
        const positionY = food.axisY;
        boardWithSnakesAndFood[positionX][positionY] = "F";

        return boardWithSnakesAndFood;
    }
}