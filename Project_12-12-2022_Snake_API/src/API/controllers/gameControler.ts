import { Request, Response } from "express";

export default class GameController {
    
    static welcome(req: Request, res: Response){
        res.send("Welcome to my Snake Game")
    }
}