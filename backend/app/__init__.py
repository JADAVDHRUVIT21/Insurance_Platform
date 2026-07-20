from flask import Flask

from app.config import Config
from app.extensions import db, migrate, jwt, bcrypt, cors

from app.models.user import User
from app.models.customer import Customer

from app.routes.auth import auth_bp
from app.routes.customer import customer_bp


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(customer_bp)

    @app.route("/")
    def home():
        return {
            "status": "success",
            "message": "Insurance Management Platform Backend Running"
        }

    return app