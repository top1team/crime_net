# backend/manage.py
import sys
from db import create_db_and_tables, drop_db_and_tables
from seed_crimes import seed

USAGE = """
manage.py commands:
  create_tables   -> create all tables (run after DB is reachable)
  drop_tables     -> drop all tables (dangerous!)
  seed            -> seed sample crime points (safe: skips if table not empty)

Examples:
  python manage.py create_tables
  python manage.py seed
"""

def main():
    if len(sys.argv) < 2:
        print(USAGE)
        return
    cmd = sys.argv[1].lower()
    if cmd == "create_tables":
        create_db_and_tables()
        print("Created tables.")
    elif cmd == "drop_tables":
        confirm = input("Type YES to drop all tables: ")
        if confirm == "YES":
            drop_db_and_tables()
            print("Dropped tables.")
        else:
            print("Aborted.")
    elif cmd == "seed":
        seed()
    else:
        print("Unknown command.")
        print(USAGE)

if __name__ == "__main__":
    main()
