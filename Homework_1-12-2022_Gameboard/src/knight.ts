import Piece from "./piece";
import position from "./position";

export default class Knight extends Piece{
    canMoveTo(position: position): boolean {
        throw new Error("Method not implemented.");
    }
    
}