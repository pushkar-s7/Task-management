import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import Userr from './userr';
 
@Entity()
class Task {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  task: string;
 
  @ManyToOne(()=>Userr,(user)=>user.tasks)
   userId:Userr
}
export default Task;