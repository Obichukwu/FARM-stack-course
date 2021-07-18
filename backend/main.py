from model import Todo
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import database

# app object
app = FastAPI()

allowed_origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_headers=['*'],
    allow_methods=['*']
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/api/todo", response_model=[])
async def todo_read_all():
    response = await database.fetch_all_todo()
    return response


@app.get("/api/todo/{id}", response_model=Todo)
async def todo_read_one(id: int):
    response = await database.fetch_one_todo(id)
    if response:
        return response
    raise HTTPException(404, f'There is not todo item with Id {id}')


@app.post("/api/todo", response_model=Todo)
async def todo_save(todo: Todo):
    response = await database.create_todo(todo)
    if response:
        return response
    raise HTTPException(400, f'Something went wrong. Bad Request')


@app.put("/api/todo/{id}", response_model=Todo)
async def todo_update_one(id: int, data: Todo):
    response = await database.update_todo(id, data)
    if response:
        return response
    raise HTTPException(404, f'There is not todo item with Id {id}')


@app.delete("/api/todo/{id}")
async def todo_delete_one(id: int):
    response = await database.delete_todo(id)
    if response:
        return response
    raise HTTPException(404, f'There is not todo item with Id {id}')
