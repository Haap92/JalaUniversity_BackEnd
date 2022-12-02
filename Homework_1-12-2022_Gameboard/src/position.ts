import { File, Rank } from "./types";

export default class Position{
    constructor(
        public file: File,
        public rank: Rank
    ){}
}