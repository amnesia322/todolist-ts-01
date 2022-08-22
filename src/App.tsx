import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";

export type FilterType = "all" | "active" | "completed";

function App() {
    //BLL:


    const toDoListTitle: string = "What to learn today?";

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS&TS", isDone: true},
        {id: 3, title: "REACT", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterType>("all")



    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    const removeTask = (taskID: number) => {

        setTasks(tasks.filter(t => t.id !== taskID));
    }


    //UI
    return (
        <div className="App">
            <ToDoList title={toDoListTitle} tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
