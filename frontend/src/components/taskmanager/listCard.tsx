import { BiTrash } from "react-icons/bi"
import "./listCard.css"
import { Task } from "./taskList"
import useTaskstore from "../../stores/taskStore"

interface PropsData {
  tasks: Task[]
}

const ListCard: React.FC<PropsData> = ({ tasks }) => {
  const deleteTask = useTaskstore((state) => state.deleteTask)

  const deleteProduct = async (id: number) => {
    deleteTask(id)
  }

  return (
    <div>
      {tasks.map((task, index) => (
        <ul className="menu" key={task.id}>
          <span className="lCard_li">
            <p className="lCard_index">{index + 1}</p>
          </span>
          <span className="lCard_li">
            <p className="lCard_task">{task.task}</p>
          </span>
          <span className="lCard_li">
            <button
              className="lCard_btn"
              onClick={() => deleteProduct(task.id)}
            >
              <BiTrash />
            </button>
          </span>
        </ul>
      ))}
    </div>
  )
}

export default ListCard
