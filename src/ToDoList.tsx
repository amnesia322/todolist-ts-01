import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";

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
    removeToDoList: (toDoListID: string)=>void
    filter: FilterType
    changeFilter: (filter: FilterType, toDoListID: string) => void
    addTask: (title: string, toDoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, toDoListID: string) => void
}

const ToDoList = (props: ToDoListPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const taskItem = props.tasks.length
        ? props.tasks.map(t => {
            return (
                <li key={t.id} className={t.isDone ? "isDone" : ""}>
                    <input type="checkbox" checked={t.isDone}
                           onChange={(e) => props.changeStatus(t.id, e.currentTarget.checked, props.toDoListID)}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id, props.toDoListID)
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
    const onClickAddTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.toDoListID)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onClickAddTaskHandler()
    }
    const onClickRemoveToDoListHandler = (toDoListID: string) => {
        props.removeToDoList(toDoListID)
    }
    const handlerCreator = (filter: FilterType, toDoListID: string) => {
        return () => {
            props.changeFilter(filter, toDoListID)
        }
    }
    const onBlurInputHandler = () => title.trim() === '' ? setError(true) : setError(false)
    const userMessage = error
        ? <div style={{color: "hotpink"}}>Title is required!</div>
        : <div style={{opacity: 0.6}}>Please, create title</div>

    return (
        <div>
            <h3>{props.title} <button onClick={()=> onClickRemoveToDoListHandler(props.toDoListID)}>x</button></h3>
            <div>
                <input className={error ? 'error' : ''} value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownAddTask}
                       onBlur={onBlurInputHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
                {userMessage}
            </div>
            <ul>
                {taskItem}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'btn-active btn' : 'btn'}
                        onClick={handlerCreator("all", props.toDoListID)}>All
                </button>
                <button className={props.filter === 'active' ? 'btn-active btn' : 'btn'}
                        onClick={handlerCreator("active", props.toDoListID)}>Active
                </button>
                <button className={props.filter === 'completed' ? 'btn-active btn' : 'btn'}
                        onClick={handlerCreator("completed", props.toDoListID)}>Completed
                </button>
            </div>
        </div>
    );
};

export default ToDoList;