from datetime import datetime
from app.extensions import db


class Company(db.Model):
    __tablename__ = "companies"

    id = db.Column(db.Integer, primary_key=True)

    company_name = db.Column(db.String(150), unique=True, nullable=False)
    company_code = db.Column(db.String(50), unique=True)

    email = db.Column(db.String(120))
    phone = db.Column(db.String(20))
    website = db.Column(db.String(200))

    address = db.Column(db.Text)
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    policies = db.relationship(
        "Policy",
        back_populates="company",
        cascade="all, delete-orphan",
        lazy=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "company_name": self.company_name,
            "company_code": self.company_code,
            "email": self.email,
            "phone": self.phone,
            "website": self.website,
            "address": self.address,
            "city": self.city,
            "state": self.state,
        }