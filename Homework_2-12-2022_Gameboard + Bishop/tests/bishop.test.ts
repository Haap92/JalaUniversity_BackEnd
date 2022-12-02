import Bishop from '../src/bishop';
import Position from '../src/position';

let bishop: Bishop;

beforeEach(() => {
    bishop = new Bishop('White', 'C', '1');
});

it('Should not move vertically', () => {
    const position = new Position('C', '8');
    expect(bishop.canMoveTo(position)).toBe(false);
});

it('Should not move horizontally', () => {
    const position = new Position('A', '1');
    expect(bishop.canMoveTo(position)).toBe(false);
});

it('Should move diagonally', () => {
    let position = new Position('H', '6');
    expect(bishop.canMoveTo(position)).toBe(true);

    position = new Position('A', '3');
    expect(bishop.canMoveTo(position)).toBe(true);
});

it('Should not move L', () => {
    let position = new Position('D', '3');
    expect(bishop.canMoveTo(position)).toBe(false);

    position = new Position('B', '3');
    expect(bishop.canMoveTo(position)).toBe(false);
});

it('Should not move other places', () => {
    let position = new Position('C', '5');
    expect(bishop.canMoveTo(position)).toBe(false);

    position = new Position('F', '8');
    expect(bishop.canMoveTo(position)).toBe(false);
});