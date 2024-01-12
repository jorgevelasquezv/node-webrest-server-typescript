import { UpdateToDoDto } from './../../domain/dtos/todos/update-todo.dto';
import { CreateToDoDto, ToDoDataSource, ToDoEntity, ToDoRepository } from "../../domain";

export class ToDoRepositoryImpl implements ToDoRepository {
    constructor(private readonly toDoDataSource: ToDoDataSource) {}

    create(createToDoDto: CreateToDoDto): Promise<ToDoEntity> {
        return this.toDoDataSource.create(createToDoDto);
    }

    getAll(): Promise<ToDoEntity[]> {
        return this.toDoDataSource.getAll();
    }

    findById(id: number): Promise<ToDoEntity> {
        return this.toDoDataSource.findById(id);
    }

    updateById(updateToDoDto: UpdateToDoDto): Promise<ToDoEntity> {
        return this.toDoDataSource.updateById(updateToDoDto);   
    }

    deleteById(id: number): Promise<ToDoEntity> {
        return this.toDoDataSource.deleteById(id);
    }
}