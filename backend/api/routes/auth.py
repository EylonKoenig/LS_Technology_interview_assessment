# from app import app
from ..models import User
from flask import Blueprint, Response, request, jsonify

from passlib.hash import pbkdf2_sha512
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity


auth_bluprint = Blueprint('auth', __name__)


# @cross_origin(supports_credentials=True)
@auth_bluprint.route('/register', methods=['POST'])
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




@auth_bluprint.route('/login',  methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
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
            return jsonify(user=user, access_token=access_token, refresh_token=refresh_token)
        return Response('Unauthorized', status=401)
        
@auth_bluprint.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    user = User.objects(email=identity).only('email','firstName','lastName','group','created').first()
    access_token = create_access_token(identity=identity)
    return jsonify(user = user, access_token=access_token)


@auth_bluprint.route('/user', methods=['PUT'])
def update_user():
    if request.method == 'PUT':
        content = request.json
        upd_user = User.objects(email=content['email']).first()
        User.objects(email=content['email']).update_one(
          firstName= content.get('firstName') or upd_user.firstName,
          lastName= content.get('lastName') or upd_user.lastName,
          email= content.get('email') or upd_user.email,
          password= upd_user.password if "password" not in content else pbkdf2_sha512.using(rounds=10000, salt_size=64).hash(content.get('password')),
          group= content.get('group') or upd_user.group,
          isActive=   upd_user.isActive if 'isActive' not in content else content.get('isActive'),
        )
        return Response('Successfully Updated', mimetype="application/json", status=200)
