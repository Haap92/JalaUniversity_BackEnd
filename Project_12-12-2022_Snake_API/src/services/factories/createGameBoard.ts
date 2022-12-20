import Snake from '../../domain/entities/Snake';
import Food from '../../domain/entities/food';
import Board from '../../domain/entities/board';
export default class CreateGameBoard {

    static createEmptyBoard(board: Board) {

        const size = board.gridX;
        
        const emptyBoard = Array.from({ length: size }, () => 
        Array.from({ length: size }, () => "_"));

        return emptyBoard;
    }

    static createBoardWithFood(emptyBoard: string[][], food:Food) {

        const boardWithFood = emptyBoard;
        const positionX = food.axisX;
        const positionY = food.axisY;
        boardWithFood[positionX][positionY] = "F";

        return boardWithFood;
    }

    static createBoardWithFoodAndSnakes(boardWithFood: string[][], snake: Snake) {

        const boardWithFoodAndSnakes = boardWithFood;
        const positionX = snake.axisX;
        const positionY = snake.axisY;
        boardWithFoodAndSnakes[positionX][positionY] = "S";

        return boardWithFoodAndSnakes;
    }
}