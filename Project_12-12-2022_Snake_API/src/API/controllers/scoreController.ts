import { Request, Response } from "express";
import { SnakeRepository } from "../../domain/repository/snakeRepository";
import { container } from "../../inversify/config";

export default class ScoreController{
    
    static getScores (req: Request, res:Response){

        async function getScoresFromSnakes(){
        
            const snakeScoreReader = container.get<SnakeRepository>('SnakeService');
            const snakesScores = await snakeScoreReader.findAll();
            const bestScores: string[] = [];
            
            snakesScores.forEach(Snake => {
                const scores = `${Snake.name} best record ${Snake.score} points`;
                bestScores.push(scores);                
            });

        res.send(bestScores);
        }
        getScoresFromSnakes();
    }
}
    