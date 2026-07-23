from datetime import datetime
from app.extensions import db


class Doctor(db.Model):
    __tablename__ = "doctors"

    id = db.Column(db.Integer, primary_key=True)

    hospital_id = db.Column(
        db.Integer,
        db.ForeignKey("hospitals.id"),
        nullable=False
    )

    doctor_name = db.Column(db.String(150), nullable=False)

    specialization = db.Column(db.String(150))

    qualification = db.Column(db.String(150))

    experience = db.Column(db.Integer)

    email = db.Column(db.String(120))

    phone = db.Column(db.String(20))

    consultation_fee = db.Column(db.Float)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    hospital = db.relationship(
        "Hospital",
        backref="doctors"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "hospital_id": self.hospital_id,
            "doctor_name": self.doctor_name,
            "specialization": self.specialization,
            "qualification": self.qualification,
            "experience": self.experience,
            "email": self.email,
            "phone": self.phone,
            "consultation_fee": self.consultation_fee,
            "created_at": str(self.created_at)
        }