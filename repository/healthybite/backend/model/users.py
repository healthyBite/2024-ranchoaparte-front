from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Float
from config.db import engine, meta_data

users = Table("users", meta_data,
              Column("id", Integer, primary_key=True, autoincrement=True),
              Column("name", String(50), nullable=False),
              Column("surname", String(100), nullable=False),
              Column("email", String(100), nullable=False, unique=True),
              Column("password", String(255), nullable=False),
              Column("birthdate", String(10), nullable=False),
              Column("weight", Float, nullable=False),
              Column("height", Float, nullable=False),
              )

meta_data.create_all(engine)
