from flask import Blueprint
from sqlalchemy import func

from app.models.customer import Customer
from app.models.policy import Policy
from app.models.customer_policy import CustomerPolicy
from app.models.claim import Claim
from app.models.premium_payment import PremiumPayment

dashboard_bp = Blueprint(
    "dashboard",
    __name__,
    url_prefix="/api/dashboard"
)


@dashboard_bp.route("/", methods=["GET"])
def dashboard():

    total_customers = Customer.query.count()

    total_policies = Policy.query.count()

    total_customer_policies = CustomerPolicy.query.count()

    total_claims = Claim.query.count()

    approved_claims = Claim.query.filter_by(
        status="Approved"
    ).count()

    pending_claims = Claim.query.filter_by(
        status="Pending"
    ).count()

    rejected_claims = Claim.query.filter_by(
        status="Rejected"
    ).count()

    total_premium = (
        PremiumPayment.query.with_entities(
            func.sum(PremiumPayment.amount)
        ).scalar()
        or 0
    )

    paid_premium = PremiumPayment.query.filter_by(
        payment_status="Paid"
    ).count()

    pending_premium = PremiumPayment.query.filter_by(
        payment_status="Pending"
    ).count()

    return {
        "status": "success",

        "dashboard": {

            "total_customers": total_customers,

            "total_policies": total_policies,

            "total_customer_policies": total_customer_policies,

            "total_claims": total_claims,

            "approved_claims": approved_claims,

            "pending_claims": pending_claims,

            "rejected_claims": rejected_claims,

            "total_premium_collected": float(total_premium),

            "paid_premium": paid_premium,

            "pending_premium": pending_premium
        }
    }