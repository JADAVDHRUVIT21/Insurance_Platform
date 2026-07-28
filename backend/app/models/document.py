from datetime import datetime
from app.extensions import db


class Document(db.Model):
    __tablename__ = "documents"

    id = db.Column(db.Integer, primary_key=True)

    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("customers.id"),
        nullable=False
    )

    document_name = db.Column(
        db.String(200),
        nullable=False
    )

    document_type = db.Column(
        db.String(100),
        nullable=False
    )

    file_path = db.Column(
        db.String(500),
        nullable=False
    )

    uploaded_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": self.id,
            "customer_id": self.customer_id,
            "document_name": self.document_name,
            "document_type": self.document_type,
            "file_path": self.file_path,
            "uploaded_at": str(self.uploaded_at)
        }