import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/database";
import todoRoutes from "./routes/todoRoutes";


const app = express();
app.use(express.json());

AppDataSource.initialize().then(()=>{
    console.log("Database connected!");
})
.catch((error)=>{
    console.log("Database connection failed", error);
});

app.use("/todo", todoRoutes);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});