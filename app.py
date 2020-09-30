from flask import Flask, render_template, url_for, request, jsonify, make_response
import websockets
import asyncio


app = Flask(__name__,
    static_url_path='', 
    static_folder='web/static',
    template_folder='web/templates')



@app.route('/')
def index():
    return render_template('index.html')


@app.route('/Configuratie')
def Configuratie():
    return render_template('configuratie.html')


@app.route('/exampleAJAX')
def example():
    xyCoordinates = (0, 200)
    
    res = make_response(jsonify(xyCoordinates), 200)

    return res

if __name__ == "__main__":
    app.run(debug=True)