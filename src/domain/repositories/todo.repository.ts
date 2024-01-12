import { CreateToDoDto, UpdateToDoDto } from '../dtos/todos';
import { ToDoEntity } from '../entities/todo.entity';

export abstract class ToDoRepository {
    abstract create(createToDoDto: CreateToDoDto): Promise<ToDoEntity>;

    abstract getAll(): Promise<ToDoEntity[]>;

    abstract findById(id: number): Promise<ToDoEntity>;

    abstract updateById(updateToDoDto: UpdateToDoDto): Promise<ToDoEntity>;

    abstract deleteById(id: number): Promise<ToDoEntity>;
}
