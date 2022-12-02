import Piece from "./piece";
import Position from "./position";

export default class King extends Piece{
    canMoveTo(position: Position):boolean {

        const files = ['A','B','C','D','E','F','G','H'];
        const ranks = ['1','2','3','4','5','6','7','8'];

        const currentFile = files.indexOf(this.position.file);
        const currentRank = ranks.indexOf(this.position.rank);
        const targetFile = files.indexOf(position.file);
        const targetRank = ranks.indexOf(position.rank);

        if((currentFile === targetFile)
        && (currentRank === targetRank))
            return false;
            
        if((Math.abs(targetFile-currentFile)<=1) 
        && (Math.abs(targetRank-currentRank) <=1))
            return true;
        
        return false;

    }
    
}