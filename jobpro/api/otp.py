import frappe
import requests

CUSTOMER_ID = frappe.conf.message_central_customer_id
KEY = frappe.conf.message_central_key
BASE_URL = "https://cpaas.messagecentral.com"

def generate_auth_token():

    url = f"{BASE_URL}/auth/v1/authentication/token"

    params = {
        "customerId": CUSTOMER_ID,
        "key": KEY,
        "scope": "NEW",
        "country": "91"
    }

    response = requests.get(url, params=params)
    frappe.errprint(response.text)
    data = response.json()

    if data.get("status") != 200:
        frappe.throw("Unable to generate auth token")

    auth_token = data["token"]

    frappe.cache().set_value(
        "message_central_auth_token",
        auth_token,
        expires_in_sec=3500
    )

    return auth_token


def get_auth_token():

    auth_token = frappe.cache().get_value(
        "message_central_auth_token"
    )

    if auth_token:
        return auth_token

    return generate_auth_token()

def test_check():
    # # Send OTP
    # mobile_number = "6369606405"
    # return send_otp(mobile_number)
    # # Verfiy
    # mobile_number = "6369606405"
    # otp = "4493"
    # return verify_otp(mobile_number, otp)
    frappe.cache().delete_value("message_central_auth_token")
    frappe.db.commit()
    
@frappe.whitelist(allow_guest=True)
def send_otp(mobile_number):

    auth_token = get_auth_token()
    frappe.log_error("Auth Token - Send OTP", auth_token)
    url = f"{BASE_URL}/verification/v3/send"

    headers = {
        "authToken": auth_token
    }

    params = {
        "countryCode": "91",
        "flowType": "SMS",
        "mobileNumber": mobile_number,
        "customerId": CUSTOMER_ID
    }

    response = requests.post(
        url,
        headers=headers,
        params=params
    )

    data = response.json()
    frappe.log_error("Response Data - Send OTP", data)
    response_code = str(data.get("responseCode"))

    if response_code == "506":
        return {
            "status": "warning",
            "message": "OTP already sent. Please wait."
        }

    if response_code != "200":
        frappe.throw(data.get("message"))

    verification_id = data["data"]["verificationId"]

    frappe.cache().set_value(
        f"otp_verification:{mobile_number}",
        verification_id,
        expires_in_sec=300
    )

    return {
        "status": "success",
        "message": "OTP Sent"
    }


@frappe.whitelist(allow_guest=True)
def verify_otp(mobile_number, otp):

    verification_id = frappe.cache().get_value(
        f"otp_verification:{mobile_number}"
    )

    if not verification_id:
        frappe.throw("OTP expired")

    auth_token = get_auth_token()

    url = f"{BASE_URL}/verification/v3/validateOtp"

    headers = {
        "authToken": auth_token
    }

    params = {
        "verificationId": verification_id,
        "code": otp,
        "flowType": "SMS",
    }

    # Log everything before the request
    frappe.log_error("Validate OTP - Pre Request Debug", {
        "auth_token": auth_token,
        "verification_id": verification_id,
        "otp": otp,
        "url": url,
        "params": params
    })

    response = requests.get(url, headers=headers, params=params)

    # Log raw response
    frappe.log_error("Validate OTP - Raw Response", {
        "status_code": response.status_code,
        "response_text": response.text,
        "request_url": str(response.request.url),
        "request_headers": dict(response.request.headers),
    })

    if response.status_code == 401:
        frappe.throw("Unauthorized. Invalid auth token.")

    if response.status_code != 200:
        frappe.throw(response.text)

    try:
        data = response.json()
    except Exception:
        frappe.throw(response.text)

    response_code = str(data.get("responseCode"))

    if response_code != "200":
        frappe.throw(data.get("message"))

    verification_status = (
        data.get("data", {})
        .get("verificationStatus")
    )

    if verification_status != "VERIFICATION_COMPLETED":
        frappe.throw("Invalid OTP")

    user = frappe.db.get_value(
        "User",
        {"mobile_no": mobile_number},
        "name"
    )

    if not user:
        frappe.throw("User not found")

    frappe.local.login_manager.login_as(user)

    frappe.cache().delete_value(
        f"otp_verification:{mobile_number}"
    )

    return {
        "status": "success",
        "message": "OTP Verified",
        "redirect_to": "/jobpro"
    }