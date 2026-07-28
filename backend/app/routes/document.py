from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.document import Document

document_bp = Blueprint(
    "document",
    __name__,
    url_prefix="/api/documents"
)


@document_bp.route("/", methods=["POST"])
def upload_document():

    data = request.get_json()

    document = Document(
        customer_id=data["customer_id"],
        document_name=data["document_name"],
        document_type=data["document_type"],
        file_path=data["file_path"]
    )

    db.session.add(document)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Document uploaded successfully",
        "document": document.to_dict()
    })


@document_bp.route("/", methods=["GET"])
def get_documents():

    documents = Document.query.all()

    return jsonify({
        "status": "success",
        "count": len(documents),
        "documents": [d.to_dict() for d in documents]
    })


@document_bp.route("/<int:id>", methods=["GET"])
def get_document(id):

    document = Document.query.get_or_404(id)

    return jsonify({
        "status": "success",
        "document": document.to_dict()
    })


@document_bp.route("/<int:id>", methods=["DELETE"])
def delete_document(id):

    document = Document.query.get_or_404(id)

    db.session.delete(document)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Document deleted successfully"
    })