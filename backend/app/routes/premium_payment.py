from flask import Blueprint, request
from datetime import datetime

from app.extensions import db
from app.models.premium_payment import PremiumPayment
from app.models.customer_policy import CustomerPolicy

premium_payment_bp = Blueprint(
    "premium_payment",
    __name__,
    url_prefix="/api/premium-payments"
)


@premium_payment_bp.route("/", methods=["POST"])
def create_payment():

    data = request.get_json()

    customer_policy = CustomerPolicy.query.get(
        data["customer_policy_id"]
    )

    if not customer_policy:
        return {
            "status": "error",
            "message": "Customer Policy not found"
        }, 404

    payment = PremiumPayment(
        customer_policy_id=data["customer_policy_id"],
        payment_date=datetime.strptime(
            data["payment_date"],
            "%Y-%m-%d"
        ).date(),
        amount=data["amount"],
        payment_mode=data["payment_mode"],
        transaction_id=data["transaction_id"],
        status=data.get(
            "status",
            "Paid"
        )
    )

    db.session.add(payment)
    db.session.commit()

    return {
        "status": "success",
        "message": "Premium payment added successfully",
        "payment": payment.to_dict()
    }, 201


@premium_payment_bp.route("/", methods=["GET"])
def get_payments():

    payments = PremiumPayment.query.all()

    return {
        "status": "success",
        "count": len(payments),
        "payments": [
            payment.to_dict()
            for payment in payments
        ]
    }


@premium_payment_bp.route("/<int:payment_id>", methods=["GET"])
def get_payment(payment_id):

    payment = PremiumPayment.query.get(payment_id)

    if not payment:
        return {
            "status": "error",
            "message": "Payment not found"
        }, 404

    return {
        "status": "success",
        "payment": payment.to_dict()
    }


@premium_payment_bp.route("/<int:payment_id>", methods=["PUT"])
def update_payment(payment_id):

    payment = PremiumPayment.query.get(payment_id)

    if not payment:
        return {
            "status": "error",
            "message": "Payment not found"
        }, 404

    data = request.get_json()

    payment.amount = data.get(
        "amount",
        payment.amount
    )

    payment.payment_mode = data.get(
        "payment_mode",
        payment.payment_mode
    )

    payment.status = data.get(
        "status",
        payment.status
    )

    db.session.commit()

    return {
        "status": "success",
        "message": "Payment updated successfully",
        "payment": payment.to_dict()
    }


@premium_payment_bp.route("/<int:payment_id>", methods=["DELETE"])
def delete_payment(payment_id):

    payment = PremiumPayment.query.get(payment_id)

    if not payment:
        return {
            "status": "error",
            "message": "Payment not found"
        }, 404

    db.session.delete(payment)
    db.session.commit()

    return {
        "status": "success",
        "message": "Payment deleted successfully"
    }