from flask import Flask

from app.config import Config
from app.extensions import db, migrate, jwt, bcrypt, cors

# Import Models
from app.models.user import User
from app.models.customer import Customer
from app.models.company import Company
from app.models.policy import Policy
from app.models.customer_policy import CustomerPolicy
from app.models.claim import Claim
from app.models.premium_payment import PremiumPayment

# Import Blueprints
from app.routes.auth import auth_bp
from app.routes.customer import customer_bp
from app.routes.company import company_bp
from app.routes.policy import policy_bp
from app.routes.customer_policy import customer_policy_bp
from app.routes.claim import claim_bp
from app.routes.premium_payment import premium_payment_bp
from app.routes.dashboard import dashboard_bp
from app.routes.reports import reports_bp
from app.models.notification import Notification
from app.routes.notification import notification_bp
from app.routes.search import search_bp
from app.routes.profile import profile_bp
from app.routes.upload import upload_bp
from app.models.hospital import Hospital
from app.routes.hospital import hospital_bp
from app.models.doctor import Doctor
from app.routes.doctor import doctor_bp
from app.models.medicine import Medicine
from app.routes.medicine import medicine_bp
from app.models.appointment import Appointment
from app.routes.appointment import appointment_bp

def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize extensions
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
    app.register_blueprint(customer_policy_bp)
    app.register_blueprint(claim_bp)
    app.register_blueprint(premium_payment_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(reports_bp, url_prefix="/api/reports")
    app.register_blueprint(notification_bp)
    app.register_blueprint(search_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(upload_bp)
    app.register_blueprint(hospital_bp)
    app.register_blueprint(doctor_bp)
    app.register_blueprint(medicine_bp)
    app.register_blueprint(appointment_bp)

    @app.route("/")
    def home():
        return {
            "status": "success",
            "message": "Insurance Management Platform Backend Running"
        }

    return app