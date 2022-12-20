import SnakeBody from "../../domain/entities/snakeBody";

export default class CreateSnakeBody{

    createSnakeBody(positionX: number, positionY: number) {

        const snakeBody = new SnakeBody;
        
        snakeBody.axisX = positionX;
        snakeBody.axisY = positionY;
        
        return snakeBody;
    }
}