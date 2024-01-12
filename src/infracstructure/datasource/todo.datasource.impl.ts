import { prisma } from '../../data/postgres';
import {
    CreateToDoDto,
    CustomError,
    ToDoDataSource,
    ToDoEntity,
    UpdateToDoDto,
} from '../../domain';

export class ToDoDataSourceImpl implements ToDoDataSource {
    
    async create(createToDoDto: CreateToDoDto): Promise<ToDoEntity> {
        const todo = await prisma.toDo.create({ data: createToDoDto });

        return ToDoEntity.fromObject(todo);
    }

    async getAll(): Promise<ToDoEntity[]> {
        const toDos = await prisma.toDo.findMany();
        return toDos.map(toDo => ToDoEntity.fromObject(toDo));
    }

    async findById(id: number): Promise<ToDoEntity> {
        const toDo = await prisma.toDo.findFirst({ where: { id } });

        if (!toDo) throw new CustomError(`ToDo with id ${id} not found`, 404);
        return ToDoEntity.fromObject(toDo);
    }

    async updateById(updateToDoDto: UpdateToDoDto): Promise<ToDoEntity> {
        await this.findById(updateToDoDto.id);

        const updateToDo = await prisma.toDo.update({
            where: { id: updateToDoDto.id },
            data: updateToDoDto.values,
        });

        return ToDoEntity.fromObject(updateToDo);
    }

    async deleteById(id: number): Promise<ToDoEntity> {
        await this.findById(id);

        const toDoDeleted = await prisma.toDo.delete({ where: { id } });

        return ToDoEntity.fromObject(toDoDeleted);
    }
}
