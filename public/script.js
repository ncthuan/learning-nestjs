
let loginToggle = document.getElementById('login-toggle');
let signupToggle = document.getElementById('signup-toggle');
let loginPage = document.getElementById('login-page');
let signupPage = document.getElementById('signup-page');
let loginForm = document.getElementById('login-form');

loginToggle.onclick = () => {
  signupPage.style.display = 'none';
  loginPage.style.display = 'block';
}

signupToggle.onclick = () => {
  loginPage.style.display = 'none';
  signupPage.style.display = 'block';
}

// function submitForm(form) {
//   const XHR = new XMLHttpRequest();
//   const FD = new FormData( form );

//   XHR.addEventListener( "load", function(event) {
//     alert( event.target.responseText );
//   });

//   XHR.addEventListener( "error", function(event) {
//     alert( 'Oops! Something went wrong.' );
//   });

//   console.log(FD);
//   XHR.open("POST", form.action);
//   XHR.send(FD);
// }

// loginForm.addEventListener( "submit", function(event) {
//   event.preventDefault();
//   submitForm(loginForm);
// });

$('#login-form')
    .ajaxForm({
        url : 'login', // or whatever
        dataType : 'json',
        success : function (response) {
            alert(response);
        }

    })
;