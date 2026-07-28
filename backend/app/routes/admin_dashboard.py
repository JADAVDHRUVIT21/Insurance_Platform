from flask import Blueprint, jsonify

from app.models.customer import Customer
from app.models.company import Company
from app.models.policy import Policy
from app.models.hospital import Hospital
from app.models.doctor import Doctor
from app.models.medicine import Medicine
from app.models.appointment import Appointment
from app.models.claim import Claim
from app.models.payment import Payment

admin_dashboard_bp = Blueprint(
    "admin_dashboard",
    __name__,
    url_prefix="/api/admin-dashboard"
)


@admin_dashboard_bp.route("/", methods=["GET"])
def dashboard():

    total_customers = Customer.query.count()
    total_companies = Company.query.count()
    total_policies = Policy.query.count()
    total_hospitals = Hospital.query.count()
    total_doctors = Doctor.query.count()
    total_medicines = Medicine.query.count()
    total_appointments = Appointment.query.count()
    total_claims = Claim.query.count()
    total_payments = Payment.query.count()

    return jsonify({
        "status": "success",
        "dashboard": {
            "customers": total_customers,
            "companies": total_companies,
            "policies": total_policies,
            "hospitals": total_hospitals,
            "doctors": total_doctors,
            "medicines": total_medicines,
            "appointments": total_appointments,
            "claims": total_claims,
            "payments": total_payments
        }
    })