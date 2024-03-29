from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text

#  Adds Lists to the database

def seed_lists():

    groceries = List(board_id=1, name="To Do")

    toDo = List(board_id=1, name="Questions")

    work = List(board_id=1, name="Project Resources")

    done = List(board_id=1, name="Done")

    groceries2 = List(board_id=2, name="Groceries")

    toDo2 = List(board_id=2, name="To-Do")

    work2 = List(board_id=2, name="Work")

    groceries3 = List(board_id=3, name="Groceries")

    toDo3 = List(board_id=3, name="To-Do")

    work3 = List(board_id=3, name="Work")
    
    groceries4 = List(board_id=4, name="Inside Chores")

    toDo4 = List(board_id=4, name="Outside Chores")

    work4 = List(board_id=4, name="Done")
    


    db.session.add(groceries)
    db.session.add(toDo)
    db.session.add(work)
    db.session.add(done)
    db.session.add(groceries3)
    db.session.add(toDo3)
    db.session.add(work3)
    db.session.add(groceries2)
    db.session.add(toDo2)
    db.session.add(work2)
    db.session.add(groceries4)
    db.session.add(toDo4)
    db.session.add(work4)
    

    db.session.commit()


def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
