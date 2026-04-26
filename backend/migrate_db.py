from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()

URL = os.getenv("DATABASE_URL")
if not URL:
    URL = "postgresql://postgres.vrtrwpwqmvofngqennnh:$tepOuts1degaut@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"

print(f"Connecting to {URL.split('@')[-1]}...")
engine = create_engine(URL)

migrations = [
    "ALTER TABLE detections ADD COLUMN IF NOT EXISTS evidence_report JSON;",
    "ALTER TABLE detections ADD COLUMN IF NOT EXISTS ai_analysis TEXT;",
    "ALTER TABLE detections ADD COLUMN IF NOT EXISTS status VARCHAR DEFAULT 'PENDING';"
]

try:
    with engine.connect() as conn:
        for m in migrations:
            print(f"Running: {m}")
            conn.execute(text(m))
            conn.commit()
        print("Migration successful!")
except Exception as e:
    print(f"Migration failed: {e}")
