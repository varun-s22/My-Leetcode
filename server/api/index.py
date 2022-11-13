from flask import Flask, request
from flask_cors import CORS
import subprocess as sp
import uuid
import os

app = Flask(__name__)
CORS(app)

@app.route("/code", methods=["POST"])
def format_code():
    recieved_code=request.get_json()["code"]
    filename = str(uuid.uuid4())
    with open(f'{filename}.py',"w") as external_file:
        print(recieved_code,file=external_file)
    formatted_code=sp.getoutput(f'black {filename}.py 2>> /dev/null;cat {filename}.py')
    os.remove(f'{filename}.py')
    return {"formattedCode":formatted_code}


if (__name__ == "__main__"):
    app.run(debug=True)
