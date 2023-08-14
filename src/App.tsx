import React, {useState} from 'react';
import './App.css';
import {ShoppingList} from "./ShoppingList";
import {v1} from "uuid";

export type ListPropsType = {
    id: string
    category: CategoryPropsType
    item: string
    cart: boolean
    filter: FilterPropsType
}

export type FilterPropsType = 'Active' | 'Completed' | 'All'

type CategoryPropsType = 'Household chemicals' | 'Food' | 'Stationery' | 'Other'

function App() {

    const [list, setList] = useState<Array<ListPropsType>>([
        {id: v1(), category: 'Household chemicals', item: 'washing powder', cart: false, filter: 'Active'},
        {id: v1(), category: 'Household chemicals', item: 'soap', cart: true, filter: 'Completed'},
        {id: v1(), category: 'Food', item: 'Bread', cart: false, filter: 'Active'},
        {id: v1(), category: 'Food', item: 'Milk', cart: true, filter: 'Completed'},
        {id: v1(), category: 'Stationery', item: 'Paper for printer', cart: true, filter: 'Completed'},
        {id: v1(), category: 'Stationery', item: 'Notebook', cart: false, filter: 'Active'},
        {id: v1(), category: 'Other', item: 'Batteries', cart: true, filter: 'Completed'},
        {id: v1(), category: 'Other', item: 'Light bulb', cart: false, filter: 'Active'}
    ])

    const [filter, setFilter] = useState<FilterPropsType>('All')

    const removeItem = (itemId: string) => {
        setList(list.filter(el => el.id !== itemId))
    }

    const addItem = (newItemTitle: string) => {
        const newItem: ListPropsType = {id: v1(), category: "Other", item: newItemTitle, cart: false, filter: 'All'}
        setList([newItem, ...list])
    }

    const changeFilter = (filter: FilterPropsType) => {
        setFilter(filter)
    }

    const copyList = list
    let filteredList = copyList

    // let filteredList = list

    if (filter === 'Active') {
        filteredList = copyList.filter((elem) => {
                return (
                    elem.filter === 'Active'
                )
            }
        )
    }
    if (filter === 'Completed') {
        filteredList = copyList.filter((elem) => {
            return (
                elem.filter === 'Completed'
            )
        })
    }

    return (
        <div className = "App">
            <ShoppingList
                name = 'What to buy'
                list = {filteredList}
                changeFilter = {changeFilter}
                removeItem = {removeItem}
                addItem = {addItem} />
        </div>
    );
}

export default App;
