from flask import Blueprint, request
from datetime import datetime
from app.extensions import db
from app.models.customer import Customer
from app.models.policy import Policy
from app.models.customer_policy import CustomerPolicy

customer_policy_bp = Blueprint(
    "customer_policy",
    __name__,
    url_prefix="/api/customer-policies"
)


@customer_policy_bp.route("/", methods=["POST"])
def create_customer_policy():
    data = request.get_json()

    customer = Customer.query.get(data["customer_id"])
    policy = Policy.query.get(data["policy_id"])

    if not customer:
        return {
            "status": "error",
            "message": "Customer not found"
        }, 404

    if not policy:
        return {
            "status": "error",
            "message": "Policy not found"
        }, 404

    customer_policy = CustomerPolicy(
        customer_id=data["customer_id"],
        policy_id=data["policy_id"],
        policy_start_date=datetime.strptime(
            data["policy_start_date"],
            "%Y-%m-%d"
        ).date(),
        policy_end_date=datetime.strptime(
            data["policy_end_date"],
            "%Y-%m-%d"
        ).date(),
        nominee_name=data["nominee_name"],
        nominee_relationship=data["nominee_relationship"],
        premium_status=data.get(
            "premium_status",
            "Pending"
        )
    )

    db.session.add(customer_policy)
    db.session.commit()

    return {
        "status": "success",
        "message": "Policy assigned successfully",
        "customer_policy": customer_policy.to_dict()
    }, 201


@customer_policy_bp.route("/", methods=["GET"])
def get_customer_policies():
    policies = CustomerPolicy.query.all()

    return {
        "status": "success",
        "count": len(policies),
        "customer_policies": [
            policy.to_dict()
            for policy in policies
        ]
    }