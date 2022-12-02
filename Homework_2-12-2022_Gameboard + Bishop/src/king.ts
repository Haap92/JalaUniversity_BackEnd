import Piece from "./piece";
import Position from "./position";

export default class King extends Piece{
    canMoveTo(position: Position):boolean {

        const currentFile = this.position.getFile();
        const currentRank = this.position.getRank();
        const targetFile = position.getFile();
        const targetRank = position.getRank();

        if((currentFile === targetFile)
        && (currentRank === targetRank))
            return false;
            
        if((Math.abs(targetRank.charCodeAt(0) - currentRank.charCodeAt(0)) <=1)
        && (Math.abs(targetFile.charCodeAt(0) - currentFile.charCodeAt(0))<=1))
            return true;
        
        return false;

    }
    
}