import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Task from "./task"

@Entity()
class Userr {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => Task, (task) => task.userId, { cascade: true })
  tasks: Task[]
}
export default Userr
