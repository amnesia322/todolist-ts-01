import React from 'react';
import {FilterType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}



type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void;
    changeFilter: (filter: FilterType) => void
}

const ToDoList = (props: ToDoListPropsType) => {
    const taskItem = props.tasks.map(t => {
        return (
            <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span><button onClick={ () => {
                props.removeTask(t.id)
            } }>x</button></li>

        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskItem}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter("all")}}>All</button>
                <button onClick={() => {props.changeFilter("active")}}>Active</button>
                <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;