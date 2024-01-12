import { UpdateToDoDto } from '../../dtos/todos';
import { ToDoEntity } from '../../entities/todo.entity';
import { ToDoRepository } from '../../repositories/todo.repository';

export interface UpdateToDoUseCase {
    execute(dto: UpdateToDoDto): Promise<ToDoEntity>;
}

export class UpdateToDo implements UpdateToDoUseCase {
    constructor(private readonly repository: ToDoRepository) {}

    execute(dto: UpdateToDoDto): Promise<ToDoEntity> {
        return this.repository.updateById(dto);
    }
}
