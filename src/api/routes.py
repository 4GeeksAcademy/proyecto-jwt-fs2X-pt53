"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# registro
@api.route('/registro', methods=['POST'])
def registro():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")


    if not email or not password:
        return jsonify({"error": "Email y password son requeridos"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email ya está registrado"}), 400

    hashed_password = generate_password_hash(password)
    user = User(email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"mensaje": "Registro exitoso, inicie sesión"}), 201

# login
@api.route("/login", methods=["POST"])
def login():
    
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"status": "fail", "message": "Email y password son requeridos"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"status": "fail", "message": "Credenciales incorrectas"}), 401

    access_token = create_access_token(identity=user.id, additional_claims={"email": user.email})
    return jsonify({"status": "success", "message": "Login exitoso", "access_token": access_token, "user": user.serialize()}), 200

# protected

@api.route("/inicio", methods=["GET"])
@jwt_required()
def inicio():
    current_user = get_jwt_identity()
    return jsonify({"mensaje": "Ruta protegida accesible", "usuario": current_user})
