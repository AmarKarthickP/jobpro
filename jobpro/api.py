import frappe
import requests
import json
from erpnext.setup.utils import get_exchange_rate
from frappe.utils import fmt_money

base_url = "https://erp.teamproit.com"

api_key = frappe.conf.get("teampro_api_key")
api_secret = frappe.conf.get("teampro_api_secret")


@frappe.whitelist()
def get_tasks(filters=None):

    filters = [
        ["status", "in", ["Open", "Overdue", "Pending Review", "Working"]],
        ["service", "in", ["REC-I", "REC-D"]]
    ]
    fields = [
        "name","subject","territory","created_on", "currency", 
        "amount","custom_country_flag", "customer", "custom_free_recruitment",
        "food", "accommodation", "joining_ticket", "transportation",
        "custom_customer_location_image", "qualification_type", "specialization", "minimum_experience",
        "maximum_experience", "gulf_experience", "description", "custom_about_customer", 
        "custom_customer_website"
    ]   
    count = 0

    try:
        response = requests.get(
            f"{base_url}/api/resource/Task",
            params={
                "fields": json.dumps(fields),
                "filters": json.dumps(filters)
            },
            headers={
                "Authorization": f"token {api_key}:{api_secret}"
            },
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        # INR conversion
        # for row in data["data"]:
        #     count += 1
        #     currency = row["currency"]
        #     amount = row["amount"] or 0
        #     row["amount_inr"] = get_inr_price(currency,amount)
        #     row["amount"] = fmt_money(amount=amount, precision=0)
        # print(count)
        return data

    except requests.exceptions.RequestException as e:
        frappe.log_error(
            title="External Task API Error",
            message=frappe.get_traceback()
        )
        frappe.throw("Unable to fetch tasks from external server")
        
def get_inr_price(currency, amount):
    if not currency or not amount:
        return 0
    if currency == "INR":
        return amount
    
    conversion = get_exchange_rate(currency, "INR")
    amt = round(conversion * amount, 0)
    return fmt_money(amount=amt, precision=0)