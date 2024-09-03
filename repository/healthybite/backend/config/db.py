from sqlalchemy import create_engine, MetaData
from sqlalchemy.exc import OperationalError

from sqlalchemy.orm import sessionmaker

engine = create_engine(
    "mysql+pymysql://root:jose@localhost:3306/healthybite")

try:
    conn = engine.connect()
    print("Conexión exitosa")
except OperationalError as e:
    print(f"Error al conectar a la base de datos: {e}")
finally:
    conn.close()


meta_data = MetaData()
