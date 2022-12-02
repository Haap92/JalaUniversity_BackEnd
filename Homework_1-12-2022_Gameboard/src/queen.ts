import Piece from "./piece";
import position from "./position";

export default class Queen extends Piece{
    canMoveTo(position: position): boolean {

        const files = ['A','B','C','D','E','F','G','H'];
        const ranks = ['1','2','3','4','5','6','7','8'];

        const currentFile = files.indexOf(this.position.file);
        const currentRank = ranks.indexOf(this.position.rank);
        const targetFile = files.indexOf(position.file);
        const targetRank = ranks.indexOf(position.rank);
        
        if((targetFile === currentFile) 
        || (targetRank === currentRank) 
        || (Math.abs(targetFile - currentFile) === Math.abs(targetRank - currentRank)))
            return true;

        return false;
    }
    
}