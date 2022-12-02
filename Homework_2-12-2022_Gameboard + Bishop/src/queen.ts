import Piece from "./piece";
import position from "./position";

export default class Queen extends Piece{
    canMoveTo(position: position): boolean {

        const currentFile = this.position.getFile();
        const currentRank = this.position.getRank();
        const targetFile = position.getFile();
        const targetRank = position.getRank();
        
        if((targetFile === currentFile) 
        || (targetRank === currentRank) 
        || (Math.abs(targetFile.charCodeAt(0) - currentFile.charCodeAt(0) ) 
        === Math.abs(targetRank.charCodeAt(0)  - currentRank.charCodeAt(0) )))
            return true;

        return false;
    }
    
}