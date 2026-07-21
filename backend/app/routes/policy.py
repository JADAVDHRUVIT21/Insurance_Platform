from flask import Blueprint, request
from app.extensions import db
from app.models.policy import Policy
from app.models.company import Company

policy_bp = Blueprint(
    "policy",
    __name__,
    url_prefix="/api/policies"
)


@policy_bp.route("/", methods=["POST"])
def create_policy():
    data = request.get_json()

    company = Company.query.get(data["company_id"])

    if not company:
        return {
            "status": "error",
            "message": "Company not found"
        }, 404

    existing = Policy.query.filter_by(
        policy_number=data["policy_number"]
    ).first()

    if existing:
        return {
            "status": "error",
            "message": "Policy number already exists"
        }, 409

    policy = Policy(
        policy_number=data["policy_number"],
        policy_name=data["policy_name"],
        company_id=data["company_id"],
        policy_type=data["policy_type"],
        sum_assured=data["sum_assured"],
        premium_amount=data["premium_amount"],
        premium_frequency=data["premium_frequency"],
        policy_term=data["policy_term"],
        maturity_age=data["maturity_age"],
        min_entry_age=data["min_entry_age"],
        max_entry_age=data["max_entry_age"],
        status=data.get("status", "Active")
    )

    db.session.add(policy)
    db.session.commit()

    return {
        "status": "success",
        "message": "Policy created successfully",
        "policy": policy.to_dict()
    }, 201


@policy_bp.route("/", methods=["GET"])
def get_policies():
    policies = Policy.query.all()

    return {
        "status": "success",
        "count": len(policies),
        "policies": [policy.to_dict() for policy in policies]
    }   