from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Float
from config.db import engine, meta_data

food = Table("food", meta_data,
             Column("id", Integer, primary_key=True, autoincrement=True),
             Column("name", String(50), nullable=False),
             Column("measure", String(100), nullable=False),
             Column("calories", String(100), nullable=False, unique=True),
             Column("amount", Float, nullable=False),
             )

meta_data.create_all(engine)
