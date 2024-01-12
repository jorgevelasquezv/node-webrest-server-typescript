import { Request, Response } from 'express';
import { CreateToDoDto, UpdateToDoDto } from '../../domain/dtos/todos';
import {
    GetToDo,
    GetToDos,
    ToDoRepository,
    CreateToDo,
    UpdateToDo,
    DeleteToDo,
    CustomError,
} from '../../domain';

export class ToDosController {
    //* DI
    constructor(private readonly toDoRepository: ToDoRepository) {}

    public getToDos = (req: Request, res: Response) => {
        new GetToDos(this.toDoRepository)
            .execute()
            .then(toDos => res.json(toDos))
            .catch(error => this.handlerError(res, error));
    };

    public getToDoById = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

        new GetToDo(this.toDoRepository)
            .execute(id)
            .then(toDo => res.json(toDo))
            .catch(error => this.handlerError(res, error));
    };

    public createToDo = (req: Request, res: Response) => {
        const [error, createToDoDto] = CreateToDoDto.create(req.body);
        if (error) return res.status(400).json({ message: error });

        new CreateToDo(this.toDoRepository)
            .execute(createToDoDto!)
            .then(todo => res.status(201).json(todo))
            .catch(error => this.handlerError(res, error));
    };

    public updateToDo = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const [error, updateToDoDto] = UpdateToDoDto.create({
            ...req.body,
            id,
        });

        if (error) return res.status(400).json({ message: error });

        new UpdateToDo(this.toDoRepository)
            .execute(updateToDoDto!)
            .then(updateToDo => res.json(updateToDo))
            .catch(error => this.handlerError(res, error));
    };

    public deleteToDo = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

        new DeleteToDo(this.toDoRepository)
            .execute(id)
            .then(toDo => res.json(toDo))
            .catch(error => this.handlerError(res, error));
    };

    private handlerError = (res: Response, error: unknown) => {
        if (error instanceof CustomError)
            return res.status(error.statusCode).json({ error: error.message });
        return res.status(500).json({ error: 'Internal Server Error' });
    };
}
