
//checking
function check() {
  var flag = false;
  var userName = document.getElementById('myName');
  var userPw = document.getElementById('myPassword');
  var users = JSON.parse(localStorage.getItem('users')) || [];
  for (var i = 0; i < users.length; i++) {
    // if(userName.value == users[i][0])
    if (users[i][0].name == userName.value && users[i][1].pw == userPw.value) {
      //save user name to game page
      sessionStorage.name = userName.value;
      flag= true;
      break;
    }
  }
  if (!flag) {
    alert("אינך קיים במערכת, לחץ כדי להרשם");
  }
  else {
    window.location.href="../html/mainGame.html";
  }
}
