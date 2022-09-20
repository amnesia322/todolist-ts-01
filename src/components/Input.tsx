import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
    const userMessage = error
        ? <div style={{color: "hotpink"}}>Title is required!</div>
        : <div style={{opacity: 0.6}}>Please, create title</div>

    return (
        <div>
            <input className={error ? 'error' : ''} value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownAddTask}
                   onBlur={onBlurInputHandler}/>
            <button onClick={addTask}>+</button>
            {userMessage}
        </div>
    );
};

export default Input;