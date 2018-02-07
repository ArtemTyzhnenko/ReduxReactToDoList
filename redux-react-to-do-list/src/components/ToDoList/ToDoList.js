import React from 'react';
import ToDoItem from './components/ToDoItem/ToDoItem'

const ToDoList = ({
                      toDoList,
                      onClickToggle,
                      hasToDo,
                      saveEdited,
                      onChecked,
                      editableChange,
                      setEditableId,
                      onRemove,
                      active,
                      editableId,
                      inputChangeBlur,
                      deleteEmptyValue,
                  }) =>
    (hasToDo) ? (
        <ul className={'list-of-todo'}>
            <button className="toggle-all" type="button" onClick={onClickToggle}/>
            <ToDoItem
                active={active}
                saveEdited={saveEdited}
                onChecked={onChecked}
                editableChange={editableChange}
                setEditableId={setEditableId}
                onRemove={onRemove}
                toDoList={toDoList}
                onClickRemoveButton={onRemove}
                editableId={editableId}
                inputChangeBlur={inputChangeBlur}
                deleteEmptyValue ={deleteEmptyValue}
            />
        </ul>
    ) : null;


export default ToDoList;