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


@policy_bp.route("/<int:policy_id>", methods=["GET"])
def get_policy(policy_id):
    policy = Policy.query.get(policy_id)

    if not policy:
        return {
            "status": "error",
            "message": "Policy not found"
        }, 404

    return {
        "status": "success",
        "policy": policy.to_dict()
    }


@policy_bp.route("/<int:policy_id>", methods=["PUT"])
def update_policy(policy_id):
    policy = Policy.query.get(policy_id)

    if not policy:
        return {
            "status": "error",
            "message": "Policy not found"
        }, 404

    data = request.get_json()

    policy.policy_name = data.get("policy_name", policy.policy_name)
    policy.policy_type = data.get("policy_type", policy.policy_type)
    policy.sum_assured = data.get("sum_assured", policy.sum_assured)
    policy.premium_amount = data.get("premium_amount", policy.premium_amount)
    policy.premium_frequency = data.get("premium_frequency", policy.premium_frequency)
    policy.policy_term = data.get("policy_term", policy.policy_term)
    policy.maturity_age = data.get("maturity_age", policy.maturity_age)
    policy.min_entry_age = data.get("min_entry_age", policy.min_entry_age)
    policy.max_entry_age = data.get("max_entry_age", policy.max_entry_age)
    policy.status = data.get("status", policy.status)

    db.session.commit()

    return {
        "status": "success",
        "message": "Policy updated successfully",
        "policy": policy.to_dict()
    }


@policy_bp.route("/<int:policy_id>", methods=["DELETE"])
def delete_policy(policy_id):
    policy = Policy.query.get(policy_id)

    if not policy:
        return {
            "status": "error",
            "message": "Policy not found"
        }, 404

    db.session.delete(policy)
    db.session.commit()

    return {
        "status": "success",
        "message": "Policy deleted successfully"
    }