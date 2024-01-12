import { ToDoEntity } from '../../entities/todo.entity';
import { ToDoRepository } from '../../repositories/todo.repository';

export interface GetToDosUseCase {
    execute(): Promise<ToDoEntity[]>;
}

export class GetToDos implements GetToDosUseCase {
    constructor(private readonly repository: ToDoRepository) {}

    execute(): Promise<ToDoEntity[]> {
        return this.repository.getAll();
    }
}
