from datetime import datetime
from app.extensions import db


class Appointment(db.Model):
    __tablename__ = "appointments"

    id = db.Column(db.Integer, primary_key=True)

    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("customers.id"),
        nullable=False
    )

    hospital_id = db.Column(
        db.Integer,
        db.ForeignKey("hospitals.id"),
        nullable=False
    )

    doctor_id = db.Column(
        db.Integer,
        db.ForeignKey("doctors.id"),
        nullable=False
    )

    appointment_date = db.Column(
        db.Date,
        nullable=False
    )

    appointment_time = db.Column(
        db.String(20),
        nullable=False
    )

    symptoms = db.Column(
        db.Text
    )

    status = db.Column(
        db.String(30),
        default="Scheduled"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": self.id,
            "customer_id": self.customer_id,
            "hospital_id": self.hospital_id,
            "doctor_id": self.doctor_id,
            "appointment_date": str(self.appointment_date),
            "appointment_time": self.appointment_time,
            "symptoms": self.symptoms,
            "status": self.status,
            "created_at": str(self.created_at)
        }