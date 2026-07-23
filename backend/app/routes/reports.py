from flask import Blueprint, jsonify
from app.models.customer import Customer
from app.models.policy import Policy
from app.models.claim import Claim
from app.models.premium_payment import PremiumPayment

reports_bp = Blueprint("reports", __name__)


@reports_bp.route("/", methods=["GET"])
def reports():

    customers = Customer.query.count()
    policies = Policy.query.count()
    claims = Claim.query.count()
    premiums = PremiumPayment.query.count()

    return jsonify({
        "status": "success",
        "reports": {
            "customers": customers,
            "policies": policies,
            "claims": claims,
            "premium_payments": premiums
        }
    })