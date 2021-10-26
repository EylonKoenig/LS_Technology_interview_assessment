# from app import app
from ..models import User
from flask import Blueprint, Response, request
from passlib.hash import pbkdf2_sha512


auth_bluprint = Blueprint('auth', __name__)


@auth_bluprint.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        content = request.json
        user = User.objects(email=content['email']).first()
        if user is not None or not user:
            return Response('Email is already registered', status=400)
        if content['password'] != content['password_confirm']:
            return Response('Passwords are not the same', status=400)
            
        hash_password = pbkdf2_sha512.using(rounds=10000, salt_size=64,).hash(
            str(content["password"]))
        User(email=content['email'], password=hash_password,
             firstName=content['firstName'], lastName=content['lastName']).save()
        return Response('Successfully created', status=201)


@auth_bluprint.route('/register', methods=['POST'])
def login():
    if request.method == 'POST':
        content = request.json
        if content['email'] is None or content['password'] is None:
            return Response('Credentials are missing', status=400)
        