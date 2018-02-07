import React, {Component, Fragment} from 'react';

import './App.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ToDoList from './ToDoList/ToDoList';
import ToDoFooter from './ToDoFooter/ToDoFooter';

import {
    addTodo,
    onChecked,
    onRemove,
    onClickToggle,
    setFilter,
    clearCompleted,
    setEditableId,
    editableChange,
    inputChangeBlur,
    saveEdited,
    deleteEmptyValue,
} from '../modules/todo/actions';


class App extends Component {

    state = {
        value: ''
    };

    filters = {
        all: (list) => list,
        completed: (list) => list.filter((item) => item.check),
        active: (list) => list.filter((item) => !item.check),
    };

    filterTodos = (optionalFilter) => {
        const {toDoList} = this.props.todos;
        return this.filters[optionalFilter](toDoList);
    };

    onSetFilter = (filter) => () => {
        const {actions} = this.props;
        actions.setFilter(filter)
    };

    onSetEditableId = (id, originText) => () => {
        const {actions} = this.props;
        actions.setEditableId(id, originText);
    };

    onInputChangeBlur = (id) => () => {
        const {actions} = this.props;
        actions.inputChangeBlur(id);
    };

    onInputChange = (e) => this.setState({value: e.target.value});

    clearInput = () => this.setState({value: ''});

    onSaveTodo = (e) => {
        const {actions} = this.props;
        const {value} = this.state;
        if (!!value.trim() && e.keyCode === 13) {
            actions.addTodo(value);
            this.clearInput();
        }
    };


    render() {
        const {toDoList, editableId, filter, active, id} = this.props.todos;
        const {value} = this.state;
        const list = this.filterTodos(filter);
        const hasToDo = !!toDoList.length;
        const counter = this.filterTodos('active').length;

        const {actions} = this.props;

        return (
            <Fragment>
                <h1>todos</h1>
                <input type="text"
                       placeholder={'What needs to be done?'}
                       className={'add-input'}
                       onChange={this.onInputChange}
                       onKeyDown={this.onSaveTodo}
                       value={value}
                       maxLength={'450px'}
                />
                <ToDoList toDoList={list}
                          onChecked={actions.onChecked}
                          onRemove={actions.onRemove}
                          onClickToggle={actions.onClickToggle}
                          hasToDo={hasToDo}
                          setEditableId={this.onSetEditableId}
                          editableId={editableId}
                          inputChangeBlur={this.onInputChangeBlur}
                          editableChange={actions.editableChange}
                          saveEdited = {actions.saveEdited}
                          deleteEmptyValue ={actions.deleteEmptyValue}
                          active={active}
                          id={id}
                />
                <ToDoFooter hasToDo={hasToDo}
                            clearCompleted={actions.clearCompleted}
                            onSetFilter={this.onSetFilter}
                            counter={counter}
                            filter={filter}
                />
            </Fragment>
        );
    }
}



const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                addTodo,
                onChecked,
                onRemove,
                onClickToggle,
                setFilter,
                clearCompleted,
                setEditableId,
                editableChange,
                inputChangeBlur,
                saveEdited,
                deleteEmptyValue,
            },
            dispatch,
        ),
    };
};

const mapStateToProps = state => {
    return {
        todos: state.todos,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);