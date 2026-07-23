from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.doctor import Doctor

doctor_bp = Blueprint(
    "doctor",
    __name__,
    url_prefix="/api/doctors"
)


# Create Doctor
@doctor_bp.route("/", methods=["POST"])
def create_doctor():

    data = request.get_json()

    doctor = Doctor(
        hospital_id=data.get("hospital_id"),
        doctor_name=data.get("doctor_name"),
        specialization=data.get("specialization"),
        qualification=data.get("qualification"),
        experience=data.get("experience"),
        email=data.get("email"),
        phone=data.get("phone"),
        consultation_fee=data.get("consultation_fee")
    )

    db.session.add(doctor)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Doctor created successfully",
        "doctor": doctor.to_dict()
    }), 201


# Get All Doctors
@doctor_bp.route("/", methods=["GET"])
def get_doctors():

    doctors = Doctor.query.all()

    return jsonify({
        "status": "success",
        "count": len(doctors),
        "doctors": [doctor.to_dict() for doctor in doctors]
    })


# Get Doctor by ID
@doctor_bp.route("/<int:id>", methods=["GET"])
def get_doctor(id):

    doctor = Doctor.query.get_or_404(id)

    return jsonify({
        "status": "success",
        "doctor": doctor.to_dict()
    })


# Update Doctor
@doctor_bp.route("/<int:id>", methods=["PUT"])
def update_doctor(id):

    doctor = Doctor.query.get_or_404(id)

    data = request.get_json()

    doctor.doctor_name = data.get("doctor_name", doctor.doctor_name)
    doctor.specialization = data.get("specialization", doctor.specialization)
    doctor.qualification = data.get("qualification", doctor.qualification)
    doctor.experience = data.get("experience", doctor.experience)
    doctor.email = data.get("email", doctor.email)
    doctor.phone = data.get("phone", doctor.phone)
    doctor.consultation_fee = data.get("consultation_fee", doctor.consultation_fee)

    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Doctor updated successfully",
        "doctor": doctor.to_dict()
    })


# Delete Doctor
@doctor_bp.route("/<int:id>", methods=["DELETE"])
def delete_doctor(id):

    doctor = Doctor.query.get_or_404(id)

    db.session.delete(doctor)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Doctor deleted successfully"
    })


# Doctors by Hospital
@doctor_bp.route("/hospital/<int:hospital_id>", methods=["GET"])
def doctors_by_hospital(hospital_id):

    doctors = Doctor.query.filter_by(
        hospital_id=hospital_id
    ).all()

    return jsonify({
        "status": "success",
        "count": len(doctors),
        "doctors": [doctor.to_dict() for doctor in doctors]
    })