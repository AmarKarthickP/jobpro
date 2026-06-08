app_name = "jobpro"
app_title = "JOBPRO"
app_publisher = "Amar Karthick P"
app_description = "Job search application"
app_email = "karthickpamar@gmail.com"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "jobpro",
# 		"logo": "/assets/jobpro/logo.png",
# 		"title": "JOBPRO",
# 		"route": "/jobpro",
# 		"has_permission": "jobpro.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/jobpro/css/jobpro.css"
web_include_js = [
    "/assets/jobpro/js/login.js",
]
signup_form_template = "jobpro/templates/signup.html"
# include js, css files in header of web template
# web_include_css = "/assets/jobpro/css/jobpro.css"
# web_include_js = "/assets/jobpro/js/jobpro.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "jobpro/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "jobpro/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# automatically load and sync documents of this doctype from downstream apps
# importable_doctypes = [doctype_1]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "jobpro.utils.jinja_methods",
# 	"filters": "jobpro.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "jobpro.install.before_install"
# after_install = "jobpro.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "jobpro.uninstall.before_uninstall"
# after_uninstall = "jobpro.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "jobpro.utils.before_app_install"
# after_app_install = "jobpro.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "jobpro.utils.before_app_uninstall"
# after_app_uninstall = "jobpro.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "jobpro.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	"User": {
		"after_insert": "jobpro.api.create_candidate",
	}
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"jobpro.tasks.all"
# 	],
# 	"daily": [
# 		"jobpro.tasks.daily"
# 	],
# 	"hourly": [
# 		"jobpro.tasks.hourly"
# 	],
# 	"weekly": [
# 		"jobpro.tasks.weekly"
# 	],
# 	"monthly": [
# 		"jobpro.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "jobpro.install.before_tests"

# Extend DocType Class
# ------------------------------
#
# Specify custom mixins to extend the standard doctype controller.
# extend_doctype_class = {
# 	"Task": "jobpro.custom.task.CustomTaskMixin"
# }

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "jobpro.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "jobpro.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["jobpro.utils.before_request"]
# after_request = ["jobpro.utils.after_request"]

# Job Events
# ----------
# before_job = ["jobpro.utils.before_job"]
# after_job = ["jobpro.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"jobpro.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

# Translation
# ------------
# List of apps whose translatable strings should be excluded from this app's translations.
# ignore_translatable_strings_from = []

