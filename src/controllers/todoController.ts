import {Request, Response} from "express";
import { TodoServices } from "../services/todoService";
import { TodoDTO } from "../dto/todoDto";
import { error } from "console";
// import { error } from "console";

export class TodoControllers {

    static async createTodo (req: Request, res:Response): Promise<void>{
        try{
            const todo = await new TodoServices().create(req.body);
            if ('error' in todo)
            {
                res.status(400).json({message:todo.error});
            }
            else{
                res.status(201).json(todo);
            }
            
        }catch(error:any){
            res.status(500).json({message:error.message});
        }
    };

    static async getAllTodos (req: Request, res:Response): Promise<void>{
        try{
            const todos = await new TodoServices().getAll();
            res.status(200).json(todos);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    };

    static async updateTodo (req: Request, res:Response):Promise<any>{
        try{
            const todoDto: TodoDTO = req.body;
            const updatedTodo = await new TodoServices().update(+req.params.id, todoDto);
            if (!updatedTodo){
                return res.status(404).json({message:"Todo Not Found"})
            }
            return res.status(200).json({message:"Todo Updates Successfully"})
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    };
    
    
    static async deleteTodo (req: Request, res:Response):Promise<any>{
        try{
            const isDeleted = await new TodoServices().delete(+req.params.id);
            if (!isDeleted){
                return res.status(404).json({message:"Todo Not Found"})
            }
            return res.status(200).json({message:"Todo Deletes Successfully"})
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    };

    static async markTodo (req: Request, res:Response):Promise<any>{
        try{
            const updatedTodo = await new TodoServices().toggle_todo(+req.params.id);
            if (!updatedTodo){
                return res.status(404).json({message:"Todo Not Found"})
            }
            return res.status(200).json({message:"Todo Updates Successfully"})
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    };
    

}



