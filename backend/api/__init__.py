import os

from flask import Flask
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager
from datetime import timedelta


# from flask import Response, request


db = MongoEngine()


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})    
    
    app.config['MONGODB_SETTINGS'] = {
        'host': os.environ['MONGODB_HOST'],
        'username': os.environ['MONGODB_USERNAME'],
        'password': os.environ['MONGODB_PASSWORD'],
        'db': 'webapp'
    }
    app.config["JWT_SECRET_KEY"] = os.environ["JWT_SECRET_KEY"]
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=15)
    
    from .routes import auth
    app.register_blueprint(auth.auth_bluprint)

    from .routes import employees
    app.register_blueprint(employees.employees_bluprint)


    db.init_app(app)

    JWTManager(app)



    return app

