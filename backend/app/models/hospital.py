from datetime import datetime
from app.extensions import db


class Hospital(db.Model):
    __tablename__ = "hospitals"

    id = db.Column(db.Integer, primary_key=True)

    hospital_name = db.Column(db.String(200), nullable=False)

    hospital_type = db.Column(db.String(100))

    registration_number = db.Column(db.String(100), unique=True)

    email = db.Column(db.String(120))

    phone = db.Column(db.String(20))

    address = db.Column(db.Text)

    city = db.Column(db.String(100))

    state = db.Column(db.String(100))

    pincode = db.Column(db.String(10))

    is_cashless = db.Column(db.Boolean, default=True)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": self.id,
            "hospital_name": self.hospital_name,
            "hospital_type": self.hospital_type,
            "registration_number": self.registration_number,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "pincode": self.pincode,
            "is_cashless": self.is_cashless,
            "created_at": str(self.created_at)
        }