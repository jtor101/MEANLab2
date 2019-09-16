$(function() {
  $(".errorMsg").hide();
  // Input Validation
  function inputVal() {
    $(".errorMsg").hide();
    $(".errorMsg").empty();

    if (
      $("#bandusername")
        .val()
        .trim() == ""
    ) {
      $("#usernameError").text("Username required");
      $("#usernameError").show();
      return false;
    }

    if (
      $("#banduserpassword")
        .val()
        .trim() == ""
    ) {
      $("#passwordError").text("Password required");
      $("#passwordError").show();
      return false;
    }
  }

  // Submit button click handler
  $("#loginform").on("submit", function(e) {
    e.preventDefault();
    let data = {
      username: $("#bandusername").val(),
      password: $("#banduserpassword").val()
    };
    let isOk = inputVal();
    if (isOk == false) {
      return;
    } else {
      $.post("http://localhost:3000/users/login", data, function() {
        location.href = "../divisions";
      });
    }
  });
});
