$(document).ready(
    function() {        
        /**
         * Event handler for when the user attempts to register
         */
        $("#reg-form").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/users/register',
                dataType: 'json',
                data: {
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value
                },
                success: function(token){
         $(location).attr('href', '/feed' );    // Redirect to a login page
                },
                error: function(errMsg) {
                    swal(
                        'Oops...',
                        errMsg.responseJSON.body,
                        'error'
                    )
                }
            });
        }); 

        $("#log-form").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: {
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value
                },
                success: function(token){
                     $(location).attr('href', '/feed' ); // Redirect to logged in page
                },
                error: function(errMsg) {
                    swal(
                        'Oops...',
                        errMsg.responseJSON.body,
                        'error'
                    )
                }
            });
        });

        $("#logout").click(function (event) {

    Cookies.remove('Authorization');            
    $(location).attr('href', '/');
});
    $("#register_error_message").hide();
    $("#password_error_message").hide();
    $("#retype_password_error_message").hide();

    var error_email = false;
    var error_password = false;
    var error_retype_password = false;
    
    $( "#inputUsername" ).focusout(function() {
        check_email();
    });

    $( "#inputPassword" ).focusout(function() {
        check_password();
    });

    $( "#retypePassword" ).focusout(function() {
        check_retype_password();
    });

     function check_email() {
        var pattern = new RegExp(/^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i);

        if(pattern.test($("#inputUsername").val())) {
            $("#register_error_message").hide();
        } else {
            $("#register_error_message").html("Invalid email address");
            $("#register_error_message").show();
            error_email=true;
        }
    }

     function check_password() {
        var password_length = $("#inputPassword").val().length;

        if(password_length < 5) {
            $("#password_error_message").html("At least 5 characters");
            $("#password_error_message").show();
            error_password=true;
        } else {
            $("#password_error_message").hide();
        }
    }

    function check_retype_password() {
        var password = $("#inputPassword").val();
        var retype_password = $("#retypePassword").val();


        if(password != retype_password) {
            $("#retype_password_error_message").html("Password does not match");
            $("#retype_password_error_message").show();
            error_retype_password=true;
        } else {
            $("#retype_password_error_message").hide();
        }
    }

    });
