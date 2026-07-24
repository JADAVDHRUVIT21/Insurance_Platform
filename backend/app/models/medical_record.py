from datetime import datetime
from app.extensions import db


class MedicalRecord(db.Model):
    __tablename__ = "medical_records"

    id = db.Column(db.Integer, primary_key=True)

    appointment_id = db.Column(
        db.Integer,
        db.ForeignKey("appointments.id"),
        nullable=False
    )

    diagnosis = db.Column(db.Text, nullable=False)

    treatment = db.Column(db.Text)

    doctor_notes = db.Column(db.Text)

    prescription = db.Column(db.Text)

    visit_date = db.Column(
        db.Date,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": self.id,
            "appointment_id": self.appointment_id,
            "diagnosis": self.diagnosis,
            "treatment": self.treatment,
            "doctor_notes": self.doctor_notes,
            "prescription": self.prescription,
            "visit_date": str(self.visit_date),
            "created_at": str(self.created_at)
        }