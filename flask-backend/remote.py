import socket 
import time


###################################################
# @desc Connect to server 
# @param (string) server_ip
# @param (int) port
###################################################
def conn_to_rover(server_ip, server_port):
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client_socket.connect((server_ip, server_port))
        return client_socket
    
    except Exception as e:
        print("Error:", e)
        return -1


###################################################
# @desc Disconnect from server 
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
# @desc Send command to rover and waits for ACK
# @param (int) client_socket
# @param (int) flg
# @param (str) msg
###################################################
def send_to_rover(client_socket, flg, msg, timeout=1):
    try:
        # Create formatted message using $ as delim
        synch = "SIMBA" 
        flag = flg
        payload = msg
        message = f"{synch}${flag}${payload}"
        buffer = message.ljust(1024, '\0').encode()
        
        # Start timer
        start_time = time.time()
        
        # Send message to server
        client_socket.sendall(buffer)

        # Wait for acknowledgment
        while True:
            if time.time() - start_time > timeout:
                print("timeout")
                return None
            ack = client_socket.recv(1024).decode().strip()
            return ack

    except Exception as e:
        return "Error: " + str(e)


###################################################
# @desc Recv msg from rover 
# @param (int) client_socket
###################################################
def recv_from_rover(client_socket):
    try:
        data = client_socket.recv(1024)
        if not data:
            return None
        return data.decode()
    except Exception as e:
        print("Error receiving data:", e)
        return None


# debug ###
# def main():
#     client_socket = conn_to_rover('127.0.0.1', 6500)

#     send_to_rover(client_socket, 2, "hello?")

#     disconn_from_rover(client_socket)

# if __name__ == "__main__":
#     main()



