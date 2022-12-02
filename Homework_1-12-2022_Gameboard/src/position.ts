import { File, Rank } from "./types";

export default class Position{
    constructor(
        readonly file: File,
        readonly rank: Rank
    ){}
}