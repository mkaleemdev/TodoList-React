import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';


const Todo = () => {
    const [list, setList] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [editIndex, setEditIndex] = useState(null)


    const addTodo = () => {
        if (editIndex !== null) {
            const tempList = [...list];
            tempList[editIndex] = inputValue;
            setList(tempList);
            setEditIndex(null);
            toast.success('Todo Update Successfully')
        } else {
            setList([...list, inputValue]);
        }
        setInputValue('');
    };

    const deleteTodo = (ind) => {
        const DelList = list.filter((_, i) => i !== ind);
        setList(DelList);
        toast.success('Todo Delete Successfully')
    }

    const editTodo = (ind) => {
        setInputValue(list[ind]);
        setEditIndex(ind);
    }



    return (
        <>
            <section className='mt-5'>
                <div className="container d-flex justify-content-center">
                    <div className='col-md-7 todoDiv'>
                        <div>
                            <h2 className='text-center pb-3 text-white'>To Do List</h2>
                        </div>

                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Your Name"
                                aria-label="Enter Your Name"
                                aria-describedby="basic-addon2"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            {editIndex !== null ?
                                <Button variant="btn btn-primary" id="button-addon1" onClick={addTodo}>
                                    Update Todo
                                    <Toaster
                                        position="top-center"
                                        reverseOrder={false}
                                    />
                                </Button> :
                                <Button variant="btn btn-primary" id="button-addon1" onClick={addTodo}>
                                    Add Todo
                                </Button>}

                        </InputGroup>

                        <div className='mt-5 d-flex justify-content-end'>
                            <div className='col-3'>
                                <input type="search" className='form-control' placeholder='Search' />
                            </div>
                        </div>

                        <div className='pt-3 mt-3  border-top'>
                            <ul className='todo-ul'>
                                {
                                    list.map((elem, ind) => {
                                        return (
                                            <li className='row' >
                                                <div className='col-1 d-flex align-items-center'>
                                                    <span>{ind + 1}</span>
                                                </div>
                                                <div className='col-8 d-flex align-items-center'>
                                                    <p>{elem}</p>
                                                </div>
                                                <div className='col-3 d-flex justify-content-evenly'>
                                                    <Button className='btn btn-secondary' onClick={() => editTodo(ind)}>
                                                        <FaEdit />
                                                    </Button>
                                                    <Button className='btn btn-danger' onClick={() => deleteTodo(ind)}>
                                                        <MdDeleteForever />
                                                        <Toaster
                                                            position="top-center"
                                                            reverseOrder={false}
                                                        />
                                                    </Button>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Todo