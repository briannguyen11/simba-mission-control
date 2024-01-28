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


@api.route('/api/arrow-keys', methods=["POST"])
def handle_arrow_keys():
    data = request.get_json()
    direction = data.get('direction', '')
    print(f"Arrow key pressed: {direction}")

    # You can perform additional logic here based on the arrow key press

    return jsonify({"message": f"Received arrow key: {direction}"})

@api.route('/api/route-plan', methods=["GET", "POST"])
def handle_route_plan():
    route_data = []
    if request.method == "POST":
        try:
            route_data = request.get_json()
            print(f"List of routes: {route_data}")

            # Perform additional logic based on the received route data

            return jsonify({"message": "Received route data"})
        except Exception as e:
            return jsonify({"error": str(e)}), 400  
    else:
        # GET requests
        return jsonify({"route_data": route_data })


if __name__ == '__main__':
    api.run(port=8000, debug=True)
