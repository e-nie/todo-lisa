import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterPropsType, ListPropsType} from "./App";
import s from './ShoppingList.module.css'

export type ShoppingListPropsType = {
    name: string
    list: ListPropsType[]
    changeFilter: (filter: FilterPropsType) => void
    removeItem: (itemId: string) => void
    addItem: (newItemTitle: string) => void

}

export const ShoppingList = (props: ShoppingListPropsType) => {

    const onClickAllHandler = () => props.changeFilter('All')
    const onClickActiveHandler = () => props.changeFilter('Active')
    const onClickCompletedHandler = () => props.changeFilter('Completed')

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string | null>('')


    const addItemTitle = () => {
        if (value.trim()) {
            props.addItem(value.trim())
            // setValue('')
        } else {
            setError('Please, enter the title')
        }
        setValue('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addItemTitle()
        }
    }

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        // console.log(e.currentTarget.value);
        setError(null)
    }


    return (
        <div>

            <h1>
                {props.name}
            </h1>
            <div>
                <input className = {error ? s.errorInput : ''} onChange = {onChangeValue} onKeyDown = {onKeyDownHandler}
                       value = {value} />
                <button onClick = {addItemTitle} disabled = {!!error}>+</button>
            </div>
            {error && <div className = {s.errorText}>{error}</div>}

            {props.list.map((el) => {
                return (
                    <ul>
                        <h3>{el.category}
                            <button onClick = {() => props.removeItem(el.id)}>x</button>
                        </h3>
                        <li><input type = 'checkbox' checked = {el.cart} />
                            {el.item}</li>
                    </ul>
                )
            })}
            <div>
                <button onClick = {onClickAllHandler}>All</button>
                <button onClick = {onClickActiveHandler}>Active</button>
                <button onClick = {onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    );
};
