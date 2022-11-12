from flask import Flask, request
from flask_cors import CORS
import subprocess as sp

app = Flask(__name__)
CORS(app)

@app.route("/code", methods=["POST"])
def format_code():
    recieved_code=request.get_json()["code"].replace("\xa0 \xa0","")
    with open("formatCode.py","w") as external_file:
        print(recieved_code,file=external_file)
    formatted_code=sp.getoutput("autopep8 formatCode.py")
    return {"formattedCode":formatted_code}


if (__name__ == "__main__"):
    app.run(debug=True)
