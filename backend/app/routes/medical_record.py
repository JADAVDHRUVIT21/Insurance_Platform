from datetime import datetime
from flask import Blueprint, request, jsonify

from app.extensions import db
from app.models.medical_record import MedicalRecord

medical_record_bp = Blueprint(
    "medical_record",
    __name__,
    url_prefix="/api/medical-records"
)


@medical_record_bp.route("/", methods=["POST"])
def create_medical_record():

    print("Medical Record API Called")

    data = request.get_json()

    print(data)

    record = MedicalRecord(
        appointment_id=data["appointment_id"],
        diagnosis=data["diagnosis"],
        treatment=data.get("treatment"),
        doctor_notes=data.get("doctor_notes"),
        prescription=data.get("prescription"),
        visit_date=datetime.strptime(
            data["visit_date"],
            "%Y-%m-%d"
        ).date()
    )

    db.session.add(record)
    db.session.commit()

    print("Created Record ID:", record.id)

    return jsonify({
        "status": "success",
        "message": "Medical record created successfully",
        "medical_record": record.to_dict()
    })


@medical_record_bp.route("/", methods=["GET"])
def get_medical_records():

    records = MedicalRecord.query.all()

    return jsonify({
        "status": "success",
        "count": len(records),
        "medical_records": [
            r.to_dict() for r in records
        ]
    })


@medical_record_bp.route("/<int:id>", methods=["GET"])
def get_medical_record(id):

    record = MedicalRecord.query.get_or_404(id)

    return jsonify({
        "status": "success",
        "medical_record": record.to_dict()
    })


@medical_record_bp.route("/<int:id>", methods=["DELETE"])
def delete_medical_record(id):

    record = MedicalRecord.query.get_or_404(id)

    db.session.delete(record)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Medical record deleted successfully"
    })