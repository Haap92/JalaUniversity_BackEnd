import King from '../src/king';
import Position from '../src/position';

let king: King;

beforeEach(() => {
    king = new King('White', 'E', '1');
});

it('Should move one place forward', () => {
    const position = new Position('E', '2');
    expect(king.canMoveTo(position)).toBe(true);
});

it('Should not move to the same place', () => {
    const position = new Position('E', '1');
    expect(king.canMoveTo(position)).toBe(false);
});

it('Should move one place to the left', () => {
    const position = new Position('D', '1');
    expect(king.canMoveTo(position)).toBe(true);
});

it('Should not move forward more than one space', () => {
    const position = new Position('E', '3');
    expect(king.canMoveTo(position)).toBe(false);
});