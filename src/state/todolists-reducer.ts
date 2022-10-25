import {FilterType, ToDoListsType} from "../App";
import {v1} from "uuid";

type ActionsType = removeToDoListACType | addToDoListACType | changeToDoListACType | changeToDoListFilterACType

export type removeToDoListACType = ReturnType<typeof removeToDoListAC>
export type addToDoListACType = ReturnType<typeof addToDoListAC>
type changeToDoListACType = ReturnType<typeof changeToDoListTitleAC>
type changeToDoListFilterACType = ReturnType<typeof changeToDoListFilterAC>

export const toDoListReducer = (state: Array<ToDoListsType>, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.payload.id)
        case "ADD-TODOLIST":
            const newToDoList: ToDoListsType = {id: v1(), title: action.payload.title, filter: 'all'}
            return [...state, newToDoList]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.payload.id ? {...t, filter: action.payload.filter} : t)
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeToDoListAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistID
        }
    } as const
}

export const addToDoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: title,
            id: v1()
        }
    } as const
}

export const changeToDoListTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: id,
            title: title
        }
    } as const
}

export const changeToDoListFilterAC = (id: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: id,
            filter: filter
        }
    } as const
}