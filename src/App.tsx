import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed";

function App() {
    //BLL:
    console.log(v1())


    const toDoListTitle: string = "What to learn today?";

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS&TS", isDone: true},
        {id: v1(), title: "REACT", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterType>("all")

    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    const removeTask = (taskID: string) => {

        setTasks(tasks.filter(t => t.id !== taskID));
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id !== taskID ? t : {...t, isDone}))
    }

    const getTusksForTodolist = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    //UI


        return (
            <div className="App">
                <ToDoList title={toDoListTitle} tasks={getTusksForTodolist()} removeTask={removeTask} filter={filter}
                          changeFilter={changeFilter} addTask={addTask} changeStatus={changeStatus}/>
            </div>
        );
    }

    export default App;
