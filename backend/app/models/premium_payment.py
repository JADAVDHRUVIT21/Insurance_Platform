from app import db


class PremiumPayment(db.Model):
    __tablename__ = "premium_payments"

    id = db.Column(db.Integer, primary_key=True)

    customer_policy_id = db.Column(
        db.Integer,
        db.ForeignKey("customer_policies.id"),
        nullable=False
    )

    amount = db.Column(
        db.Float,
        nullable=False
    )

    payment_date = db.Column(
        db.Date,
        nullable=False
    )

    payment_status = db.Column(
        db.String(20),
        nullable=False,
        default="Pending"
    )

    payment_method = db.Column(
        db.String(50),
        nullable=True
    )

    remarks = db.Column(
        db.String(255),
        nullable=True
    )

    customer_policy = db.relationship(
        "CustomerPolicy",
        backref="premium_payments"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "customer_policy_id": self.customer_policy_id,
            "amount": self.amount,
            "payment_date": str(self.payment_date),
            "payment_status": self.payment_status,
            "payment_method": self.payment_method,
            "remarks": self.remarks,
        }