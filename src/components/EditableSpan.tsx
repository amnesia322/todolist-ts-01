import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    title: string
    callBack: (taskID: string, currentTitle: string) => void
    id: string
}

const EditableSpan = (props: EditableSpanProps) => {
    const [currentTitle, setCurrentTitle] = useState<string>(props.title)
    const [edit, setEdit] = useState(false)
    const changeEdit = () => {
        setEdit(!edit)
        changeTask()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
    }
    const changeTask = () => {
        const newTitle = currentTitle.trim()
        props.callBack(props.id, newTitle)
    }
    return (
        edit
            ? <input value={currentTitle} onBlur={changeEdit} onChange={onChangeHandler} autoFocus/>
            : <span onDoubleClick={changeEdit}>{props.title}</span>
    );
};

export default EditableSpan;