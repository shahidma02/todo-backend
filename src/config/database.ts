import { DataSource } from "typeorm";
import { Todo } from "../entities/todo";

export const AppDataSource = new DataSource({
    type: "postgres",
    host:"localhost",
    port: 5432,
    username: "postgres",
    password: "12345",
    database:"Todo",
    synchronize: true,
    logging:true,
    entities:[Todo],
    migrations:[],
    subscribers:[]
})