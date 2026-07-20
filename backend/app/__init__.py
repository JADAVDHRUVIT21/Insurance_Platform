from flask import Flask

from app.config import Config
from app.extensions import db, migrate, jwt, bcrypt, cors

from app.models.user import User
from app.models.customer import Customer
from app.models.company import Company

from app.routes.auth import auth_bp
from app.routes.customer import customer_bp
from app.routes.company import company_bp
from app.routes.policy import policy_bp

def create_app():
    app = Flask(__name__)

    # Load Configuration
    app.config.from_object(Config)

    # Initialize Extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(customer_bp)
    app.register_blueprint(company_bp)
    app.register_blueprint(policy_bp)

    # Home Route
    @app.route("/")
    def home():
        return {
            "status": "success",
            "message": "Insurance Management Platform Backend Running"
        }

    return app