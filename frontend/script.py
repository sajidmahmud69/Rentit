import requests
import smtplib 

# API key


with open ("Google Api key.txt", "r") as api_file:
    api_key = api_file.readline()

# home address input
origin = input("Enter a origin address\n") 
  
# work address input
destination = input("Enter a destination address\n") 

# method of transportation
method = input ("Enter method of transportation: driving, walking, bicycling, transit\n")
  
# base url
url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&"

# get response
r = requests.get(url + "origins=" + origin + "&destinations=" + destination + "&mode=" + method + "&avoid=tolls"+ "&key=" + api_key) 
 
# return time as text and as seconds
time = r.json()["rows"][0]["elements"][0]["duration"]["text"]       
seconds = r.json()["rows"][0]["elements"][0]["duration"]["value"]


  
# print the travel time
print("\nThe total travel time from origin to destination is {}".format(time))