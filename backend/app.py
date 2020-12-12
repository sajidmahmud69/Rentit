from flask import Flask, jsonify, render_template, request, url_for, redirect, session

app = Flask (__name__)
app.secret_key = "THISISSECRET"


@app.route ('/')
def home ():
    return 'Hello World'

@app.route ('/login', methods = ["GET", "POST"])
def login():
    if request.method == 'POST':
        user = request.form ['name']
        if user == "":
            return redirect (url_for ('login'))
        else:
            session ["USER"] = user     
        return redirect (url_for ("user"))
    else:
        if "USER" in session:
            return redirect (url_for ('user'))
        return render_template ("login.html")


@app.route ('/user')    
def user ():

    if "USER" in session :
        name = session ["USER"]
        return f"<h1>You are logged in {name}</h1>" 

    # else:
    #     return redirect (url_for("login"))

@app.route ('/logout')
def logout ():
    session.pop ("USER", None)
    return redirect (url_for ('login'))
    








if __name__ == '__main__':
    app.run (debug = True, host = 'localhost', port = 5000)