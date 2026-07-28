from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.payment import Payment

payment_bp = Blueprint(
    "payment",
    __name__,
    url_prefix="/api/payments"
)


@payment_bp.route("/", methods=["POST"])
def create_payment():

    data = request.get_json()

    payment = Payment(
        appointment_id=data["appointment_id"],
        amount=data["amount"],
        payment_method=data["payment_method"],
        payment_status=data.get("payment_status", "Pending"),
        transaction_id=data.get("transaction_id")
    )

    db.session.add(payment)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Payment created successfully",
        "payment": payment.to_dict()
    })


@payment_bp.route("/", methods=["GET"])
def get_payments():

    payments = Payment.query.all()

    return jsonify({
        "status": "success",
        "count": len(payments),
        "payments": [payment.to_dict() for payment in payments]
    })


@payment_bp.route("/<int:id>", methods=["GET"])
def get_payment(id):

    payment = Payment.query.get_or_404(id)

    return jsonify({
        "status": "success",
        "payment": payment.to_dict()
    })


@payment_bp.route("/<int:id>", methods=["DELETE"])
def delete_payment(id):

    payment = Payment.query.get_or_404(id)

    db.session.delete(payment)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Payment deleted successfully"
    })