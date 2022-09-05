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
    filter: FilterType
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
}

const ToDoList = (props: ToDoListPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const taskItem = props.tasks.length
        ? props.tasks.map(t => {
            return (
                <li key={t.id} className={t.isDone ? "isDone" : ""}>
                    <input type="checkbox" checked={t.isDone}
                           onChange={(e) => props.changeStatus(t.id, e.currentTarget.checked)}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
                </li>

            )
        })
        : <span>Tasks list is empty</span>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onClickHandler()
    }
    const onClickHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const handlerCreator = (filter: FilterType) => {
        return () => {
            props.changeFilter(filter)
        }
    }
    const userMessage =
        error
            ? <div style={{color: "hotpink"}}>Title is required!</div>
            : <div style={{opacity: 0.6}}>Please, create title</div>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? 'error' : ''} value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownAddTask}/>
                <button onClick={onClickHandler}>+</button>
                {userMessage}
            </div>
            <ul>
                {taskItem}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'btn-active btn' : 'btn'}
                        onClick={handlerCreator("all")}>All
                </button>
                <button className={props.filter === 'active' ? 'btn-active btn' : 'btn'}
                        onClick={handlerCreator("active")}>Active
                </button>
                <button className={props.filter === 'completed' ? 'btn-active btn' : 'btn'}
                        onClick={handlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default ToDoList;