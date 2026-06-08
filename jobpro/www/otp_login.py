import frappe
from frappe import _
from frappe.core.doctype.navbar_settings.navbar_settings import get_app_logo

no_cache = True


def get_context(context):
	redirect_to = frappe.local.request.args.get("redirect-to")

	if frappe.session.user != "Guest":
		if redirect_to:
			frappe.local.flags.redirect_location = redirect_to
		else:
			user_type = frappe.db.get_value("User", frappe.session.user, "user_type")
			if user_type == "Website User":
				from frappe.website.utils import get_home_page
				frappe.local.flags.redirect_location = get_home_page()
			else:
				frappe.local.flags.redirect_location = "/jobpro"
		raise frappe.Redirect

	context.no_header = True
	context["title"] = "OTP Login"
	context["hide_login"] = True
	context["logo"] = get_app_logo()
	context["app_name"] = (
		frappe.get_website_settings("app_name")
		or frappe.get_system_settings("app_name")
		or _("Frappe")
	)
	return context
