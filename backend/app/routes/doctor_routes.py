from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Doctor, Hospital
from sqlalchemy.exc import IntegrityError
from datetime import datetime

doctor_bp = Blueprint('doctor', __name__, url_prefix='/api/doctors')

# Get all doctors
@doctor_bp.route('/', methods=['GET'])
@jwt_required()
def get_doctors():
    try:
        doctors = Doctor.query.all()
        result = []
        for doctor in doctors:
            # Get hospital name
            hospital = Hospital.query.get(doctor.hospital_id)
            result.append({
                'id': doctor.id,
                'doctor_code': doctor.doctor_code,
                'name': doctor.name,
                'email': doctor.email,
                'phone': doctor.phone,
                'gender': doctor.gender,
                'qualification': doctor.qualification,
                'specialization': doctor.specialization,
                'experience': doctor.experience,
                'consultation_fee': float(doctor.consultation_fee) if doctor.consultation_fee else 0,
                'hospital_id': doctor.hospital_id,
                'hospital_name': hospital.name if hospital else 'N/A',
                'address': doctor.address,
                'city': doctor.city,
                'state': doctor.state,
                'created_at': doctor.created_at.isoformat() if doctor.created_at else None,
                'updated_at': doctor.updated_at.isoformat() if doctor.updated_at else None
            })
        return jsonify({'doctors': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get single doctor by ID
@doctor_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_doctor(id):
    try:
        doctor = Doctor.query.get(id)
        if not doctor:
            return jsonify({'error': 'Doctor not found'}), 404
        
        hospital = Hospital.query.get(doctor.hospital_id)
        return jsonify({
            'id': doctor.id,
            'doctor_code': doctor.doctor_code,
            'name': doctor.name,
            'email': doctor.email,
            'phone': doctor.phone,
            'gender': doctor.gender,
            'qualification': doctor.qualification,
            'specialization': doctor.specialization,
            'experience': doctor.experience,
            'consultation_fee': float(doctor.consultation_fee) if doctor.consultation_fee else 0,
            'hospital_id': doctor.hospital_id,
            'hospital_name': hospital.name if hospital else 'N/A',
            'address': doctor.address,
            'city': doctor.city,
            'state': doctor.state,
            'created_at': doctor.created_at.isoformat() if doctor.created_at else None,
            'updated_at': doctor.updated_at.isoformat() if doctor.updated_at else None
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Create new doctor
@doctor_bp.route('/', methods=['POST'])
@jwt_required()
def create_doctor():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'phone', 'specialization', 'hospital_id']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if hospital exists
        hospital = Hospital.query.get(data['hospital_id'])
        if not hospital:
            return jsonify({'error': 'Hospital not found'}), 404
        
        # Generate doctor code if not provided
        doctor_code = data.get('doctor_code')
        if not doctor_code:
            # Generate code: DOC-YYYY-XXXX
            year = datetime.now().year
            count = Doctor.query.count() + 1
            doctor_code = f"DOC-{year}-{count:04d}"
        
        # Check if doctor code already exists
        existing = Doctor.query.filter_by(doctor_code=doctor_code).first()
        if existing:
            return jsonify({'error': 'Doctor code already exists'}), 400
        
        # Create new doctor
        doctor = Doctor(
            doctor_code=doctor_code,
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            gender=data.get('gender'),
            qualification=data.get('qualification'),
            specialization=data['specialization'],
            experience=data.get('experience', 0),
            consultation_fee=data.get('consultation_fee', 0),
            hospital_id=data['hospital_id'],
            address=data.get('address'),
            city=data.get('city'),
            state=data.get('state')
        )
        
        db.session.add(doctor)
        db.session.commit()
        
        return jsonify({
            'message': 'Doctor created successfully',
            'doctor': {
                'id': doctor.id,
                'doctor_code': doctor.doctor_code,
                'name': doctor.name,
                'email': doctor.email,
                'phone': doctor.phone,
                'gender': doctor.gender,
                'qualification': doctor.qualification,
                'specialization': doctor.specialization,
                'experience': doctor.experience,
                'consultation_fee': float(doctor.consultation_fee) if doctor.consultation_fee else 0,
                'hospital_id': doctor.hospital_id,
                'hospital_name': hospital.name,
                'address': doctor.address,
                'city': doctor.city,
                'state': doctor.state
            }
        }), 201
        
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Doctor with this email or code already exists'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Update doctor
@doctor_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_doctor(id):
    try:
        doctor = Doctor.query.get(id)
        if not doctor:
            return jsonify({'error': 'Doctor not found'}), 404
        
        data = request.get_json()
        
        # Update fields
        if 'name' in data:
            doctor.name = data['name']
        if 'email' in data:
            doctor.email = data['email']
        if 'phone' in data:
            doctor.phone = data['phone']
        if 'gender' in data:
            doctor.gender = data['gender']
        if 'qualification' in data:
            doctor.qualification = data['qualification']
        if 'specialization' in data:
            doctor.specialization = data['specialization']
        if 'experience' in data:
            doctor.experience = data['experience']
        if 'consultation_fee' in data:
            doctor.consultation_fee = data['consultation_fee']
        if 'hospital_id' in data:
            hospital = Hospital.query.get(data['hospital_id'])
            if not hospital:
                return jsonify({'error': 'Hospital not found'}), 404
            doctor.hospital_id = data['hospital_id']
        if 'address' in data:
            doctor.address = data['address']
        if 'city' in data:
            doctor.city = data['city']
        if 'state' in data:
            doctor.state = data['state']
        
        doctor.updated_at = datetime.utcnow()
        db.session.commit()
        
        # Get updated hospital name
        hospital = Hospital.query.get(doctor.hospital_id)
        
        return jsonify({
            'message': 'Doctor updated successfully',
            'doctor': {
                'id': doctor.id,
                'doctor_code': doctor.doctor_code,
                'name': doctor.name,
                'email': doctor.email,
                'phone': doctor.phone,
                'gender': doctor.gender,
                'qualification': doctor.qualification,
                'specialization': doctor.specialization,
                'experience': doctor.experience,
                'consultation_fee': float(doctor.consultation_fee) if doctor.consultation_fee else 0,
                'hospital_id': doctor.hospital_id,
                'hospital_name': hospital.name if hospital else 'N/A',
                'address': doctor.address,
                'city': doctor.city,
                'state': doctor.state
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Delete doctor
@doctor_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_doctor(id):
    try:
        doctor = Doctor.query.get(id)
        if not doctor:
            return jsonify({'error': 'Doctor not found'}), 404
        
        db.session.delete(doctor)
        db.session.commit()
        
        return jsonify({'message': 'Doctor deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500