// OTP Login: Replace "Login with Email Link" button
(function () {

	function replace_button() {

		var wrapper = document.querySelector('.login-with-email-link');

		if (!wrapper) return;

		// Prevent duplicate replacement
		if (wrapper.dataset.customized) return;

		wrapper.dataset.customized = "1";

		wrapper.innerHTML =
			'<div class="login-button-wrapper">' +
				'<a href="/otp_login" class="btn btn-block btn-default btn-sm btn-login-option">' +
					'Login with OTP' +
				'</a>' +
			'</div>';

		// Hide Frappe email link section
		var section = document.querySelector('.for-login-with-email-link');

		if (section) {
			section.style.display = 'none';
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', replace_button);
	} else {
		replace_button();
	}

	setTimeout(replace_button, 500);

})();

// Register: Replace Signup form with custom form
frappe.ready(function () {

	// Remove core signup handler
	$(".form-signup").off("submit");

	// Custom signup handler
	$(".form-signup").on("submit", function (event) {

		event.preventDefault();
		event.stopImmediatePropagation();

		var args = {};

		args.cmd = "otp_login.api.auth.custom_signup";
		args.email = ($("#signup_email").val() || "").trim();
		args.full_name = ($("#signup_fullname").val() || "").trim();
		args.mobile = ($("#signup_mobile").val() || "").trim();
		args.password = $("#signup_password").val();

		if (!args.email || !args.full_name || !args.password || !args.mobile) {

			frappe.msgprint("All fields are required");

			return false;
		}

		frappe.call({
			type: "POST",
			args: args,
			freeze: true,
			freeze_message: "Creating account...",

			callback: function (r) {

				if (r.message && r.message.redirect_to) {
					window.location.href = r.message.redirect_to;
				}
			}
		});

		return false;
	});

});