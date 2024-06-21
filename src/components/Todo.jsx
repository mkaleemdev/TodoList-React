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

     // Load todos from local storage when component mounts
     useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setList(JSON.parse(savedTodos));
        }
    }, []);

    // Save todos to local storage whenever the list changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(list));
    }, [list]);


    const addTodo = () => {
        if (inputValue.trim() !== '') {
            setList([...list, inputValue]);
            setInputValue('');
        }
    };

    const deleteTodo = (index) => {
        const DelList = list.filter((_, i) => i !== index);
        setList(DelList);
        toast.success('Todo Delete Successfully')
    }

    const editTodo = (index) => {
        console.log(index);
    }


    return (
        <>
            <section className='mt-5'>
                <div className="container d-flex justify-content-center">
                    <div className='col-md-7 todoDiv'>
                        <div>
                            <h2 className='text-center pb-3'>To Do List</h2>
                        </div>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Your Name"
                                aria-label="Enter Your Name"
                                aria-describedby="basic-addon2"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <Button variant="btn btn-primary" id="button-addon2" onClick={addTodo}>
                                Add
                            </Button>
                        </InputGroup>

                        <div className='mt-5 d-flex justify-content-end'>
                            <div className='col-3'>
                                <input type="search" className='form-control' placeholder='Search' />
                            </div>
                        </div>

                        <div className='pt-3 mt-3  border-top'>
                            <ul className='todo-ul'>
                                {
                                    list.map((item, index) => {
                                        return (
                                            <li className='row'>
                                                <div className='col-1'>
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className='col-7'>
                                                    <p>{item}</p>
                                                </div>
                                                <div className='col-4 d-flex justify-content-evenly'>
                                                    <Button className='btn btn-secondary' onClick={() => editTodo(index)}>
                                                        Edit <FaEdit />
                                                    </Button>
                                                    <Button className='btn btn-danger' onClick={() => deleteTodo(index)}>
                                                        Delete <MdDeleteForever />
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