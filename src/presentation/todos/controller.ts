import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateToDoDto, UpdateToDoDto } from '../../domain/dtos/todos';

export class ToDosController {
    //* DI
    constructor() {}

    public getToDos = async (req: Request, res: Response) => {
        const toDos = await prisma.toDo.findMany();
        return res.json(toDos);
    };

    public getToDoById = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

        const toDo = await prisma.toDo.findFirst({ where: { id } });

        toDo
            ? res.json(toDo)
            : res.status(404).json({ message: 'ToDo not found' });
    };

    public createToDo = async (req: Request, res: Response) => {
        const [error, createToDoDto] = CreateToDoDto.create(req.body);
        if (error) return res.status(400).json({ message: error });

        const todo = await prisma.toDo.create({ data: createToDoDto! });

        return res.json(todo);
    };

    public updateToDo = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
                
        const [error, updateToDoDto] = UpdateToDoDto.create({ ...req.body, id });
        
        if (error) return res.status(400).json({ message: error });
        
        const toDo = await prisma.toDo.findFirst({ where: { id } });

        if (!toDo) return res.status(404).json({ message: 'ToDo not found' });

        const updateToDo = await prisma.toDo.update({
            where: { id },
            data: updateToDoDto!.values,
        });

        return res.json(updateToDo);
    };

    public deleteToDo = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

        const toDo = await prisma.toDo.findFirst({ where: { id } });

        if (!toDo)
            return res
                .status(404)
                .json({ message: `ToDo whit id ${id} not found` });

        const toDoDeleted = await prisma.toDo.delete({ where: { id } });

        if (!toDoDeleted)
            return res
                .status(404)
                .json({ message: `ToDo with id ${id} not found` });

        return res.json({ toDoDeleted, message: 'ToDo deleted' });
    };
}
