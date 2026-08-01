from flask import Flask

from app.config import Config
from app.extensions import (
    db,
    migrate,
    jwt,
    bcrypt,
    cors,
    swagger
)

# Import all models
import app.models

# Import Blueprints
from app.routes.auth import auth_bp
from app.routes.company import company_bp
from app.routes.customer import customer_bp
from app.routes.policy import policy_bp
from app.routes.customer_policy import customer_policy_bp
from app.routes.claim import claim_bp
from app.routes.premium_payment import premium_payment_bp
from app.routes.dashboard import dashboard_bp
from app.routes.reports import reports_bp
from app.routes.notification import notification_bp
from app.routes.search import search_bp
from app.routes.profile import profile_bp
from app.routes.upload import upload_bp
from app.routes.hospital import hospital_bp
from app.routes.doctor import doctor_bp
from app.routes.medicine import medicine_bp
from app.routes.appointment import appointment_bp
from app.routes.medical_record import medical_record_bp
from app.routes.payment import payment_bp
from app.routes.document import document_bp
from app.routes.claim_approval import claim_approval_bp
from app.routes.admin_dashboard import admin_dashboard_bp

from app.middleware.error_handler import register_error_handlers


def create_app():
    app = Flask(__name__)

    # -----------------------------
    # Configuration
    # -----------------------------
    app.config.from_object(Config)

    app.url_map.strict_slashes = False

    # -----------------------------
    # Initialize Extensions
    # -----------------------------
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    cors.init_app(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "http://localhost:5173",
                    "http://127.0.0.1:5173"
                ]
            }
        },
        supports_credentials=True
    )

    swagger.init_app(app)

    # -----------------------------
    # JWT Error Handlers
    # -----------------------------
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        print("JWT INVALID TOKEN:", error)
        return {"message": error}, 401

    @jwt.unauthorized_loader
    def unauthorized_callback(error):
        print("JWT UNAUTHORIZED:", error)
        return {"message": error}, 401

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        print("JWT TOKEN EXPIRED")
        return {"message": "Token has expired"}, 401

    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        print("JWT TOKEN REVOKED")
        return {"message": "Token has been revoked"}, 401

    # -----------------------------
    # Register Blueprints
    # -----------------------------
    app.register_blueprint(auth_bp)
    app.register_blueprint(company_bp)
    app.register_blueprint(customer_bp)
    app.register_blueprint(policy_bp)
    app.register_blueprint(customer_policy_bp)
    app.register_blueprint(claim_bp)
    app.register_blueprint(premium_payment_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(reports_bp)
    app.register_blueprint(notification_bp)
    app.register_blueprint(search_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(upload_bp)
    app.register_blueprint(hospital_bp)
    app.register_blueprint(doctor_bp)
    app.register_blueprint(medicine_bp)
    app.register_blueprint(appointment_bp)
    app.register_blueprint(medical_record_bp)
    app.register_blueprint(payment_bp)
    app.register_blueprint(document_bp)
    app.register_blueprint(claim_approval_bp)
    app.register_blueprint(admin_dashboard_bp)

    # -----------------------------
    # Error Handlers
    # -----------------------------
    register_error_handlers(app)

    @app.route("/")
    def home():
        return {
            "status": "success",
            "message": "Insurance Management Platform Backend Running"
        }

    return app