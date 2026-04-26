from sqlalchemy import create_engine, text

URL = "postgresql://postgres.vrtrwpwqmvofngqennnh:$tepOuts1degaut@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"

sql_commands = [
    # 1. Enable RLS on Users table
    "ALTER TABLE users ENABLE ROW LEVEL SECURITY;",
    # 2. Enable RLS on Detections table
    "ALTER TABLE detections ENABLE ROW LEVEL SECURITY;",
    # 3. Add a basic policy so the admin can still see everything (just in case)
    "DROP POLICY IF EXISTS \"Admin access\" ON users;",
    "CREATE POLICY \"Admin access\" ON users FOR ALL USING (true);",
    "DROP POLICY IF EXISTS \"Admin access\" ON detections;",
    "CREATE POLICY \"Admin access\" ON detections FOR ALL USING (true);"
]

try:
    engine = create_engine(URL)
    with engine.connect() as conn:
        for cmd in sql_commands:
            conn.execute(text(cmd))
            conn.commit()
        print("Security Lockdown Complete: RLS is now ENABLED on all tables.")
except Exception as e:
    print(f"Failed to enable RLS: {e}")
