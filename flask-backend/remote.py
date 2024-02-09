import socket 

###################################################
# Connect to server 
###################################################
def conn_to_rover(server_ip, server_port):
    # Create a socket object
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client_socket.connect((server_ip, server_port))
    except Exception as e:
        print("Error:", e)
    return client_socket


###################################################
# Disconnect from server 
# @param (int) client_socket
###################################################
def disconn_from_rover(client_socket):
    try:
        client_socket.close()
        return 0
    except Exception as e:
        print("Error occurred while closing socket:", e)
        return -1

###################################################
# Send command to rover using connected socket
# @param (int) client_socket
# @param (int) flg
# @param (str) msg
###################################################
def send_cmd_to_rover(client_socket, flg, msg):
    try:
        # Create formatted message using $ as delim
        synch = "SIMBA" 
        flag = flg
        payload = msg
        payload_len = len(msg) if payload is not None else 0
        message = f"{synch}${flag}${payload_len}${payload}"
        print(message) #debug
        
        # Send message to server
        client_socket.sendall(message.encode())

    except Exception as e:
        print("Error:", e)


## debug ###
# def main():
#     client_socket = conn_to_rover('127.0.0.1', 6999)

#     send_cmd_to_rover(client_socket, 2, "hello?")

#     disconn_from_rover(client_socket)

# if __name__ == "__main__":
#     main()



