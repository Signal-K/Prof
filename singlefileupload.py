import os  # For File Manipulations like get paths, rename
from flask import Flask, flash, request, redirect, render_template
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = "secret key" 

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # maximum file size is 16mb

path = os.getcwd() # returns current working directory of a process.
UPLOAD_FOLDER = os.path.join(path, 'uploads')
if not os.path.isdir(UPLOAD_FOLDER): # if the folder defined in "UPLOAD_FOLDER" does not exist...
    os.mkdir(UPLOAD_FOLDER) # create a folder with the name defined in "UPLOAD_FOLDER"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif']) # only image files, pdfs and txt files can be uploaded according to these values

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS