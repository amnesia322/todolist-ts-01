import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";
import Input from "./components/Input";

export type FilterType = "all" | "active" | "completed";
type ToDoListsType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = {
[key: string]: Array<TaskType>
}

function App() {
    //BLL:
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [toDoLists, setToDoLists] = useState<Array<ToDoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeToDoList = (toDoListID: string) => {
        setToDoLists(toDoLists.filter(t => t.id !== toDoListID))
        delete tasks[toDoListID]
        setTasks({...tasks})
    }
    const changeFilter = (filter: FilterType, toDoListID: string) => {
        setToDoLists(toDoLists.map(el => el.id === toDoListID ? {...el, filter: filter} : el))
    }
    const removeTask = (taskID: string, toDoListID: string) => {
    setTasks({...tasks, [toDoListID]: tasks[toDoListID].filter(fl => fl.id !== taskID)})
    }
    const addTask = (title: string, toDoListID: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [toDoListID]: [newTask, ...tasks[toDoListID]]})
    }
    const changeStatus = (taskID: string, isDone: boolean, toDoListID: string) => {
        /*setTasks(tasks.map(t => t.id !== taskID ? t : {...t, isDone}))*/
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].map( t => t.id !== taskID ? t : {...t, isDone})})
    }


    //UI
    return (
        <div className="App">
            <Input callBack={()=>{}}/>
            {toDoLists.map(el => {
                const getTasksForTodolist = () => {
                    switch (el.filter) {
                        case 'active':
                            return tasks[el.id].filter(t => !t.isDone)
                        case 'completed':
                            return tasks[el.id].filter(t => t.isDone)
                        default:
                            return tasks[el.id]
                    }
                }

                return (
                    <ToDoList key={el.id} toDoListID={el.id}
                              title={el.title} tasks={getTasksForTodolist()}
                              removeTask={removeTask} removeToDoList={removeToDoList} filter={el.filter}
                              changeFilter={changeFilter} addTask={addTask}
                              changeStatus={changeStatus}/>
                )
            })}

        </div>
    );
}

export default App;
