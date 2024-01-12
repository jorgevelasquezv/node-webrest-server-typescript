import { ToDoEntity } from '../../entities/todo.entity';
import { ToDoRepository } from '../../repositories/todo.repository';

export interface DeleteToDoUseCase {
    execute(id: number): Promise<ToDoEntity>;
}

export class DeleteToDo implements DeleteToDoUseCase {
    constructor(private readonly repository: ToDoRepository) {}

    execute(id: number): Promise<ToDoEntity> {
        return this.repository.deleteById(id);
    }
}
