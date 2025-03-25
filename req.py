import requests
 
# Making a PATCH request
r = requests.patch('https://express-api-bice.vercel.app/light/1', data ={'power':"on"})
 
# check status code for response received
# success code - 200
print(r)
 
# print content of request
print(r.content)