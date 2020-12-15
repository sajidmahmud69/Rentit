from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import re
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, \
     jwt_refresh_token_required, create_refresh_token, get_raw_jwt

app = Flask (__name__)
app.secret_key = "THISISSECRET"
# Configure DB
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:123456@localhost/rentit'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False
app.config["JWT_SECRET_KEY"]="nevergonnagiveyouup"
app.config["JWT_BLACKLIST_ENABLED"] = True
app.config["JWT_BLACKLIST_TOKEN_CHECKS"] =["access","refresh"]

CORS(app)
jwt=JWTManager(app)

db= SQLAlchemy(app)

class Users(db.Model):
    user_id     =db.Column(db.Integer,    primary_key=True,autoincrement=True)
    first_name  =db.Column(db.String(80), nullable=False)
    last_name   =db.Column(db.String(80), nullable=False)
    username    =db.Column(db.String(80), unique=True,nullable=False)
    email       =db.Column(db.String(80), unique=True,nullable=False)
    password    =db.Column(db.String(80), nullable=False)

    def __init__(self,first_name,last_name,username,email,password):
        self.first_name   =first_name
        self.last_name    =last_name
        self.username     =username
        self.email        =email
        self.password     =password

#methods for Users

def getUsers():
    users = Users.query.all()
    return [{"user_id":i.user_id,"first_name":i.first_name,"last_name":i.last_name,"username":i.username,"email":i.email,"password":i.password} for i in users]

def getUser(user_id):
    users = Users.query.all()
    user = list(filter(lambda x: x.user_id ==user_id,users))[0]
    return {"user_id":user.user_id,"first_name":user.first_name,"last_name":user.last_name,"username":user.username,"email":user.email,"password":user.password}

def addUser(first_name,last_name,username,email,password):
    if (first_name and last_name and username and email and password):
        try:
            user = Users(first_name,last_name,username,email,password)
            db.session.add(user)
            db.session.commit()
            return True
        except Exception as e:
            print (e)
            return False
    else:
        return False

def removeUser(uid):

    try:
        user = Users.query.get(uid)
        db.session.delete(user)
        db.session.commit()
        return True
    except Exception as e:
        print (e)
        return False


class Listing(db.Model):
    list_id     = db.Column(db.Integer, primary_key=True,autoincrement=True)
    user_id     = db.Column(db.Integer, db.ForeignKey("users.user_id"),nullable=False)
    title       = db.Column(db.String(80),nullable=False)
    description = db.Column(db.String(256))
    image       = db.Column(db.String(2048))
    address     = db.Column(db.String(100),nullable=False)
    price       = db.Column(db.Integer,nullable=False)    


    def __init__(self,user_id,title,description,image,address,price):
        self.user_id    =user_id
        self.title      =title
        self.description=description
        self.image      =image
        self.address    =address
        self.price      =price

#Methods for listing

def getListings():
    listings = Listing.query.all()
    return [{"list_id":i.list_id,"user_id":getUser(i.user_id),"title": i.title,"description":i.description,"image":i.image,"address":i.address,"price":i.price}for i in listings]


def getUniqueListing (lid):
    listings = Listing.query.all()
    listing = list(filter(lambda x: x.list_id ==lid,listings))[0]
    return {"list_id": listing.list_id, "user_id":listing.user_id, "title": listing.title, "description": listing.description, "image": listing.image, "address": listing.address, "price": listing.price}



def getUserListings(user_id):
    listings = Listing.query.all()
    return [{"list_id":item.list_id,"user_id":item.user_id,"title": item.title,"description":item.description,"image":item.image,"address":item.address,"price":item.price}for item in filter(lambda i: i.user_id==user_id,listings)]


def addListing(user_id,title,description,image,address,price):
        user_id=int(user_id)
        image=str(image)
        try:
            users= getUsers()
            user=list(filter(lambda i: i["user_id"]== user_id,users))[0]
            listing=Listing(user["user_id"],title,description,image,address,price)
            db.session.add(listing)
            db.session.commit()
            # print(users)
            return True
        except Exception as e:
            print (e)
            return "Bhitorer Error"

def delListing(list_id):
    try:
        listing = Listing.query.get(list_id)
        db.session.delete(listing)
        db.session.commit()
    except Exception as e:
        print(e)
        return False

#Token table
class InvalidToken(db.Model):
    __tablename__="invalid_tokens"
    token_id = db.Column(db.Integer,primary_key=True)
    jti = db.Column(db.String(255))

    def save(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_invalid(cls,jti):
        q= cls.query.filter_by(jti=jti).first()
        return bool(q)

@jwt.token_in_blacklist_loader
def check_if_blacklisted_token(decrypted):
    jti = decrypted["jti"]
    return InvalidToken.is_invalid(jti)



class Comment (db.Model):
    comment_id = db.Column (db.Integer, primary_key = True, autoincrement = True)
    list_id = db.Column (db.Integer, db.ForeignKey("listing.list_id"), nullable = False)
    user_id = db.Column (db.Integer, db.ForeignKey("users.user_id"), nullable = False)
    comment = db.Column (db.String (2048), nullable = False)

    def __init__ (self, list_id, user_id, comment):
        self.list_id = list_id
        self.user_id = user_id
        self.comment = comment



def getComments():
    comments = Comment.query.all ()
    return [{"comment_id": i.comment_id, "list_id": getUniqueListing (i.list_id), "user_id": getUser (i.user_id), "comment": i.comment} for i in comments]


def addComment (list_id, user_id, comment):
    list_id = int (list_id)
    user_id = int (user_id)
    
    try:
        listings = getListings ()
        listing = list(filter(lambda i: i["list_id"]== list_id,listings))[0]
        users= getUsers()
        user=list(filter(lambda i: i["user_id"]== user_id,users))[0] 

        comment = Comment (listing["list_id"], user ["user_id"], comment)
        db.session.add (comment)
        db.session.commit ()

        return True
    except Exception as e:
        # print (e)
        # return {"Error": "Invalid Submission"}

        listings = getListings ()
        listing = list(filter(lambda i: i["list_id"]== list_id,listings))[0]
        users= getUsers()
        user=list(filter(lambda i: i["user_id"]== user_id,users))[0] 

        return ({"listing": listing, "user": user})









#Routes for the backend

@app.route('/')
def index():
    return "Hello, world!"

@app.route("/api/register",methods=["POST"])
def register():
    try:
        first_name  = request.json["first_name"]
        last_name   = request.json["last_name"]
        username    = request.json["username"]
        email       = request.json["email"]
        email       = email.lower()
        password    = request.json["password"]
        #Check to see if user already exists
        users = getUsers()

        if (len(list(filter(lambda x: x["email"]==email,users )))==1):
            return jsonify({"error": "Use different email"})
        #Email Validation cehck
        if not re.match(r"[\w\._]{5,}@\w{3,}.\w{2,4}", email):
            return jsonify ({"error":"Invalid Email"})

        if (len(list(filter(lambda x: x["username"]==username,users )))==1):
            return jsonify({"error": "Use different username"})

        addUser(first_name,last_name,username,email,password)
        return jsonify({"success": True})
    except:
        return jsonify({"error": "Invalid form"})

@app.route("/api/login", methods=["POST"])
def login():
    try:
        username = request.json["username"]
        password = request.json["password"]
        if (username and password):
            user = list(filter(lambda x: x["username"]==username and x["password"]==password,getUsers() ))
            
            #Check if user exists
            if len(user)==1:
                token = create_access_token(identity=user[0]["user_id"])
                refresh_token = create_refresh_token(identity=user[0]["user_id"])
                                
                return jsonify({"token": token,"refreshToken": refresh_token})

            else: return jsonify({"error":"Incorrect Username or Password"})       
        else:
            return jsonify({"error":"Imposter"})
    except Exception as e:
        print(e)
        return jsonify({"error":"Invalid Form"})


@app.route ("/api/users", methods = ["GET"])
def test_user_function ():
    return jsonify (getUsers())

@app.route("/api/checkiftokenexpire",methods=["POST"])
@jwt_required
def check_if_token_expire():
    print(get_jwt_identity())
    return jsonify({"success": True})

@app.route("/api/refreshtoken", methods=["POST"])
@jwt_refresh_token_required
def refresh():
    identity = get_jwt_identity()
    token = create_access_token(identity=identity)
    return jsonify({"token": token})


@app.route("/api/logout/access", methods=["POST"])
@jwt_required
def access_logout():
    jti = get_raw_jwt()["jti"]
    try:
        invalid_token = InvalidToken(jti=jti)
        invalid_token.save()
        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return {"error": e}


@app.route("/api/logout/refresh", methods=["POST"])
@jwt_required
def refresh_logout():
    jti = get_raw_jwt()["jti"]
    try:
        invalid_token = InvalidToken(jti=jti)
        invalid_token.save()
        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return {"error": e}



@app.route("/api/listings")
def get_listings():
    return jsonify(getListings())

@app.route("/api/addlisting", methods=["POST"])
@jwt_required
def add_lsiting():
    try:
        title = request.json["title"]
        description = request.json["description"]
        image = request.json["image"]
        address = request.json["address"]
        price = request.json["price"]
        # user_id = request.json["user_id"]
        user_id = get_jwt_identity()
        addListing(user_id,title,description,image,address,price)
            
        return jsonify ({"success": "true"})
    except Exception as e:
        print (e)
        return jsonify({"error":"Invalid Form"})


@app.route("/api/deletelisting/<list_id>",methods=["DELETE"])
@jwt_required
def delete_listing(list_id):
    try:
        delListing(list_id)
        return jsonify({"Success":"true"})
    except:
        return jsonify({"error": "Invalid form"})


@app.route ("/api/getcurrentuser")
@jwt_required
def get_current_user():
    user_id = get_jwt_identity()
    return jsonify (getUser (user_id))




@app.route ("/api/changepassword", methods =["POST"])
@jwt_required
def change_password ():
    try:
        user = Users.query.get (get_jwt_identity())
        if not (request.json["password"] and request.json["npassword"]):
            return jsonify ({"error": "Invalid Form"})
        if not user.password == request.json["password"]:
            return jsonify ({"error": "Wrong Password"})

        user.password = request.json["npassword"]
        db.session.add (user)
        db.session.commit ()
        return jsonify ({"Success": True, "Password": "CHANGED"})
    except Exception as e:
        print (e)
        return jsonify ({"error": "Invalid form"})



@app.route ("/api/deleteaccount", methods = ["DELETE"])
@jwt_required
def delete_account():
    try:
        user = Users.query.get (get_jwt_identity())
        listings = Listing.query.all()
        for listing in listings:
            if listing.user_id == user.user_id:
                delListing (listing.list_id)
        removeUser (user.user_id)
        return jsonify ({"Succes": True, "Account": "REMOVED"})
    except Exception as e:
        return jsonify ({"error": "Failed"})


@app.route ("/api/comments", methods =["GET"])
def get_comments ():
    return jsonify (getComments())

@app.route ("/api/addcomment", methods = ["POST"])
@jwt_required
def add_comment ():
    try:
        list_id = request.json ["list_id"]
        user_id = get_jwt_identity()
        comment = request.json ["comment"]
        addComment (list_id, user_id, comment)

        return jsonify ({"success": True})
    except Exception as e:
        print (e)
        return jsonify ({"error": "Invalid Submission"})

      




if __name__ == '__main__':
    app.run (debug = True, host = 'localhost', port = 5000)


#Register
# curl -g -X POST -H "Content-Type: application/json" -d "{\"first_name\": \"Sajid\", \"last_name\": \"Mahmud\",\"username\":\"sajidmahmud69\",\"email\":\"sajidmahmud36@yahoo.com\",\"password\":\"mallu\"}" "http://localhost:5000/api/register"

# curl -g -X POST -H "Content-Type: application/json" -d "{\"first_name\": \"Noor\", \"last_name\": \"Rahik\", \"username\": \"noorrahik12\", \"email\": \"noorrahik@gmail.com\" ,\"password\": \"rahik123456\"}" http://localhost:5000/api/register"

#Login
# curl -g -X POST -H "Content-Type: application/json" -d "{\"username\":\"sajidmahmud69\",\"password\":\"mallu\"}" "http://localhost:5000/api/login"

#Adding a listing
# curl -g -X POST -H "Content-Type: application/json" -d "{\"title\": \"My Old House\", \"description\": \"beshi boro basha noy\", \"image\": \"http://google.com\",\"address\":\"16420 86th Road\",\"price\":\"2500\",\"user_id\":\"1\"}" "http://localhost:5000/api/addlisting"

# Get Listing
# curl "http://localhost:5000/api/listings" 

# curl -g -X POST -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDc5MzY1MDMsIm5iZiI6MTYwNzkzNjUwMywianRpIjoiMWY0ZDExZWQtZDI0OS00NWY2LWFhZGQtNWVjZDhkZjhiMjcwIiwiZXhwIjoxNjA3OTM3NDAzLCJpZGVudGl0eSI6MSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.ad_UCJy8vXxf9vW1Hi9OX9HCrqHS5BWnlsMfnxNR7ZE" -H "Content-Type: application/json" -d "{\"user_id\":\"1\",\"title\":\"Jonglee Basha\",\"description\": \"Basha daroon kintu dorja khola thake\",\"image\":\"http://www.yourorlandorealty.com/wp-content/uploads/2012/09/House_Front-300x223.jpg\",\"address\":\"16420 86th road\",\"price\":\"1400\"}" "http://localhost:5000/api/addlisting"