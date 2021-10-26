# from app import app
from ..models import User
from flask import Blueprint, Response, request, jsonify

from passlib.hash import pbkdf2_sha512
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import jwt_required



auth_bluprint = Blueprint('auth', __name__)


@auth_bluprint.route('/register', methods=['POST'])
@jwt_required()
def register():
    if request.method == 'POST':
        content = request.json
        user = User.objects(email=content['email']).first()
        if user is not None:
            return Response('Email is already registered', status=400)
        if content['password'] != content['password_confirm']:
            return Response('Passwords are not the same', status=400)
            
        hash_password = pbkdf2_sha512.using(rounds=10000, salt_size=64,).hash(
            str(content["password"]))
        User(   email=content['email'],
                password=hash_password,
                firstName=content['firstName'],
                lastName=content['lastName']).save()
        return Response('Successfully created', status=201)


@auth_bluprint.route('/login', methods=['POST'])
@jwt_required()
def login():
    if request.method == 'POST':
        email = request.json.get("email")
        password = request.json.get("password")
        
        if email is None or password is None:
            return Response('Credentials are missing', status=401)
        user = User.objects(email=email,isActive=True).first()
        if user and pbkdf2_sha512.verify(password, user.password):
            access_token = create_access_token(identity=email)
            refresh_token = create_refresh_token(identity=email)
            return jsonify(access_token=access_token, refresh_token=refresh_token)
        return Response('Successfully created', status=401)
        

@auth_bluprint.route("/test", methods=["GET"])
@jwt_required()
def protected():
    return jsonify(foo="bar")