import King from '../src/king';
import Queen from '../src/queen';
import Position from '../src/position';

let king:King;
let queen:Queen;

beforeEach(() => {
    king = new King('White', 'E', '1');
    queen = new Queen('White', 'D', '1');
});

//King
it('Should move one place forward', () => {
    const position = new Position('E', '2');
    expect(king.canMoveTo(position)).toBe(true);
});

it('Shouldnt move to the same place', () => {
    const position = new Position('E', '1');
    expect(king.canMoveTo(position)).toBe(false);
});

it('Shoul move one place to the left', () => {
    const position = new Position('D', '1');
    expect(king.canMoveTo(position)).toBe(false);
});

it('Should not move forward more than one space', () => {
    const position = new Position('E', '3');
    expect(king.canMoveTo(position)).toBe(false);
});

//Queen
it('Should move vertically', () => {
    const position = new Position('D', '8');
    expect(queen.canMoveTo(position)).toBe(true);
});

it('Should move horizontally', () => {
    const position = new Position('A', '1');
    expect(queen.canMoveTo(position)).toBe(true);
});

it('Should move diagonally', () => {
    let position = new Position('H', '5');
    expect(queen.canMoveTo(position)).toBe(true);

    position = new Position('A', '4');
    expect(queen.canMoveTo(position)).toBe(true);
});

it('Should not move L', () => {
    let position = new Position('C', '3');
    expect(queen.canMoveTo(position)).toBe(false);

    position = new Position('E', '3');
    expect(queen.canMoveTo(position)).toBe(false);
});

it('Should not move other places', () => {
    let position = new Position('C', '5');
    expect(queen.canMoveTo(position)).toBe(false);

    position = new Position('F', '8');
    expect(queen.canMoveTo(position)).toBe(false);
});