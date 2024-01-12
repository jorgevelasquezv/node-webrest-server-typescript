import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateToDoDto, UpdateToDoDto } from '../../domain/dtos/todos';
import { ToDoRepository } from '../../domain';

export class ToDosController {
    //* DI
    constructor(private readonly toDoRepository: ToDoRepository) {}

    public getToDos = async (req: Request, res: Response) => {
        const toDos = await this.toDoRepository.getAll();
        return res.json(toDos);
    };

    public getToDoById = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

        try {
            const toDo = await this.toDoRepository.findById(id);
            res.json(toDo);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    public createToDo = async (req: Request, res: Response) => {
        const [error, createToDoDto] = CreateToDoDto.create(req.body);
        if (error) return res.status(400).json({ message: error });

        const todo = await this.toDoRepository.create(createToDoDto!);

        return res.json(todo);
    };

    public updateToDo = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const [error, updateToDoDto] = UpdateToDoDto.create({
            ...req.body,
            id,
        });

        if (error) return res.status(400).json({ message: error });

        try {
            const updateToDo = await this.toDoRepository.updateById(
                updateToDoDto!
            );

            return res.json(updateToDo);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    };

    public deleteToDo = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

        try {
            const toDoDeleted = await prisma.toDo.delete({ where: { id } });
            return res.json({ toDoDeleted, message: 'ToDo deleted' });
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    };
}
