import { PrimaryGeneratedColumn, Entity, Column} from "typeorm";

@Entity()
export class Todo  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;  

    @Column({ type: "enum", enum: ["Pending", "Completed"], default: "Pending" })  
    status: "Pending" | "Completed";  
}
