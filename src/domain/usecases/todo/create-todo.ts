import { CreateToDoDto } from "../../dtos/todos";
import { ToDoEntity } from "../../entities/todo.entity";
import { ToDoRepository } from "../../repositories/todo.repository";

export interface CreateToDoUseCase {
    execute(dto: CreateToDoDto): Promise<ToDoEntity>;
}

export class CreateToDo implements CreateToDoUseCase{

    constructor(private readonly repository: ToDoRepository) {}

    execute(dto: CreateToDoDto): Promise<ToDoEntity> {
        return this.repository.create(dto);
    }
    
}