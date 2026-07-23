from flask import Blueprint, request
from datetime import datetime

from app.extensions import db
from app.models.claim import Claim
from app.models.customer_policy import CustomerPolicy

claim_bp = Blueprint(
    "claim",
    __name__,
    url_prefix="/api/claims"
)


@claim_bp.route("/", methods=["POST"])
def create_claim():

    data = request.get_json()

    customer_policy = CustomerPolicy.query.get(
        data["customer_policy_id"]
    )

    if not customer_policy:
        return {
            "status": "error",
            "message": "Customer Policy not found"
        }, 404

    claim = Claim(
        customer_policy_id=data["customer_policy_id"],
        claim_number=data["claim_number"],
        claim_amount=data["claim_amount"],
        claim_reason=data["claim_reason"],
        claim_date=datetime.strptime(
            data["claim_date"],
            "%Y-%m-%d"
        ).date(),
        status="Pending"
    )

    db.session.add(claim)
    db.session.commit()

    return {
        "status": "success",
        "message": "Claim created successfully",
        "claim": claim.to_dict()
    }, 201


@claim_bp.route("/", methods=["GET"])
def get_claims():

    claims = Claim.query.all()

    return {
        "status": "success",
        "count": len(claims),
        "claims": [
            claim.to_dict()
            for claim in claims
        ]
    }


@claim_bp.route("/<int:claim_id>", methods=["GET"])
def get_claim(claim_id):

    claim = Claim.query.get(claim_id)

    if not claim:
        return {
            "status": "error",
            "message": "Claim not found"
        }, 404

    return {
        "status": "success",
        "claim": claim.to_dict()
    }


@claim_bp.route("/<int:claim_id>", methods=["PUT"])
def update_claim(claim_id):

    claim = Claim.query.get(claim_id)

    if not claim:
        return {
            "status": "error",
            "message": "Claim not found"
        }, 404

    data = request.get_json()

    claim.claim_amount = data.get(
        "claim_amount",
        claim.claim_amount
    )

    claim.claim_reason = data.get(
        "claim_reason",
        claim.claim_reason
    )

    claim.status = data.get(
        "status",
        claim.status
    )

    db.session.commit()

    return {
        "status": "success",
        "message": "Claim updated successfully",
        "claim": claim.to_dict()
    }


@claim_bp.route("/<int:claim_id>", methods=["DELETE"])
def delete_claim(claim_id):

    claim = Claim.query.get(claim_id)

    if not claim:
        return {
            "status": "error",
            "message": "Claim not found"
        }, 404

    db.session.delete(claim)
    db.session.commit()

    return {
        "status": "success",
        "message": "Claim deleted successfully"
    }


@claim_bp.route("/<int:claim_id>/approve", methods=["PUT"])
def approve_claim(claim_id):

    claim = Claim.query.get(claim_id)

    if not claim:
        return {
            "status": "error",
            "message": "Claim not found"
        }, 404

    claim.status = "Approved"

    db.session.commit()

    return {
        "status": "success",
        "message": "Claim approved successfully",
        "claim": claim.to_dict()
    }


@claim_bp.route("/<int:claim_id>/reject", methods=["PUT"])
def reject_claim(claim_id):

    claim = Claim.query.get(claim_id)

    if not claim:
        return {
            "status": "error",
            "message": "Claim not found"
        }, 404

    claim.status = "Rejected"

    db.session.commit()

    return {
        "status": "success",
        "message": "Claim rejected successfully",
        "claim": claim.to_dict()
    }