// ItemService.js

import { db } from './Firebase';
import {Alert} from 'react-native';

export const addItem =  (item) => {
    db.add({ key: item.key, title: item.title, isCompleted: item.isCompleted });
}

export const readItem = () => {
    let list = [];
    db.get().then((toDolist) => {
            toDolist.forEach((doc) => {
                const { key, title, isCompleted } = doc.data(); 
                list.push({key, title, isCompleted});
                }
        )
    })
    return list;
}