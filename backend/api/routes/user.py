from flask import Blueprint, Response, request
from flask_jwt_extended import jwt_required
from passlib.hash import pbkdf2_sha512
from ..models import User



user_bluprint = Blueprint('user', __name__)



@user_bluprint.route("/users",methods=['GET'])
@jwt_required()
def get_users():
    users = User.objects().to_json()
    return Response(users, mimetype="application/json", status=200)

@user_bluprint.route("/users",methods=['DELETE'])
@jwt_required()
def delete_users():
    User.objects().delete()
    return Response(mimetype="application/json", status=200)


@user_bluprint.route("/user",methods=['PUT'])
@jwt_required()
def update_user():
    if request.method == 'PUT':
        content = request.json
        upd_user = User.objects(email=content['email']).first()
        User.objects(email=content['email']).update_one(
          firstName= content.get('firstName') or upd_user.firstName,
          lastName= content.get('lastName') or upd_user.lastName,
          email= content.get('email') or upd_user.email,
          password= pbkdf2_sha512.using(rounds=10000, salt_size=64).hash(content.get('password')) or upd_user.password,
          phone= content.get('phone') or upd_user.phone,
          address= content.get('address') or upd_user.address,
          roll= content.get('roll') or upd_user.roll,
          group= content.get('group') or upd_user.group,
          isActive=   upd_user.isActive if 'isActive' not in content else content.get('isActive'),
          created= content.get('created') or upd_user.created,
          isSuperUser= content.get('isSuperUser') or upd_user.isSuperUser,
        )
        return Response('users', mimetype="application/json", status=200)


