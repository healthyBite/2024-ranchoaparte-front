from fastapi import APIRouter
from schema.user_schema import UserSchema
from config.db import conn
from model.users import users
from werkzeug.security import generate_password_hash, check_password_hash

user = APIRouter()


@user.get("/")
def root():
    return ({"message": "Hi , iam fast ampi con router"})

# para crear nuevos usuarios


@user.post("/api/user")
def create_user(data_user: UserSchema):
    new_user = data_user.dict()
    new_user["password"] = generate_password_hash(
        data_user.password, "pbkdf2:sha256:30", 30)
    conn.execute(users.insert().values(new_user))
    return "Success"


@user.put("/api/user")
def update_user():
    pass
