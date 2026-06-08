import frappe
from frappe import _
from frappe.utils.password import update_password
from frappe.auth import LoginManager

@frappe.whitelist(allow_guest=True)
def custom_signup():

    data = frappe.local.form_dict
    full_name = data.get("full_name")
    email = data.get("email")
    mobile = data.get("mobile")
    password = data.get("password")
    
    if not full_name or not email or not mobile or not password:
        return

    if frappe.db.exists("User", email):
        frappe.throw(_("User already exists"))
        
    if frappe.db.exists("User", {"mobile_no": mobile}):
        frappe.throw(_("Mobile number already exists"))

    user = frappe.get_doc({
        "doctype": "User",
        "email": email,
        "first_name": full_name,
        "mobile_no": mobile,
        "enabled": 1,
        "new_password": password,
        "send_welcome_email": 0
    })

    user.insert(ignore_permissions=True)

    # Auto login
    frappe.local.login_manager = LoginManager()
    frappe.local.login_manager.login_as(email)

    return {
        "message": "Signup successful",
        "redirect_to": "/jobpro"
    }