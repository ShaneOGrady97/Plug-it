$( document ).ready(function() {

    $("#username_error_message").hide();
    $("#email_error_message").hide();

    var error_username = false;
    var error_email = false;
    
    $( "#target1" ).focusout(function() {
        check_username();
    });

    $( "#target2" ).focusout(function() {
        check_email();
    });

        
    function check_username()  {
        
        var username_length = $("#target1").val().length;


        if(username_length < 3 || username_length > 20) {
            $("#username_error_message").html("Must be between 3-20 characters");
            $("#username_error_message").show();
            error_username = true;
        } else {
            $("#username_error_message").hide();
        }
    }

    function check_email() {
        var pattern = new RegExp(/^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i);

        if(pattern.test($("#target2").val())) {
            $("#email_error_message").hide();
        } else {
            $("#email_error_message").html("Invalid email address");
            $("#email_error_message").show();
            error_email=true;
        }
    }


});