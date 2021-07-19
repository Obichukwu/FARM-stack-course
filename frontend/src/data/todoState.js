import create from 'zustand'
import axios from 'axios';

const axClient = axios.create({
    baseURL: "http://localhost:8000"
})

const useTodoStore = create(set => ({
    todos: [],
    loading: true,
    loadTodos: async () => {
        const response = await axClient.get("/api/todo", { headers: { "Access-Control-Allow-Origin": "*" } })
        set(() => ({ todos: response.data }))
        set(() => ({ loading: false }))
    },
    addTodo: async (todo) => {
        set(() => ({ loading: true }))
        const response = await axClient.post("/api/todo", todo, { headers: { "Access-Control-Allow-Origin": "*" } })
        set(state => ({ todos: state.todos.concat(response.data) }))
        set(() => ({ loading: false }))
    },
    updateTodo: async (id, todo) => {
        set(() => ({ loading: true }))
        const response = await axClient.put(`/api/todo/${id}`, todo, { headers: { "Access-Control-Allow-Origin": "*" } })
        set(state => ({ todos: state.todos.filter(item => item.id !== todo.id).concat(response.data) }))
        set(() => ({ loading: false }))
    },
    deleteTodo: async (todo) => {
        set(() => ({ loading: true }))
        await axClient.delete(`/api/todo/${todo.id}`, { headers: { "Access-Control-Allow-Origin": "*" } })
        set(state => ({ todos: state.todos.filter(item => item.id !== todo.id) }))
        set(() => ({ loading: false }))
    }
}))

export default useTodoStore;