from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.hospital import Hospital

hospital_bp = Blueprint(
    "hospital",
    __name__,
    url_prefix="/api/hospitals"
)


# Create Hospital
@hospital_bp.route("/", methods=["POST"])
def create_hospital():

    data = request.get_json()

    hospital = Hospital(
        hospital_name=data.get("hospital_name"),
        hospital_type=data.get("hospital_type"),
        registration_number=data.get("registration_number"),
        email=data.get("email"),
        phone=data.get("phone"),
        address=data.get("address"),
        city=data.get("city"),
        state=data.get("state"),
        pincode=data.get("pincode"),
        is_cashless=data.get("is_cashless", True)
    )

    db.session.add(hospital)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Hospital created successfully",
        "hospital": hospital.to_dict()
    }), 201


# Get All Hospitals
@hospital_bp.route("/", methods=["GET"])
def get_hospitals():

    hospitals = Hospital.query.all()

    return jsonify({
        "status": "success",
        "count": len(hospitals),
        "hospitals": [hospital.to_dict() for hospital in hospitals]
    })


# Get Hospital by ID
@hospital_bp.route("/<int:id>", methods=["GET"])
def get_hospital(id):

    hospital = Hospital.query.get_or_404(id)

    return jsonify({
        "status": "success",
        "hospital": hospital.to_dict()
    })


# Update Hospital
@hospital_bp.route("/<int:id>", methods=["PUT"])
def update_hospital(id):

    hospital = Hospital.query.get_or_404(id)

    data = request.get_json()

    hospital.hospital_name = data.get("hospital_name", hospital.hospital_name)
    hospital.hospital_type = data.get("hospital_type", hospital.hospital_type)
    hospital.registration_number = data.get("registration_number", hospital.registration_number)
    hospital.email = data.get("email", hospital.email)
    hospital.phone = data.get("phone", hospital.phone)
    hospital.address = data.get("address", hospital.address)
    hospital.city = data.get("city", hospital.city)
    hospital.state = data.get("state", hospital.state)
    hospital.pincode = data.get("pincode", hospital.pincode)
    hospital.is_cashless = data.get("is_cashless", hospital.is_cashless)

    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Hospital updated successfully",
        "hospital": hospital.to_dict()
    })


# Delete Hospital
@hospital_bp.route("/<int:id>", methods=["DELETE"])
def delete_hospital(id):

    hospital = Hospital.query.get_or_404(id)

    db.session.delete(hospital)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Hospital deleted successfully"
    })