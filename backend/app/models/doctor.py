from datetime import datetime
from app.extensions import db

class Doctor(db.Model):
    __tablename__ = 'doctors'
    
    id = db.Column(db.Integer, primary_key=True)
    doctor_code = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    gender = db.Column(db.String(10))
    qualification = db.Column(db.String(100))
    specialization = db.Column(db.String(100), nullable=False)
    experience = db.Column(db.Integer, default=0)
    consultation_fee = db.Column(db.Numeric(10, 2), default=0)
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'), nullable=False)
    address = db.Column(db.String(200))
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    hospital = db.relationship('Hospital', backref='doctors')
    
    def __repr__(self):
        return f'<Doctor {self.name}>'