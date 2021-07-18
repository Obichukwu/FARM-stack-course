import { useLazyAxios } from 'use-axios-client'
import React from 'react'

function TodoItem(props) {
    const [deleteTodo] = useLazyAxios({
        method: 'delete',
        url: `http://localhost:8000/api/todo/${props.todo.id}`,
        headers: { "Access-Control-Allow-Origin": "*" },
    });

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