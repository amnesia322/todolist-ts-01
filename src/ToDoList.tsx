import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import Input from "./components/Input";
import EditableSpan from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type ToDoListPropsType = {
    toDoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    filter: FilterType
    changeFilter: (filter: FilterType, toDoListID: string) => void
    addTask: (title: string, toDoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, toDoListID: string) => void
    changeTask: (toDoListID: string, taskID: string, currentTitle: string) => void
    editToDoList: (toDoListID: string, currentTitle: string) => void
}

const ToDoList = (props: ToDoListPropsType) => {

    const onClickRemoveToDoListHandler = () => {
        props.removeToDoList(props.toDoListID)
    }
    const handlerCreator = (filter: FilterType, toDoListID: string) => {
        return () => {
            props.changeFilter(filter, toDoListID)
        }
    }
    const addTaskHandler = (newTitle: string) => {
        props.addTask(newTitle, props.toDoListID)
    }
    const editToDoListHandler = (id: string, currentTitle: string) => {
        props.editToDoList(id, currentTitle)
    }
    const changeTaskHandler = (id: string, currentTitle: string) => {
        props.changeTask(props.toDoListID, id, currentTitle)
    }


    const taskItem = props.tasks.length
        ? props.tasks.map(t => {
            const onClickRemoveTask = () => {
                props.removeTask(t.id, props.toDoListID)
            }
            const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(t.id, e.currentTarget.checked, props.toDoListID)
            }

            return (
                <li key={t.id} className={t.isDone ? "isDone" : ""}>
                    <Checkbox checked={t.isDone}
                              onChange={onChangeCheckbox} defaultChecked />
                    <EditableSpan title={t.title} callBack={changeTaskHandler} id={t.id}/>
                    <IconButton aria-label="delete" onClick={onClickRemoveTask}>
                        <Delete />
                    </IconButton>
                </li>

            )
        })
        : <span>Tasks list is empty</span>


    return (
        <div>
            <h3><EditableSpan title={props.title} callBack={editToDoListHandler} id={props.toDoListID}/>
                <IconButton aria-label="delete" onClick={onClickRemoveToDoListHandler}>
                    <Delete />
                </IconButton>

            </h3>
            <Input callBack={addTaskHandler}/>
            <ul>
                {taskItem}
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : 'outlined' } color="success" onClick={handlerCreator("all", props.toDoListID)}>All</Button>
                <Button variant={props.filter === 'active' ? "contained" : 'outlined' } color="error" onClick={handlerCreator("active", props.toDoListID)}>Active</Button>
                <Button variant={props.filter === 'completed' ? "contained" : 'outlined' } color="secondary" onClick={handlerCreator("completed", props.toDoListID)}>Completed</Button>

                {/*<button className={props.filter === 'all' ? 'btn-active btn' : 'btn'} onClick={handlerCreator("all", props.toDoListID)}>All </button>*/}
                {/*<button className={props.filter === 'active' ? 'btn-active btn' : 'btn'} onClick={handlerCreator("active", props.toDoListID)}>Active </button>*/}
                {/*<button className={props.filter === 'completed' ? 'btn-active btn' : 'btn'} onClick={handlerCreator("completed", props.toDoListID)}>Completed </button>*/}
            </div>
        </div>
    )
        ;
};

export default ToDoList;