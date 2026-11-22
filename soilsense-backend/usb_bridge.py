import serial
import requests
import json
import time

# --- SETTINGS ---
SERIAL_PORT = 'COM6' # <-- Change this to your receiver's exact COM port
BAUD_RATE = 115200
FLASK_URL = 'http://127.0.0.1:5000/predict'

try:
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    print(f"🔌 Listening to LoRa Receiver on {SERIAL_PORT}...")
except Exception as e:
    print(f"❌ Error opening serial port: {e}")
    exit()

while True:
    if ser.in_waiting > 0:
        line = ser.readline().decode('utf-8').strip()
        try:
            data = json.loads(line)
            print(f"📡 Caught LoRa Data: {data}")
            
            response = requests.post(FLASK_URL, json=data)
            print(f"✅ Forwarded to Flask. Status: {response.status_code}")
            
        except json.JSONDecodeError:
            pass
            
    time.sleep(0.1)