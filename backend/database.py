import os
from model import Todo

# MongoDB Driver
import motor.motor_asyncio

from dotenv import load_dotenv

load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
database = client['todo_db']
collection = database['todos']


async def fetch_all_todo():
    todos = []
    cursor = collection.find({'deleted': False})
    async for document in cursor:
        todos.append(Todo(**document))
    return todos


async def fetch_one_todo(id):
    document = await collection.find_one({'id': id})
    return document


async def create_todo(todo: Todo):
    n = await collection.count_documents({})
    todo.id = n+1

    await collection.insert_one(todo.dict())

    document = await fetch_one_todo(todo.id)
    return document


async def update_todo(id: int, todo: Todo):
    await collection.update_one({'id': id}, {"$set": {
        "title": todo.title, "description": todo.description
    }})
    document = await fetch_one_todo(id)
    return document


async def undelete_todo():
    await collection.update_many({}, {"$set": {
        "deleted": False
    }})
    return True


async def delete_todo(id):
    await collection.update_one({'id': id}, {"$set": {
        "deleted": True
    }})
    return True
