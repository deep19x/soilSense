# Setup Backend - Terminal 1
cd soilsense-backend

## Create virtual environment
python -m venv venv

## Activate virtual environment
### On Windows:
venv\Scripts\activate
### On Mac/Linux:
source venv/bin/activate

## Install required Python packages
pip install -r requirements.txt

## run
python app.py


# 
#
#

# Setup USB serial bridge - Terminal 2

cd soilsense-backend

venv\Scripts\activate

python usb_bridge.py


#
#
#

# Setup frontend - Terminal 3

cd soilsense-frontend

npm install

npm start
