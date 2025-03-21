import { AppDataSource } from "../config/database";
import { Todo } from "../entities/todo";
import { TodoDTO } from "../dto/todoDto";
import { DeepPartial } from "typeorm";

import { z } from 'zod';

const todoSchema = z.object({
    title: z.string(),
    description:z.string(),
    status: z.enum(['Pending','Completed'])
})

export class TodoServices {
    private todoRepository = AppDataSource.getRepository(Todo);

    async create(todoDto: TodoDTO): Promise<Todo|{ error: any }> {
        
        const result = todoSchema.safeParse(todoDto);

        if(!result.success){
            return { error: result.error };
        }
        try {
            const todo = this.todoRepository.create(todoDto); 
            return await this.todoRepository.save(todo);
        } catch (error) {
            return { error };
        }        
    }

    async getAll(): Promise<Todo[]> {
        return this.todoRepository.find();
    }

    async getById(id: number): Promise<Todo | null> {
        return this.todoRepository.findOneBy({ id }) || null;
    }

    async update(id: number, todoDto: TodoDTO): Promise<Todo | null> {
        const todo = await this.getById(id);
        if (!todo) return null;
        Object.assign(todo, todoDto);
        return this.todoRepository.save(todo);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.todoRepository.delete(id);
        return result.affected ? true : false;
    }

    async toggle_todo(id: number): Promise<Todo|null> {
        const todo = await this.getById(id);
        if (!todo) return null;

        if(todo.status == 'Completed'){
            todo.status = 'Pending'
        }
        else{
            todo.status = 'Completed'
        }
        Object.assign(todo,todo);
        return this.todoRepository.save(todo);
    }

}