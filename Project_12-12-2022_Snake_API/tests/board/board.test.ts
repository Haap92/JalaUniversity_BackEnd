import BoardService from '../../src/services/coreServices/boardService';
import { Container } from 'inversify';
import BoardRepositoryMock from './__mocks__/boardRepositoryMock';
import createBoard from '../../src/services/factories/createBoard';
import "reflect-metadata";

let component:BoardService;

beforeEach(async () => {
    const container = new Container();

    container.bind<BoardService>('BoardService').to(BoardService);
    container.bind<BoardRepositoryMock>('BoardRepositoryMock').to(BoardRepositoryMock);
    component = container.get<BoardService>('BoardService');
});

test('Create a Board', async()=>{
    const boardCreator = new createBoard();
    const board = boardCreator.createBoard(5);
    expect(typeof board === 'object').toBeTruthy();
});

test('Read a Board', async()=>{
    const board = await component.read(1);
    expect(board).toBeTruthy();
});