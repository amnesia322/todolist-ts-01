import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
}

const ToDoList = (props: ToDoListPropsType) => {

    const [title, setTitle] = useState<string>('')
    const taskItem = props.tasks.length
        ? props.tasks.map(t => {
            return (
                <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
                </li>

            )
        })
        : <span>Tasks list is empty</span>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onClickHandler()
    }
    const onClickHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const handlerCreator = (filter: FilterType) => {
        return () => {
            props.changeFilter(filter)
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownAddTask}/>
                <button onClick={() => onClickHandler()}>+</button>
            </div>
            <ul>
                {taskItem}
            </ul>
            <div>
                <button onClick={handlerCreator("all")}>All</button>
                <button onClick={handlerCreator("active")}>Active</button>
                <button onClick={handlerCreator("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;