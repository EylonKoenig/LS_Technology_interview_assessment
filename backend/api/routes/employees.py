from flask import Blueprint, Response, request
from flask_jwt_extended import jwt_required
from passlib.hash import pbkdf2_sha512
from ..models import User, Employee
from flask_jwt_extended import get_jwt_identity



employees_bluprint = Blueprint('user', __name__)



@employees_bluprint.route("/employees",methods=['GET'])
@jwt_required()
def get_employees():
    identity = get_jwt_identity()
    user = User(email=identity)
    Employees = Employee.objects(user=user.id).only('email','firstName','lastName','created', 'roll', 'imageUrl', 'address', 'phone', 'imageUrl').to_json()
    return Response(Employees, mimetype="application/json", status=200)

# @employees_bluprint.route("/employees",methods=['DELETE'])
# @jwt_required()
# def delete_users():
#     User.objects().delete()
#     return Response(mimetype="application/json", status=200)


@employees_bluprint.route("/employee",methods=['PUT', 'POST'])
@jwt_required()
def update_user():
    if request.method == 'PUT':
        content = request.json
        upd_user = User.objects(email=content['email']).first()
        Employee.objects(email=content['email']).update_one(
          firstName= content.get('firstName') or upd_user.firstName,
          lastName= content.get('lastName') or upd_user.lastName,
          email= content.get('email') or upd_user.email,
          phone= content.get('phone') or upd_user.phone,
          address= content.get('address') or upd_user.address,
          roll= content.get('roll') or upd_user.roll,
        )
        return Response('users', mimetype="application/json", status=200)
    if request.method == 'POST':
        content = request.json
        Employee(
          firstName= content.get('firstName'),
          lastName= content.get('lastName') ,
          email= content.get('email') ,
          phone= content.get('phone') ,
          address= content.get('address') ,
          roll= content.get('roll') ,
        ).save()
        return Response('Successfully created!', mimetype="application/json", status=200)
