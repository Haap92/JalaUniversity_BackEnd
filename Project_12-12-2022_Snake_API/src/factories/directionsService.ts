import RandomNumberService from "./randomNumberService"

const directions = [ 'LEFT', 'UP', 'RIGHT', 'DOWN']

export default class DirectionsService {
    snakeDirection(){
        const randomDirection = new RandomNumberService().randomNumber
        const directionSnake = directions[randomDirection(3)]     
        const snakeDir = directionSnake.toString()
        return snakeDir
    }
}