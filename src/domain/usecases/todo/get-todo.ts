import { ToDoEntity } from '../../entities/todo.entity';
import { ToDoRepository } from '../../repositories/todo.repository';

export interface GetToDoUseCase {
    execute(id: number): Promise<ToDoEntity>;
}

export class GetToDo implements GetToDoUseCase {
    constructor(private readonly repository: ToDoRepository) {}

    execute(id: number): Promise<ToDoEntity> {
        return this.repository.findById(id);
    }
}
