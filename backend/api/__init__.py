import os

from flask import Flask
from flask_mongoengine import MongoEngine

# from flask import Response, request


db = MongoEngine()


def create_app():
    app = Flask(__name__)
    app.config['MONGODB_SETTINGS'] = {
        'host': os.environ['MONGODB_HOST'],
        'username': os.environ['MONGODB_USERNAME'],
        'password': os.environ['MONGODB_PASSWORD'],
        'db': 'webapp'
    }
    from .routes import auth
    app.register_blueprint(auth.auth_bluprint)


    from .routes import user
    app.register_blueprint(user.user_bluprint)


    db.init_app(app)


    return app

