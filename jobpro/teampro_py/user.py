import frappe
from jobpro.api import create_document

def create_candidate(doc, method):

    payload = {
        "doctype": "Candidate",
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

    create_document(payload)