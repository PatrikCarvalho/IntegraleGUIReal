from flask import Flask, render_template


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



if __name__ == "__main__":
    app.run(debug=True)