import { BiTrash } from "react-icons/bi"
import "./listCard.css"
import useTask from "../../services/Task"

const ListCard = ({ tasks }) => {
  const { deleteTask } = useTask()
  const deleteProduct = async (id: number) => {
    await deleteTask(id)
  }
  return (
    <>
      <div>
        {tasks.map((task, index) => (
          <div key={task.id}>
            <ul className="menu">
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
          </div>
        ))}
      </div>
    </>
  )
}

export default ListCard
