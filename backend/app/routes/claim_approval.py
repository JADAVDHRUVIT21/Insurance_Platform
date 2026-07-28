from flask import Blueprint, jsonify
from app.extensions import db
from app.models.claim import Claim

claim_approval_bp = Blueprint(
    "claim_approval",
    __name__,
    url_prefix="/api/claim-approval"
)


@claim_approval_bp.route("/<int:id>/approve", methods=["PUT"])
def approve_claim(id):

    claim = Claim.query.get_or_404(id)

    claim.status = "Approved"

    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Claim approved successfully",
        "claim": claim.to_dict()
    })


@claim_approval_bp.route("/<int:id>/reject", methods=["PUT"])
def reject_claim(id):

    claim = Claim.query.get_or_404(id)

    claim.status = "Rejected"

    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Claim rejected successfully",
        "claim": claim.to_dict()
    })