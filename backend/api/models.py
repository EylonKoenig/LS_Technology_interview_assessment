from . import  db
from enum import Enum
import datetime

class Group(Enum):
    User = 'user'
    Admin = 'admin'

class User(db.Document):
    firstName = db.StringField(max_length=60)
    lastName = db.StringField(max_length=60)
    email = db.EmailField(required=True)
    password = db.StringField(max_length=60, required=True)
    phone = db.StringField(max_length=60)
    address = db.StringField(max_length=60)
    roll = db.StringField(max_length=60)
    group = db.EnumField(Group, default=Group.User)
    isActive = db.BooleanField(default=True)
    created = db.DateTimeField(default=datetime.datetime.now)
    isSuperUser = db.BooleanField(default=False)
