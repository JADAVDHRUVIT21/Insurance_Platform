import os

from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename

upload_bp = Blueprint(
    "upload",
    __name__,
    url_prefix="/api/upload"
)

UPLOAD_FOLDER = "app/uploads"

ALLOWED_EXTENSIONS = {
    "png",
    "jpg",
    "jpeg",
    "pdf",
    "doc",
    "docx"
}


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


@upload_bp.route("/", methods=["POST"])
def upload_file():

    if "file" not in request.files:
        return jsonify({
            "status": "error",
            "message": "No file selected"
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "status": "error",
            "message": "Empty filename"
        }), 400

    if file and allowed_file(file.filename):

        os.makedirs(UPLOAD_FOLDER, exist_ok=True)

        filename = secure_filename(file.filename)

        filepath = os.path.join(
            UPLOAD_FOLDER,
            filename
        )

        file.save(filepath)

        return jsonify({
            "status": "success",
            "message": "File uploaded successfully",
            "filename": filename,
            "path": filepath
        })

    return jsonify({
        "status": "error",
        "message": "Invalid file type"
    }), 400