import { Request, Response } from 'express';

const toDos = [
    { id: 1, text: 'Buy Milk', completedAt: new Date() },
    { id: 2, text: 'Buy Bread', completedAt: null },
    { id: 3, text: 'Buy Coffee', completedAt: new Date() },
];

export class ToDosController {
    //* DI
    constructor() {}

    public getToDos = (req: Request, res: Response) => {
        return res.json(toDos);
    };

    public getToDoById = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

        const toDo = toDos.find(toDo => toDo.id === id);

        toDo
            ? res.json(toDo)
            : res.status(404).json({ message: 'ToDo not found' });
    };

    public createToDo = (req: Request, res: Response) => {
        const { text } = req.body;

        if (!text) return res.status(400).json({ message: 'Invalid text' });

        const newToDo = {
            id: toDos.length + 1,
            text,
            completedAt: new Date(),
        };

        toDos.push(newToDo);

        return res.json(newToDo);
    };

    public updateToDo = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const { text, completedAt } = req.body;

        if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

        if (!text) return res.status(400).json({ message: 'Invalid text' });

        const toDo = toDos.find(toDo => toDo.id === id);

        if (!toDo) return res.status(404).json({ message: 'ToDo not found' });

        console.log(completedAt);
        
        toDo.completedAt =
            completedAt === null ? null : new Date(completedAt || toDo.completedAt);

        toDo.text = text;

        return res.json(toDo);
    };

    public deleteToDo = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

        const toDoIndex = toDos.findIndex(toDo => toDo.id === id);

        if (toDoIndex === -1)
            return res.status(404).json({ message: 'ToDo not found' });

        toDos.splice(toDoIndex, 1);

        return res.json({ message: 'ToDo deleted' });
    };
}
