import requests
import json
# Making a PATCH request
headers={'content-type': 'application/json'}
#r = requests.patch('https://express-api-bice.vercel.app/update_light/1',headers=headers,data=None )
r = requests.patch('http://localhost:8080/update_light/1',headers=headers,data=json.dumps({"power":"off"}) )
# check status code for response received
# success code - 200
#print(r)
 
# print content of request
print(r.content)