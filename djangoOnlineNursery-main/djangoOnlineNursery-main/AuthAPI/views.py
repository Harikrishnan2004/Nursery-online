from django.http import JsonResponse

import random
from hashlib import sha256
import json

from mail.mail import sendMail

import smtplib
import ssl
from email.message import EmailMessage
from twilio.rest import Client
from mail.mail import sendMail
import requests


SERVER_SECRET = "8255d89e73529ed5b9879e1921c06661d8ea817198071913817b6d9a3561f9a2"

from dbase import (
    authenticate,
    isPresent,
    add,
    addAlt,
    addTemp,
    verifyOTP,
    delTemp,
    verifyAuthToken,
    updateCSRF,
    verifyCSRF,
    updateAuthToken,
    getAuthToken
)

def genAuthToken():
    _token = ""

    for i in range(64):
        _token += random.choice("0123456789abcdef")

    return _token

def genCSRF(user):
    _token = genAuthToken()

    return (updateCSRF({
        "user": user["email/phone"],
        "csrf": _token
    }), _token)

def _authenticate(user):

    user["user"] = user["email/phone"]

    if "authToken" in user and user["authToken"] != "":
        if "csrf" in user and user["csrf"] != "":
            return verifyAuthToken(user) and verifyCSRF(user)

    salt = isPresent(user)
    if salt != -1:
        password_salted_sha256 = sha256((salt + user["password"]).encode()).hexdigest()
        _user = {
            "user": user["user"],
            "password_salted_sha256": password_salted_sha256
        }

        __user = {
            "alt": user["user"],
            "password_salted_sha256": password_salted_sha256
        }

        if authenticate(_user) or authenticate(__user):
            return True

    return False

# Create your views here.
def authAPILogin(request):
    if request.method == 'POST':
        user = json.loads(request.body.decode())

        print(user)

        if _authenticate(user):
            updateCSRF({
                "user": user["user"],
                "csrf": SERVER_SECRET
            })

            authToken = ""
            if "authToken" not in user:
                aU = getAuthToken(user)
                if aU == '':
                    authToken = genAuthToken()
                else:
                    authToken = aU
                updateAuthToken({
                    "user": user["user"],
                    "authToken": authToken
                })

            return JsonResponse({
                "authAPILogin-response": "Success",
                "authToken": authToken
            })

    return JsonResponse({
        "authAPILogin-response": "Failed"
    })


'''
    request.POST --> {
        "email/phone": value,
        "fname": value,
        "lname": value,
        "password": value
    }

    Table Contains ---> {
        user,
        password_salted_sha256,
        salt,
        fname,
        lname,
        alt
    }
'''

def authAPIAddAlt(request):
    if request.method == "POST":
        user = json.loads(request.body.decode())


        if _authenticate(user):
            updateCSRF({
                "user": user["user"],
                "csrf": SERVER_SECRET
            })
            user["user"] = user["email/phone"]
            if addAlt(user):
                return JsonResponse({
                    "authAPIAddAlt-response": "Success"
                })

    return JsonResponse({
        "authAPIAddAlt-response": "Failed"
    })


def authAPISignUp(request):
    if request.method == "POST":
        user = json.loads(request.body.decode())

        user["user"] = user["email/phone"]

        print(user)

        if isPresent(user) == -1:
            if "otp" not in user or user["otp"] == "":
                otp = str(int(random.random() * 10000))
                sendMail(user["user"], user["fname"], otp)
                user.update({ "otp": otp })
                addTemp(user)
                return JsonResponse({
                    "authAPISignUp-response": "OTP Verification Required"
                })

            if not verifyOTP(user):
                return JsonResponse({
                    "authAPISignUp-response": "OTP Verification Failed"
                })

            salt = str(int(random.random() * 1000000))
            password_salted_sha256 = sha256((salt + user["password"]).encode()).hexdigest()
            authToken = genAuthToken()
            _user = {
                "user": user["user"],
                "salt": salt,
                "password_salted_sha256": password_salted_sha256,
                "fname": user["fname"],
                "lname": user["lname"],
                "alt": "",
                "authToken": authToken
            }
            add(_user)
            delTemp(_user)
            res = JsonResponse({
                "authAPISignUp-response": "Success",
                "authToken": authToken
            })
            return res

    return JsonResponse({
        "authAPISignUp-response": "Failed"
    })

def authAPIgetCSRF(request):
    if request.method == "POST":
        user = json.loads(request.body.decode())

        res = genCSRF(user)
        if res[0]:
            return JsonResponse({
                "csrf": res[1]
            })

    return JsonResponse({
        "csrf": "Invalid User"
    })

def signup(request):
    global OTP
    OTP = random.randint(1000, 9999)

    if request.method == 'POST':

        data = json.loads(request.body.decode())
        print(data)

        if(data['email/phone'].isnumeric()):

            url = "https://www.fast2sms.com/dev/bulkV2"

            payload = "sender_id=TXTIND&message=This is a test message&route=v3&numbers=7550184236"
            headers = {
                'authorization': "SVoPQeFzH1U5pW423RDIy0jxkhtG68qdAKZMrYJwTElLigu7afYZ7rwAJc8VxuRofTnBeWhSFHDigPmX",
                'Content-Type': "application/x-www-form-urlencoded",
                'Cache-Control': "no-cache",
                }

            response = requests.request("POST", url, data=payload, headers=headers)

            print(response.text)


        else:
            email_sender = "abijash2731@gmail.com"
            email_receiver = data['email/phone']
            email_password = "ukzmiflnmvtjemwl"

            subject = "Online nursery"
            body = f"Hello {data['lname']} your one time password is {OTP}"

            em = EmailMessage()
            em['From'] = email_sender
            em['To'] = email_receiver
            em['Subject'] = subject
            em.set_content(body)

            context = ssl.create_default_context()
            with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
                smtp.login(email_sender, email_password)
                smtp.sendmail(email_sender, email_receiver, em.as_string())

            sendMail(data["email/phone"], data["fname"], OTP)

        return JsonResponse({"status": "Success"})
    else:
        return JsonResponse({"status": "Success"})
