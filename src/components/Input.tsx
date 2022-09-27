import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";


type InputType = {
    callBack: (newTitle: string) => void
}

const Input = (props: InputType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        const newTitle = title.trim()
        if (newTitle) {
            props.callBack(newTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }

    const onBlurInputHandler = () => title.trim() === '' ? setError(true) : setError(false)

    return (
        <div>
            <TextField
                error={error}
                id="outlined-basic"
                label={error ? "Title is required" : "Please, create title"}
                variant="outlined"
                value={title}
                size={'small'}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownAddTask}
                onBlur={onBlurInputHandler}/>
            <Button variant="contained"
                    style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}
                    onClick={addTask}>+</Button>
        </div>
    );
};

export default Input;