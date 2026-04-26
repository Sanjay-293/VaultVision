from sqlalchemy import create_engine
import sys

URL = "postgresql://postgres.vrtrwpwqmvofngqennnh:$tepOuts1degaut@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"

try:
    engine = create_engine(URL)
    with engine.connect() as conn:
        print("Successfully connected to the Cloud Database!")
        # Check tables
        from sqlalchemy import inspect
        inspector = inspect(engine)
        print(f"Tables found: {inspector.get_table_names()}")
except Exception as e:
    print(f"Connection failed: {e}")
