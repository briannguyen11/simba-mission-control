from flask import Flask, request, jsonify
from flask_cors import CORS
api = Flask(__name__)
CORS(api, origins="*")



@api.route('/api')
def debug():
    response_body = {
        "check": "frontend connected to backend",
    }
    return response_body


@api.route('/api/arrow-keys', methods=['POST'])
def handle_arrow_keys():
    data = request.get_json()
    direction = data.get('direction', '')
    print(f"Arrow key pressed: {direction}")

    # You can perform additional logic here based on the arrow key press

    return jsonify({"message": f"Received arrow key: {direction}"})




if __name__ == '__main__':
    api.run(port=8000, debug=True)
