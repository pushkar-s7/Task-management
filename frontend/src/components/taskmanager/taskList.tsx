import React, { useEffect, useState } from 'react';
import "./taskList.css";
import ListCard from './listCard';


export interface Task {
  id: number;
  task: string;
}

interface Product {
  id: number;
  task: string

}
const id = JSON.parse(localStorage.getItem('auth') || "[]").id;

const TaskList: React.FC = () => {
  const [product, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts(id);
  });

  const getProducts = async (id: any) => {
    let result = await fetch(`http://localhost:5000/task/${id}`, {
      method: 'get',
    })
    let result1: Product[] = await result.json();
    setProducts(result1);
    console.log(result1);
  }



  return (
    <div>
      <ul className='list-header'>
        <li className='header_li'>
          <h6 className='header_h5'> Id </h6>
        </li>
        <li className='header_li'>
          <h6 className='header_h5'> Issue Name </h6>
        </li>
        <li className='header_li'>
          <h6 className='header_h5'> Action </h6>
        </li>
      </ul>
      {
        product.length > 0 ?
          product.map((items, index) =>
            <ListCard key={items.id} data={items} length={index} getProducts={getProducts} />
          ) :
          <h2>No Task found 🤔</h2>
      }
    </div>
  );
};

export default TaskList;