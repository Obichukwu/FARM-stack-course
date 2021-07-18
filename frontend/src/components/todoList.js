import TodoItem from './todoItem'

export default function TodoList(props) {
    return (
        <div>
            <ul>
                {props.todoList.map(todo => <TodoItem todo={todo} key={todo.id} />)}
            </ul>
        </div>
    )
}