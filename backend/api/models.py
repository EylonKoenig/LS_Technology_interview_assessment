from . import  db
from enum import Enum
import datetime

class Group(Enum):
    User = 'user'
    Admin = 'admin'


    
class User(db.Document):
    email = db.EmailField(required=True)
    firstName = db.StringField(max_length=60)
    lastName = db.StringField(max_length=60)
    password = db.StringField(max_length=512, required=True)
    isActive = db.BooleanField(default=True)
    group = db.EnumField(Group, default=Group.Admin)
    created = db.DateTimeField(default=datetime.datetime.now)
    isSuperUser = db.BooleanField(default=False)

class Employee(db.Document):
    firstName = db.StringField(max_length=60)
    lastName = db.StringField(max_length=60)
    phone = db.StringField(max_length=60)
    address = db.StringField(max_length=60)
    roll = db.StringField(max_length=60)
    created = db.DateTimeField(default=datetime.datetime.now)
    imageUrl = db.URLField()
    isActive = db.BooleanField(default=True)
    user = db.ReferenceField(User)
