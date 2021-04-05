
const isLoggedIn = () => {
  const token = localStorage.token;
  const expired = localStorage.tokenExp < Date.now()/1000;
  if (!token || expired) return false;
  else return true;
}

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExp');
  localStorage.removeItem('user');
}

const parseJwt = (token) => {
  return JSON.parse(atob(token.split('.')[1]));
}


const loginPage = $('#login-page');
const signupPage = $('#signup-page');

if (!isLoggedIn()) {
  loginPage.show();
}

$('#login-toggle').click(() => {
  logout();
  signupPage.hide();
  $('#login-toggle').html("Login");
  loginPage.show();
});

$('#signup-toggle').click(() => {
  loginPage.hide();
  signupPage.show();
});



$('#login-form')
  .ajaxForm({
    url: 'login',
    type: 'POST',
    dataType: 'json',
    success: (response) => {
      payload = parseJwt(response.token)
      localStorage.setItem("username", payload.username);
      localStorage.setItem("tokenExp", String(payload.exp));
      localStorage.setItem("token", response.token);
      alert('logged in');
      loginPage.hide();
      $('#login-toggle').html("Logout");
    },
    error: (error) => {
      alert(error.responseText);
    }
  });

$('#signup-form')
  .ajaxForm({
    url: 'user/signup',
    type: 'POST',
    dataType: 'json',
    success: (response) => {
      alert("user created");
      signupPage.hide();
    },
    error: (error) => {
      alert(error.responseText);
    }
  });


$('#profile-toggle').click(() => {
  //event.preventDefault();
  $.ajax({
    url: "user/"+localStorage.username,
    method: "GET",
    timeout: 0,
    headers: {
      "Authorization": "Bearer " + localStorage.token
    },
    success: (response) => {
      $('#main').html(response);
    },
    error: (error) => {
      alert(error.responseText);
    }
  });
});
