from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

# فولدر التخزين
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# -------- Upload ECG -------- #
@app.route("/upload_data", methods=["POST"])
def upload_data():
    if "file" not in request.files:
        return jsonify({"error": "No file"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    return jsonify({"message": "ECG file uploaded successfully!", "filename": filename})


# -------- Read ECG File -------- #
@app.route("/read_ecg_file", methods=["GET"])
def read_ecg_file():
    filename = request.args.get("file")
    if not filename:
        return jsonify({"error": "No filename provided"}), 400

    filepath = os.path.join(UPLOAD_FOLDER, filename)
    if not os.path.exists(filepath):
        return jsonify({"error": "File not found"}), 404

    values = []
    with open(filepath, "r") as f:
        for line in f:
            try:
                # ناخد أول عمود (في حالة CSV)
                val = float(line.strip().split(",")[0])
                values.append(val)
            except:
                continue

    return jsonify({"values": values})


if __name__ == "__main__":
    app.run(debug=True)
