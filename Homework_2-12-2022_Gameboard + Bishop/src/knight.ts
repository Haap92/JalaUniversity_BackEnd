import Piece from "./piece";
import Position from "./position";

export default class Knight extends Piece{
    canMoveTo(position: Position): boolean {
        throw new Error("Method not implemented.");
    }
    
}