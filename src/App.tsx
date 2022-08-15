import React from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";

function App() {
    //BLL:
    const toDoListTitle_1: string = "What to learn today?";
    const toDoListTitle_2: string = "What to learn next week?";
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS&TS", isDone: true},
        {id: 3, title: "REACT", isDone: false},
    ]

    const tasks_2: Array<TaskType> = [
        {id: 1, title: "Algorithm", isDone: true},
        {id: 2, title: "SaSS", isDone: true},
        {id: 3, title: "REACT", isDone: false},
    ]

    //UI
    return (
        <div className="App">
            <ToDoList title={toDoListTitle_1} tasks={tasks_1}/>
            <ToDoList title={toDoListTitle_2} tasks={tasks_2}/>
        </div>
    );
}

export default App;
