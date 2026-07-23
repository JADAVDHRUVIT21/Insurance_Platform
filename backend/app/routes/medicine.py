from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.medicine import Medicine
from datetime import datetime

medicine_bp = Blueprint(
    "medicine",
    __name__,
    url_prefix="/api/medicines"
)


@medicine_bp.route("/", methods=["POST"])
def create_medicine():

    data = request.get_json()

    medicine = Medicine(
        medicine_name=data["medicine_name"],
        manufacturer=data.get("manufacturer"),
        category=data.get("category"),
        dosage=data.get("dosage"),
        price=data["price"],
        stock_quantity=data.get("stock_quantity", 0),
        expiry_date=datetime.strptime(
            data["expiry_date"], "%Y-%m-%d"
        ).date() if data.get("expiry_date") else None,
        description=data.get("description")
    )

    db.session.add(medicine)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Medicine created successfully",
        "medicine": medicine.to_dict()
    }), 201


@medicine_bp.route("/", methods=["GET"])
def get_medicines():

    medicines = Medicine.query.all()

    return jsonify({
        "status": "success",
        "count": len(medicines),
        "medicines": [m.to_dict() for m in medicines]
    })