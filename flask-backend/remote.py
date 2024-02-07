import socket

# Change according to rover IP and PORRT
server_ip = '127.0.0.1'  
server_port = 6999    

###################################################
# Connect to server using global IP and PORT
###################################################
def conn_to_rover():
    # Create a socket object
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client_socket.connect((server_ip, server_port))
    except Exception as e:
        print("Error:", e)

    return client_socket

###################################################
# Disconnect to server using global IP and PORT
# @param (int) client_socket
###################################################
def disconn_from_rover(client_socket):
    client_socket.close()

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
        payload_len = len(msg)
        message = f"{synch}${flag}${payload_len}${payload}"
        print(message) #debug
        
        # Send message to server
        client_socket.sendall(message.encode())


    except Exception as e:
        print("Error:", e)


### debug ###
def main():
    client_socket = conn_to_rover()

    send_cmd_to_rover(client_socket, 2, "hello?")

    disconn_from_rover(client_socket)

if __name__ == "__main__":
    main()



