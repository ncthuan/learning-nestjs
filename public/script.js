
const isLoggedIn = () => {
  const token = localStorage.token;
  const expired = localStorage.tokenExp < Date.now()/1000;
  if (!token || expired) return false;
  else return true;
}

const logout = () => {
  if (window.location.pathname !== "/") 
    window.location.pathname = "/" //redirect home page
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExp');
  localStorage.removeItem('user');
  $('#login-toggle').html('Login');
}

const parseJwt = (token) => {
  return JSON.parse(atob(token.split('.')[1]));
}


/* Login & signup */
const loginPage = $('#login-page');
const signupPage = $('#signup-page');
if (!isLoggedIn()) {
  loginPage.show();
}

$('#login-toggle').click(() => {
  logout();
  loginPage.show();
});

$('#signup-toggle').click(() => {
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
      $('#login-toggle').html('Logout');
    },
    error: (error) => {
      alert(error.responseText);
    }
  });

$('#signup-form')
  .ajaxForm({
    url: 'user/signup',
    type: 'POST',
    success: (response) => {
      alert("user created");
      signupPage.hide();
    },
    error: (error) => {
      alert(error.responseText);
    }
  });


/* Profile */
$('#profile-toggle').click(() => {
  //event.preventDefault();
  $.ajax({
    url: 'user/'+localStorage.username,
    method: 'GET',
    headers: { Authorization: 'Bearer '+localStorage.token },
    success: (response) => {
      $('#main').html(response);
      setupProfileView();
    },
    error: (error) => {
      alert(error.responseText);
    }
  });
});

const setupProfileView = () => {
  const setupEditProfileForm = () => {
    $('#edit-profile-form')
      .ajaxForm({
        url: 'user/'+localStorage.username,
        type: 'PUT',
        headers: { Authorization: 'Bearer '+localStorage.token },
        beforeSubmit: (arr) => {//arr: array of multipart form
          
        },
        success: (response) => {
          $('#main').html(response);
          $('#edit-profile-page').hide();
        },
        error: (error) => {
          alert(error.responseText);
        },
        clearForm: true
      });

    $('#input-user-img').change((event) => {
      let preview = document.getElementById('preview-user-img');
      preview.src = URL.createObjectURL(event.target.files[0]);
      preview.classList.add('user-img');
      preview.onload = () => {URL.revokeObjectURL(preview.src)}; //free memory
      $('#preview').show();
    });
  }
    
  $('#edit-profile-button').click(() => {
    $.ajax({
      url: 'snippets/profile_form.html',
      method: 'GET',
      success: (response) => {
        $('#edit-profile-page').html(response).show();
        setupEditProfileForm();
      },
      error: (error) => {
        alert(error.responseText);
      }
    });
  });

  $('#delete-profile-button').click(() => {
    $.ajax({
      url: 'user/'+localStorage.username,
      method: 'DEL',
      headers: { Authorization: 'Bearer '+localStorage.token },
      success: (response) => {
        alert(response.responseText);
      },
      error: (error) => {
        alert(error.responseText);
      }
    });
  });
}


const parseEditProfileFormData = (arr) => {

}