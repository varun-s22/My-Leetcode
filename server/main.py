from flask import Flask, request
from flask_cors import CORS
import subprocess as sp

app = Flask(__name__)
CORS(app)

@app.route("/code", methods=["POST"])
def format_code():
    recieved_code=request.get_json()["code"]
    with open("formatCode.py","w") as external_file:
        print(recieved_code,file=external_file)
    formatted_code=sp.getoutput("black formatCode.py 2>> /dev/null;cat formatCode.py")
    return {"formattedCode":formatted_code}


if (__name__ == "__main__"):
    app.run()
