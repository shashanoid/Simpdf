import os
from flask import Flask, flash, request, redirect, url_for, session, make_response
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
from celery import Celery
from subprocess import Popen, PIPE
import subprocess


logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

BROKER_URL = 'amqp://guest:guest@localhost:5672//'

UPLOAD_FOLDER = '/Users/shashwatsingh/Desktop/Simpdf/backend/upload'

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
CORS(app)
celery = Celery(app.name, broker=BROKER_URL)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@celery.task(bind=True)
def convert2html(self, file):
    print(file)
    filename = file.split('/')[-1]
    process = subprocess.Popen(command, stdout = subprocess.PIPE, shell=True)
    output, err = process.communicate()
    
    html_file_location = './' + 'pdf2html' + '/' + filename + ".html"
    f = open(html_file_location)
    s = f.read()

    delete_html_file = 'rm {}{}.html'.format(PDF_TO_HTML_FOLDER, filename)
    delete_uploaded_file = 'rm {}'.format(file)

    subprocess.Popen(delete_html_file, stdout = subprocess.PIPE, shell=True)
    subprocess.Popen(delete_uploaded_file, stdout = subprocess.PIPE, shell=True)

    return s


@app.route('/name')
def index():
    return make_response("Backend working !")

@app.route('/upload', methods=['POST'])
def fileUpload():
    target=UPLOAD_FOLDER
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)

    pdf2htmltext = convert2html(destination)

    session['uploadFilePath']=destination
    return make_response(pdf2htmltext)

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="localhost",port=5000,use_reloader=True)

