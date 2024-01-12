import { Router } from 'express';
import { ToDosController } from './controller';
import { ToDoDataSourceImpl } from '../../infracstructure/datasource/todo.datasource.impl';
import { ToDoRepositoryImpl } from '../../infracstructure/repositories/todo.repository.impl';

export class TodoRoutes {

    static get routes(): Router {
        const router = Router();

        const dataSource = new ToDoDataSourceImpl();
        const toDoRepository = new ToDoRepositoryImpl(dataSource);

        const toDosController = new ToDosController(toDoRepository);

        router.get('/', toDosController.getToDos);
        router.get('/:id', toDosController.getToDoById);
        router.post('/', toDosController.createToDo);
        router.put('/:id', toDosController.updateToDo);
        router.delete('/:id', toDosController.deleteToDo);

        return router;
    }
}
