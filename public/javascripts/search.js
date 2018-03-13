$( document ).ready(function() {

   $( "#w2" ).click(function() {
    var res = result();
    swal({
        title: res[0],
        icon: res[1],
        button: "OK",
    });
   });


   function result() {

    var str = $("#w1").val().toLowerCase();
    str = str.replace(/\s+/g, '');

    var str2 = "This is not a cafe";
    var str3 = "This cafe does have a plug source";
    var str4 = "This cafe does not have a plug source";

    if (str=="cafeexpress" || str=="templecafe") {
        return [str3, "success"];
    } else if ( str=="junglecafe" || str=="revivecafe") {
        return [str4, "error"];
    } else {
        return [str2, "error"];
    }

   }

});