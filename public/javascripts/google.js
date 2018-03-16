$(document).ready(function() {
var init = function(){
      //initialise the gapi client
      let initOptions = {
        'apikey': 'AIzaSyBl5WQuQEACMw7wAqSO-mQ-UpYIQcqT6sU',
        'clientId' : '622008361583-8k9l607e817hfephh0jjasf77vmfne18.apps.googleusercontent.com',
        'scope' : 'profile email',
      };
      gapi.client.init(initOptions).then(function(){
         // Listen for sign-in state changes.
                                         gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())

      },function(){
        console.log("Client library initialisation failed");
      });
    }
    var updateSigninStatus = (isSignedIn) => { if(isSignedIn){
    	 signUpWithGoogle().then((response)=>{
                       //prefilll information for user
                       $("[name='fname'").val(response.names[0].displayNameLastFirst.split(" ")[0]);
                       $("[name='lname'").val(response.names[0].displayNameLastFirst.split(" ")[1]);
                       $("[name='uname'").val(response.names[0].displayName);
                       $("[name='email'").val(response.emailAddresses[0].value);
                       $("#imageUser").attr("src",response.coverPhotos[0].url);

                  },(error) => {
                     console.log(error);
                  });
    	}
    };
//client auth api
    gapi.load("client:auth",init);
  
    var signUpWithGoogleOnClickHandler = () => {
      
      if(gapi.auth2.getAuthInstance().isSignedIn.get()){
                 signUpWithGoogle().then((response)=>{
                       //prefilll information for user
                       console.log(response);
                       $("[name='fname'").val(response.names[0].displayNameLastFirst.split(" ")[0]);
                       $("[name='lname'").val(response.names[0].displayNameLastFirst.split(" ")[1]);
                       $("[name='uname'").val(response.names[0].displayName);
                       $("[name='email'").val(response.emailAddresses[0].value);
                       $("#imageUser").attr("src",response.coverPhotos[0].url);
                  },(error) => {
                     console.log(error);
                  });
              }else {
                gapi.auth2.getAuthInstance().signIn();
              }
        };
    let signUpWithGoogle = () => {
            //carry out the request using jquery ajax get
            return new Promise((resolve,reject) => {
                 let access_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
                 let url = 'https://people.googleapis.com/v1/people/me/' +
  '?access_token=' + encodeURIComponent(access_token);
                $.get(url,function(response){
                      resolve(response);
                });
            });
     }
    $("#authGoogle").click(signUpWithGoogleOnClickHandler);
  });