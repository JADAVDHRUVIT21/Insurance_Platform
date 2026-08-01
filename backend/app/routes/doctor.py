from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.doctor import Doctor
import traceback

doctor_bp = Blueprint(
    "doctor",
    __name__,
    url_prefix="/api/doctors"
)


# ======================================================
# Create Doctor
# ======================================================

@doctor_bp.route("/", methods=["POST"])
def create_doctor():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "status": "error",
                "message": "No data received"
            }), 400

        doctor = Doctor(
            doctor_code=data.get("doctor_code"),
            name=data.get("doctor_name"),
            email=data.get("email"),
            phone=data.get("phone"),
            gender=data.get("gender"),
            qualification=data.get("qualification"),
            specialization=data.get("specialization"),
            experience=data.get("experience"),
            consultation_fee=data.get("consultation_fee"),
            hospital_id=data.get("hospital_id"),
            address=data.get("address"),
            city=data.get("city"),
            state=data.get("state")
        )

        db.session.add(doctor)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Doctor created successfully",
            "doctor": doctor.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        traceback.print_exc()

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# ======================================================
# Get All Doctors
# ======================================================

@doctor_bp.route("/", methods=["GET"])
def get_doctors():
    try:
        doctors = Doctor.query.all()

        doctor_list = []

        for doctor in doctors:
            doctor_list.append(doctor.to_dict())

        return jsonify({
            "status": "success",
            "count": len(doctor_list),
            "doctors": doctor_list
        }), 200

    except Exception as e:
        traceback.print_exc()

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# ======================================================
# Get Doctor
# ======================================================

@doctor_bp.route("/<int:id>", methods=["GET"])
def get_doctor(id):
    try:
        doctor = Doctor.query.get_or_404(id)

        return jsonify({
            "status": "success",
            "doctor": doctor.to_dict()
        }), 200

    except Exception as e:
        traceback.print_exc()

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# ======================================================
# Update Doctor
# ======================================================

@doctor_bp.route("/<int:id>", methods=["PUT"])
def update_doctor(id):
    try:
        doctor = Doctor.query.get_or_404(id)
        data = request.get_json()

        doctor.doctor_code = data.get("doctor_code", doctor.doctor_code)
        doctor.name = data.get("doctor_name", doctor.name)
        doctor.email = data.get("email", doctor.email)
        doctor.phone = data.get("phone", doctor.phone)
        doctor.gender = data.get("gender", doctor.gender)
        doctor.qualification = data.get("qualification", doctor.qualification)
        doctor.specialization = data.get("specialization", doctor.specialization)
        doctor.experience = data.get("experience", doctor.experience)
        doctor.consultation_fee = data.get("consultation_fee", doctor.consultation_fee)
        doctor.hospital_id = data.get("hospital_id", doctor.hospital_id)
        doctor.address = data.get("address", doctor.address)
        doctor.city = data.get("city", doctor.city)
        doctor.state = data.get("state", doctor.state)

        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Doctor updated successfully",
            "doctor": doctor.to_dict()
        }), 200

    except Exception as e:
        db.session.rollback()
        traceback.print_exc()

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# ======================================================
# Delete Doctor
# ======================================================

@doctor_bp.route("/<int:id>", methods=["DELETE"])
def delete_doctor(id):
    try:
        doctor = Doctor.query.get_or_404(id)

        db.session.delete(doctor)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Doctor deleted successfully"
        }), 200

    except Exception as e:
        db.session.rollback()
        traceback.print_exc()

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# ======================================================
# Doctors By Hospital
# ======================================================

@doctor_bp.route("/hospital/<int:hospital_id>", methods=["GET"])
def doctors_by_hospital(hospital_id):
    try:
        doctors = Doctor.query.filter_by(
            hospital_id=hospital_id
        ).all()

        return jsonify({
            "status": "success",
            "count": len(doctors),
            "doctors": [
                doctor.to_dict()
                for doctor in doctors
            ]
        }), 200

    except Exception as e:
        traceback.print_exc()

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500