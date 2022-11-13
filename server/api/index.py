from flask import Flask, request
from flask_cors import CORS
from black import format_str, FileMode
import subprocess as sp
import uuid
import os

app = Flask(__name__)
CORS(app)

@app.route("/code", methods=["POST"])
def format_code():
    recieved_code=request.get_json()["code"]
    formatted_code = format_str(recieved_code, mode=FileMode())
    return {"formattedCode":formatted_code}