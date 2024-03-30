import {  BiTrash } from 'react-icons/bi';
import './listCard.css'
import { Task } from './taskList';
import { useNavigate } from 'react-router-dom';

interface propsdata{
    data:Task;    
    length:number;
    getProducts:(id:any)=>Promise<void>;
}

const iid = JSON.parse(localStorage.getItem('auth') || "[]").id;

const ListCard = (props:propsdata) => {
   
    const navigate=useNavigate();
    const deleteProduct = async (id:any) => {
        let result = await fetch(`http://localhost:5000/task/${id}`, {
            method: 'Delete'
        })
        result = await result.json();
        if (result) {
           props.getProducts(iid);
           navigate('/taskmanager');
        }
    }
    console.log(props.data);
    return (
        <div>
            <ul className='menu'>
                <p className='lCard_li'>
                    <p className='lCard_para'>
                       {props.length + 1}
                    </p>
                </p>
                <p className='lCard_li'>
                    <p className='lCard_para'>
                    {props.data.task}

                    </p>
                </p>
                <button className='lCard_btn' onClick={() => deleteProduct(props.data.id)}>
                    <BiTrash />
                </button>

            </ul>
        </div>
    );
};

export default ListCard;