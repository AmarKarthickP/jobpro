import frappe
import requests
import json
from erpnext.setup.utils import get_exchange_rate
from frappe.utils import fmt_money
from frappe.utils.file_manager import save_file

base_url = "https://erp.teamproit.com"
api_key = frappe.conf.get("teampro_api_key")
api_secret = frappe.conf.get("teampro_api_secret")

@frappe.whitelist(allow_guest=True)
def get_tasks(additional_filters=None, candidate=None, start = 0, page_length = 12):
	try:
		response = requests.get(
			f"{base_url}/api/method/teampro.jobpro_api.get_tasks",
			params={
				"additional_filters": additional_filters,
				"candidate": candidate,
				"start": start,
				"page_length": page_length
			},
			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},
			timeout=10
		)
		response.raise_for_status()
		data = response.json()
		return data.get("message", {})

	except requests.exceptions.RequestException as e:
		frappe.log_error(
			title="External Task API Error",
			message=frappe.get_traceback()
		)
		frappe.throw("Unable to fetch options from tasks from external server")
		
def get_inr_price(currency, amount):
	if not currency or not amount:
		return 0
	if currency == "INR":
		return amount
	
	conversion = get_exchange_rate(currency, "INR")
	amt = round(conversion * amount, 0)
	return fmt_money(amount=amt, precision=0)

@frappe.whitelist(allow_guest=True)
def get_options(doctype, fields):
	try:
		response = requests.get(
			f"{base_url}/api/method/teampro.jobpro_api.get_options",
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
		return data.get("message", {})

	except requests.exceptions.RequestException as e:
		frappe.log_error(
			title="External Task API Error",
			message=frappe.get_traceback()
		)
		frappe.throw("Unable to fetch options from tasks from external server")
		   
@frappe.whitelist(allow_guest=True)
def get_candidates(email):
	try:
		response = requests.get(
			f"{base_url}/api/method/teampro.jobpro_api.get_candidate",
			params={
				"email": email
			},
			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},
			timeout=10
		)
		response.raise_for_status()
		data = response.json()
		return data.get("message")

	except requests.exceptions.RequestException as e:
		frappe.log_error(
			title="External Candidate API Error",
			message=frappe.get_traceback()
		)
		frappe.throw("Unable to fetch candidates from external server")
		
	  
@frappe.whitelist(allow_guest=True)
def get_nationality():
	try:
		response = requests.get(
			f"{base_url}/api/method/teampro.jobpro_api.get_nationality",
			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},
			timeout=10
		)
		response.raise_for_status()
		data = response.json()
		return data.get("message")

	except requests.exceptions.RequestException as e:
		frappe.log_error(
			title="External Nationality API Error",
			message=frappe.get_traceback()
		)
		frappe.throw("Unable to fetch nationality from external server")
		
@frappe.whitelist(allow_guest=True)
def get_districts():
	try:
		response = requests.get(
			f"{base_url}/api/method/teampro.jobpro_api.get_districts",
			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},
			timeout=10
		)
		response.raise_for_status()
		data = response.json()
		return data.get("message")

	except requests.exceptions.RequestException as e:
		frappe.log_error(
			title="External District API Error",
			message=frappe.get_traceback()
		)
		frappe.throw("Unable to fetch districts from external server")
		
@frappe.whitelist(allow_guest=True)
def get_state():
	try:
		response = requests.get(
			f"{base_url}/api/method/teampro.jobpro_api.get_states",
			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},
			timeout=10
		)
		response.raise_for_status()
		data = response.json()
		return data.get("message")

	except requests.exceptions.RequestException as e:
		frappe.log_error(
			title="External State API Error",
			message=frappe.get_traceback()
		)
		frappe.throw("Unable to fetch states from external server")
		
@frappe.whitelist(allow_guest=True)
def get_country():
	try:
		response = requests.get(
			f"{base_url}/api/method/teampro.jobpro_api.get_country",
			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},
			timeout=10
		)
		response.raise_for_status()
		data = response.json()
		return data.get("message")

	except requests.exceptions.RequestException as e:
		frappe.log_error(
			title="External Country API Error",
			message=frappe.get_traceback()
		)
		frappe.throw("Unable to fetch country from external server")
		
@frappe.whitelist(allow_guest=True)
def get_currency():
	try:
		response = requests.get(
			f"{base_url}/api/method/teampro.jobpro_api.get_currency",
			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},
			timeout=10
		)
		response.raise_for_status()
		data = response.json()
		return data.get("message")

	except requests.exceptions.RequestException as e:
		frappe.log_error(
			title="External Currency API Error",
			message=frappe.get_traceback()
		)
		frappe.throw("Unable to fetch currency from external server")
		
@frappe.whitelist(allow_guest=True)
def get_highest_degree():
	try:
		response = requests.get(
			f"{base_url}/api/method/teampro.jobpro_api.get_highest_degree",
			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},
			timeout=10
		)
		response.raise_for_status()
		data = response.json()
		return data.get("message")

	except requests.exceptions.RequestException as e:
		frappe.log_error(
			title="External Highest Degree API Error",
			message=frappe.get_traceback()
		)
		frappe.throw("Unable to fetch highest degree from external server")

@frappe.whitelist(allow_guest=True)
def get_specialization():
	try:
		response = requests.get(
			f"{base_url}/api/method/teampro.jobpro_api.get_specialization",
			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},
			timeout=10
		)
		response.raise_for_status()
		data = response.json()
		return data.get("message")

	except requests.exceptions.RequestException as e:
		frappe.log_error(
			title="External Specialization API Error",
			message=frappe.get_traceback()
		)
		frappe.throw("Unable to fetch specialization from external server")

@frappe.whitelist(allow_guest=1)
def update_candidate_details():
	try:

		data = frappe.request.get_json()

		# ---------------------------------
		# Update User Details
		# ---------------------------------

		user_fields = {}
		location_parts = []
		user = None

		if data.get("given_name"):
			user_fields["full_name"] = data.get("given_name")
			user_fields["first_name"] = data.get("given_name")

		if data.get("mobile_number"):
			user_fields["mobile_no"] = data.get("mobile_number")

		if data.get("gender"):
			user_fields["gender"] = data.get("gender")

		if data.get("date_of_birth"):
			user_fields["birth_date"] = data.get("date_of_birth")

		# Location
		if data.get("location"):
			location_parts.append(data.get("location"))

		if data.get("temp_state"):
			location_parts.append(data.get("temp_state"))

		if data.get("country"):
			location_parts.append(data.get("country"))

		if location_parts:
			user_fields["location"] = ", ".join(location_parts)

		# User Email
		if data.get("mail_id"):
			user = data.get("mail_id")

		# Update Internal User
		if user and user_fields:
			frappe.db.set_value("User", user, user_fields)
		
		response = requests.post(
			f"{base_url}/api/method/teampro.jobpro_api.update_candidate_details",

			json=data,

			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},

			timeout=15
		)
  
		frappe.log_error(
			title="Candidate Update",
			message=response.text
		)

		response.raise_for_status()
		response_data = response.json()

		return {
			"status": "success",
			"message": response_data
		}

	except requests.exceptions.RequestException:
		frappe.log_error(
			title="External Candidate API Error",
			message=frappe.get_traceback()
		)

		frappe.throw(
			"Unable to update candidate details on external server"
		)

	except Exception:
		frappe.log_error(
			title="Update Candidate Details Error",
			message=frappe.get_traceback()
		)

		frappe.throw("Something went wrong")
		
@frappe.whitelist(allow_guest=True)
def update_user_details():
	data = frappe.request.get_json()
	frappe.db.set_value("User", data.get("name"), data)
	return {"message": "User details updated successfully."}
		
@frappe.whitelist(allow_guest=True)
def delete_file():
	try:
		docname = frappe.form_dict.get("docname")
		doctype = frappe.form_dict.get("doctype")
		fieldname = frappe.form_dict.get("fieldname")

		response = requests.post(
			f"{base_url}/api/method/teampro.jobpro_api.delete_file",

			data={
				"docname": docname,
				"doctype": doctype,
				"fieldname": fieldname,
			},

			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},

			timeout=30
		)

		frappe.log_error(
			title="External Deletion Response",
			message=response.text
		)

		response.raise_for_status()
		response_data = response.json()
		return {
			"status": "success"
		}

	except requests.exceptions.RequestException:
		frappe.log_error(
			title="External Deletion Error",
			message=frappe.get_traceback()
		)

		frappe.throw(
			"Unable to remove the date from external server"
		)

	except Exception:
		frappe.log_error(
			title="Deletion Error",
			message=frappe.get_traceback()
		)

		frappe.throw("Something went wrong")
				
		
def delete_logs():
	error_logs = frappe.get_all("Error Log", pluck="name")
	for error_log in error_logs:
		el = frappe.get_doc("Error Log", error_log)
		el.delete()
		print(error_log)
		
@frappe.whitelist(allow_guest=1)
def get_applied_jobs(candidate):
	try:
		response = requests.get(
			f"{base_url}/api/method/teampro.jobpro_api.get_applied_jobs",
			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},
			params={
				"candidate": candidate
			}
		)
		response.raise_for_status()
		data = response.json()
		print(data)
		return data.get("message")

	except requests.exceptions.RequestException as e:
		frappe.log_error(
			title="External Country API Error",
			message=frappe.get_traceback()
		)
		frappe.throw("Unable to fetch country from external server")
	
@frappe.whitelist(allow_guest=1)
def get_candidate_status(candidate, task):
	try:
		response = requests.get(
			f"{base_url}/api/method/teampro.jobpro_api.get_candidate_status",
			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},
			params={
				"candidate": candidate,
				"task": task
			}
		)
		response.raise_for_status()
		data = response.json()
		print(data)
		return data.get("message")

	except requests.exceptions.RequestException as e:
		frappe.log_error(
			title="External Candidate Status API Error",
			message=frappe.get_traceback()
		)
		frappe.throw("Unable to fetch candidate status from external server")
		
@frappe.whitelist(allow_guest=1)
def apply_job():
	try:
		# Incoming frontend payload
		data = frappe.request.get_json()

		response = requests.post(
			f"{base_url}/api/method/teampro.jobpro_api.apply_job",

			json=data,

			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},

			timeout=15
		)

		response.raise_for_status()
		response_data = response.json()

		return {
			"status": "success",
			"message": response_data
		}

	except requests.exceptions.RequestException:
		frappe.log_error(
			title="External Apply Job API Error",
			message=frappe.get_traceback()
		)

		frappe.throw(
			"Unable to apply jobs on external server"
		)

	except Exception:
		frappe.log_error(
			title="Apply Job Error",
			message=frappe.get_traceback()
		)

		frappe.throw("Something went wrong")
import frappe
import requests

@frappe.whitelist()
def create_candidate(doc, method):

	try:

		data = {
			"given_name": doc.full_name,
			"mail_id": doc.email,
			"mobile_number": doc.mobile_no,
			"source": "REFERPRO",
			"gender": doc.gender,
			"date_of_birth": doc.birth_date,
			"custom_sourced_by": "Normal",
			"position": "From JOBPRO",
			"candidate_image": doc.user_image
		}

		response = requests.post(
			f"{base_url}/api/method/teampro.jobpro_api.create_candidate",

			json=data,

			headers={
				"Authorization": f"token {api_key}:{api_secret}"
			},
		)

		response.raise_for_status()

		return {
			"status": "success",
			"data": response.json()
		}

	except requests.exceptions.RequestException as e:

		error = ""

		if e.response:
			try:
				error = e.response.json()
			except Exception:
				error = e.response.text

		frappe.log_error(
			title="External Document Creation API Error",
			message=str(error)
		)

		return {
			"status": "error",
			"message": str(error)
		}

	except Exception:

		frappe.log_error(
			title="Create Document Error",
			message=frappe.get_traceback()
		)

		return {
			"status": "error",
			"message": "Something went wrong"
		}