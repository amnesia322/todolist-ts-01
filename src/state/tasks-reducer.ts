import { TasksStateType} from "../App";
import {v1} from "uuid";
import {addToDoListACType, removeToDoListACType} from "./todolists-reducer";


type ActionsType = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addToDoListACType
    | removeToDoListACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistID]:
                    state[action.payload.todolistID].filter(t => t.id != action.payload.taskID)
            }
        }
        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistID]:
                    state[action.payload.todolistID].map(t => t.id === action.payload.taskID ?
                        {...t, isDone: action.payload.isDone} : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistID]:
                    state[action.payload.todolistID].map(t => t.id === action.payload.taskID ?
                        {...t, title: action.payload.title} : t)
            }
        }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.id]: []
            }
        case'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.payload.id]
            return stateCopy;
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            taskID: taskID,
            todolistID: todolistID
        }
    } as const
}

export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title,
            todolistID: todolistID
        }
    } as const
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskID: taskID,
            isDone: isDone,
            todolistID: todolistID
        }
    } as const
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskID: taskID,
            title: title,
            todolistID: todolistID
        }
    } as const
}