import frappe
import requests
import json
from erpnext.setup.utils import get_exchange_rate
from frappe.utils import fmt_money

base_url = "https://erp.teamproit.com"

api_key = frappe.conf.get("teampro_api_key")
api_secret = frappe.conf.get("teampro_api_secret")


@frappe.whitelist()
def get_tasks(additional_filters=None):
    frappe.log_error("API HIT", "HIT")
    filters = [
        ["status", "in", ["Open", "Overdue", "Pending Review", "Working"]],
        ["service", "in", ["REC-I", "REC-D"]]
    ]
    if additional_filters:
        if isinstance(additional_filters, str):
            additional_filters = json.loads(additional_filters)
        filters.extend(additional_filters)
        
    fields = [
        "name","subject","territory","created_on", "currency", 
        "amount","custom_country_flag", "customer", "custom_free_recruitment",
        "food", "accommodation", "joining_ticket", "transportation",
        "custom_customer_location_image", "qualification_type", "specialization", "minimum_experience",
        "maximum_experience", "gulf_experience", "description", "custom_about_customer", 
        "custom_customer_website", "custom_major_key_skills", "vac", "total_experience"
    ]   
    count = 0

    try:
        response = requests.get(
            f"{base_url}/api/resource/Task",
            params={
                "fields": json.dumps(fields),
                "filters": json.dumps(filters),
                "limit_page_length": 1000,
                "order_by": "created_on desc"
            },
            headers={
                "Authorization": f"token {api_key}:{api_secret}"
            },
        )
        response.raise_for_status()
        data = response.json()
        frappe.log_error("data", data)
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

def test_check():
    additional_filters = [
        ["name", "like", "%cable%"]
    ]
    get_tasks()
    
@frappe.whitelist()
def get_options(doctype, fields):
    try:
        response = requests.get(
            f"{base_url}/api/method/teampro.api.get_options",
            params={
                "doctype": doctype,
                "fields": json.dumps(fields)
            },
            headers={
                "Authorization": f"token {api_key}:{api_secret}"
            },
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        return data

    except requests.exceptions.RequestException as e:
        frappe.log_error(
            title="External Task API Error",
            message=frappe.get_traceback()
        )
        frappe.throw("Unable to fetch options from tasks from external server")