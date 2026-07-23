from datetime import datetime

from flask import Blueprint, request, jsonify

from app.extensions import db
from app.models.appointment import Appointment

appointment_bp = Blueprint(
    "appointment",
    __name__,
    url_prefix="/api/appointments"
)


@appointment_bp.route("/", methods=["POST"])
def create_appointment():

    data = request.get_json()

    appointment = Appointment(
        customer_id=data["customer_id"],
        hospital_id=data["hospital_id"],
        doctor_id=data["doctor_id"],
        appointment_date=datetime.strptime(
            data["appointment_date"],
            "%Y-%m-%d"
        ).date(),
        appointment_time=data["appointment_time"],
        symptoms=data.get("symptoms")
    )

    db.session.add(appointment)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Appointment booked successfully",
        "appointment": appointment.to_dict()
    })


@appointment_bp.route("/", methods=["GET"])
def get_appointments():

    appointments = Appointment.query.all()

    return jsonify({
        "status": "success",
        "count": len(appointments),
        "appointments": [
            a.to_dict() for a in appointments
        ]
    })


@appointment_bp.route("/<int:id>", methods=["PUT"])
def update_status(id):

    appointment = Appointment.query.get_or_404(id)

    data = request.get_json()

    appointment.status = data.get(
        "status",
        appointment.status
    )

    db.session.commit()

    return jsonify({
        "status": "success",
        "appointment": appointment.to_dict()
    })


@appointment_bp.route("/<int:id>", methods=["DELETE"])
def delete_appointment(id):

    appointment = Appointment.query.get_or_404(id)

    db.session.delete(appointment)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Appointment deleted successfully"
    })