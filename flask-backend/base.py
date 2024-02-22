from flask import Flask, request, jsonify
from flask_cors import CORS
import threading
import time

import remote

api = Flask(__name__)
CORS(api, origins="*")

# Global Variables
client_socket = None


# @desc    Listening for disconnect from server
# @access  Private
def handle_server_disconnect():
    global client_socket
    while True:
        if client_socket is not None:
            try:
                data = remote.recv_from_rover(client_socket)
                if data == "DISCONNECT":
                    print("Server disconnected")
                    client_socket.close()
                    client_socket = None
                    break
            except Exception as e:
                print(f"Error handling disconnection: {e}")
        time.sleep(1)

disconnection_thread = threading.Thread(target=handle_server_disconnect)
disconnection_thread.daemon = True
disconnection_thread.start()


# @route   GET api/test
# @desc    Returns simple json body
# @access  Public
@api.route('/api/test')
def debug():
    response_body = {
        "check": "frontend connected to backend",
    }
    return response_body


# @route   POST api/connect
# @desc    Connects to rover server
# @access  Public
@api.route('/api/connect',  methods=["POST"])
def connect_to_rover():
    global client_socket
    connectionData = request.get_json()
    server_ip = connectionData.get("ip")
    server_port = int(connectionData.get("port"))

    # connect and override client_socket global variable with new value
    client_socket = remote.conn_to_rover(server_ip, server_port)

    # receive acknowledgment from the server
    if client_socket != -1:
        ack_message = remote.recv_from_rover(client_socket)
        if ack_message == "ACK":
            return jsonify({"message": f"Connected to IP: {server_ip} and Port: {server_port}"}), 200
    else:
        return jsonify({"error": "Fail"}), 400
        

# @route   POST api/disconnect
# @desc    Disconnects from rover server
# @access  Public
@api.route('/api/disconnect',  methods=["POST"])
def disconnect_from_rover():
    res = remote.disconn_from_rover(client_socket)
    if res == 0:
        return jsonify({"message": "Successfully disconnected"})
    else:
        return jsonify({"error": "Failed to disconnect"})


# @route   POST api/arrow-keys
# @desc    Handles arrow key press
# @access  Public
@api.route('/api/arrow-keys', methods=["POST"])
def handle_arrow_keys():
    data = request.get_json()
    direction = data.get('direction', '')
    
    if direction == "ArrowUp":
        remote.send_to_rover(client_socket, 2, direction)
    elif direction == "ArrowRight":
        remote.send_to_rover(client_socket, 2, direction)
    elif direction == "ArrowLeft":
        remote.send_to_rover(client_socket, 2, direction)
    elif direction == "ArrowDown":
        remote.send_to_rover(client_socket, 2, direction)

    return jsonify({"message": f"Received {direction}"})


# @route   POST api/route-plan
# @desc    Handles route plan list
# @access  Public
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
