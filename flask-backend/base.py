from flask import Flask, request, jsonify
from flask_cors import CORS
import threading
import time

import remote

api = Flask(__name__)
CORS(api, origins="*")

# Global Variables
client_socket = None


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
        return jsonify({"message": "Successfully disconnected"}), 200
    else:
        return jsonify({"error": "Failed to disconnect"}), 400


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

    return jsonify({"message": f"Received {direction}"}), 200


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

            return jsonify({"message": "Received route data"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400  
    else:
        # GET requests
        return jsonify({"route_data": route_data })
    

# @route   POST api/motor-speed
# @desc    Sets motor speed
# @access  Public
@api.route('/api/motor-speed', methods=["POST"])
def handle_motor_speed():
    try:
        data = request.get_json()
        motor_speed = data.get('motorSpeed', '')
        remote.send_to_rover(client_socket, 3, motor_speed)
        print(f"Motor speed: {motor_speed}")
        return jsonify({"message": f"Received motor speed: {motor_speed}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400  
    
# @route   POST api/motor-dist
# @desc    Sets motor dist
# @access  Public
@api.route('/api/motor-dist', methods=["POST"])
def handle_motor_dist():
    try:
        data = request.get_json()
        motor_dist = data.get('motorDist', '')
        remote.send_to_rover(client_socket, 3, motor_dist)
        print(f"Motor dist: {motor_dist}")
        return jsonify({"message": f"Received motor distance: {motor_dist}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400  



if __name__ == '__main__':
    api.run(port=8000, debug=True)
