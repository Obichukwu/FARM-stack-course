import React from 'react'
import useTodoStore from './../data/todoState'

function TodoItem(props) {

    const delTodo = useTodoStore(state => state.deleteTodo)

    const deleteTodo = () => {
        delTodo(props.todo)
    }

    return (
        <div>
            <p>
                <button onClick={() => deleteTodo()} className="btn btn-outline-danger my-2 mx-2" style={{ 'borderRadius': '50px', }}>X</button>

                <span style={{ fontWeight: 'bold, underline' }}>{props.todo.title} : </span>
                <br />
                {props.todo.description}
            </p>
            <hr></hr>
        </div>
    )
}

export default TodoItem;