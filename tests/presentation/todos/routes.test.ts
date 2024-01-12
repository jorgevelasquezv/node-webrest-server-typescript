import request from 'supertest';
import { testServer } from '../../test.server';
import { prisma } from '../../../src/data/postgres';
import exp from 'constants';

describe('Testing ToDos Routes', () => {
    beforeAll(async () => {
        await testServer.start();
    });

    afterAll(() => {
        testServer.close();
    });

    beforeEach(async () => {
        await prisma.toDo.deleteMany();
    });

    const toDo1 = { text: 'ToDo 1' };
    const toDo2 = { text: 'ToDo 2' };

    test('Should return ToDos api/todos', async () => {
        await prisma.toDo.createMany({ data: [toDo1, toDo2] });

        const { body } = await request(testServer.app)
            .get('/api/todos')
            .expect(200);

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
        expect(body[0].text).toBe(toDo1.text);
        expect(body[0].completedAt).toBe(null);
        expect(body[1].text).toBe(toDo2.text);
        expect(body[1].completedAt).toBe(null);
    });

    test('Should return ToDo api/todos/:id', async () => {
        const toDo = await prisma.toDo.create({ data: toDo1 });

        const { body } = await request(testServer.app)
            .get(`/api/todos/${toDo.id}`)
            .expect(200);

        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual({
            id: toDo.id,
            text: toDo.text,
            completedAt: toDo.completedAt,
        });
    });

    test('Should return 404 if ToDo not found in the get toDo api/todos/:id', async () => {
        const toDoId = 1;
        const { body } = await request(testServer.app)
            .get(`/api/todos/${toDoId}`)
            .expect(404);

        expect(body).toEqual({ error: `ToDo with id ${toDoId} not found` });
    });

    test('Should return 400 if id is not a number in the get toDo api/todos/:id', async () => {
        const toDoId = 'invalidId';
        const { body } = await request(testServer.app)
            .get(`/api/todos/${toDoId}`)
            .expect(400);

        expect(body).toEqual({ message: 'Invalid ID' });
    });

    test('Should create ToDo api/todos', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send(toDo1)
            .expect(201);

        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual({
            id: expect.any(Number),
            text: toDo1.text,
            completedAt: null,
        });
    });

    test('Should return 400 if text is not provided api/todos', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({})
            .expect(400);

        expect(body).toEqual({ message: 'Text property is required' });
    });

    test('Should return 400 if text is empty api/todos', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({ text: '' })
            .expect(400);

        expect(body).toEqual({ message: 'Text property is required' });
    });

    test('Should update ToDo api/todos/:id', async () => {
        const toDo = await prisma.toDo.create({ data: toDo1 });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${toDo.id}`)
            .send({ text: 'ToDo Updated', completedAt: '2023-01-11' })
            .expect(200);

        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual({
            id: toDo.id,
            text: 'ToDo Updated',
            completedAt: '2023-01-11T00:00:00.000Z',
        });
    });

    test('Should return 404 if ToDo not found in the update api/todos/:id', async () => {
        const toDoId = 1;
        const { body } = await request(testServer.app)
            .put(`/api/todos/${toDoId}`)
            .send({ text: 'ToDo Updated' })
            .expect(404);

        expect(body).toEqual({ error: `ToDo with id ${toDoId} not found` });
    });

    test('Should return 400 if id is not a number in the update api/todos/:id', async () => {
        const toDoId = 'invalidId';
        const { body } = await request(testServer.app)
            .put(`/api/todos/${toDoId}`)
            .send({ text: 'ToDo Updated' })
            .expect(400);

        expect(body).toEqual({ message: 'id must be a valid number' });
    });

    test('Should return an updated ToDo only with text api/todos/:id', async () => {
        const toDo = await prisma.toDo.create({ data: toDo1 });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${toDo.id}`)
            .send({ text: 'ToDo Updated' })
            .expect(200);

        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual({
            id: toDo.id,
            text: 'ToDo Updated',
            completedAt: null,
        });
    });

    test('Should return an updated ToDo only with date api/todos/:id', async () => {
        const toDo = await prisma.toDo.create({ data: toDo1 });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${toDo.id}`)
            .send({ completedAt: '2023-01-11' })
            .expect(200);

        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual({
            id: toDo.id,
            text: toDo.text,
            completedAt: '2023-01-11T00:00:00.000Z',
        });
    });

    test('Should return an updated ToDo with empty data api/todos/:id', async () => {
        const toDo = await prisma.toDo.create({ data: toDo1 });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${toDo.id}`)
            .send({})
            .expect(200);

        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual({
            id: toDo.id,
            text: toDo.text,
            completedAt: null,
        });
    });

    test('Should return an deleted ToDo api/todos/:id', async () => {
        const toDo = await prisma.toDo.create({ data: toDo1 });

        const { body } = await request(testServer.app)
            .delete(`/api/todos/${toDo.id}`)
            .expect(200);

        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual({
            id: toDo.id,
            text: toDo.text,
            completedAt: null,
        });
    });

    test('Should return 404 if ToDo not found in the delete api/todos/:id', async () => {
        const toDoId = 1;
        const { body } = await request(testServer.app)
            .delete(`/api/todos/${toDoId}`)
            .expect(404);

        expect(body).toEqual({ error: `ToDo with id ${toDoId} not found` });
    });

    test('Should return 400 if id is not a number in the delete api/todos/:id', async () => {
        const toDoId = 'invalidId';
        const { body } = await request(testServer.app)
            .delete(`/api/todos/${toDoId}`)
            .expect(400);

        expect(body).toEqual({ message: 'Invalid ID' });
    });
});
