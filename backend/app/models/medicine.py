from datetime import datetime
from app.extensions import db


class Medicine(db.Model):
    __tablename__ = "medicines"

    id = db.Column(db.Integer, primary_key=True)

    medicine_name = db.Column(db.String(150), nullable=False)

    manufacturer = db.Column(db.String(150))

    category = db.Column(db.String(100))

    dosage = db.Column(db.String(50))

    price = db.Column(db.Float, nullable=False)

    stock_quantity = db.Column(db.Integer, default=0)

    expiry_date = db.Column(db.Date)

    description = db.Column(db.Text)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "medicine_name": self.medicine_name,
            "manufacturer": self.manufacturer,
            "category": self.category,
            "dosage": self.dosage,
            "price": self.price,
            "stock_quantity": self.stock_quantity,
            "expiry_date": str(self.expiry_date) if self.expiry_date else None,
            "description": self.description,
            "created_at": str(self.created_at)
        }