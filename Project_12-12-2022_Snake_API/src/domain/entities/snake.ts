import Position from "./position";

export default class Snake extends Position{
    id: number;
    axisX: number;
    axisY: number;
    direction: string;
    length: number;
    name: string;
    score: number;
}