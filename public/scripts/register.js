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
    } else if ($("#bandusername").val().length < 6) {
      $("#usernameError").text("Username must be 6 characters");
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
    } else if ($("#banduserpassword").val().length < 6) {
      $("#passwordError").text("Password must be 6 characters");
      $("#passwordError").show();
      return false;
    }

    if (
      $("#banduserpasswordconf")
        .val()
        .trim() == ""
    ) {
      $("#passwordconfError").text("Confirm Password required");
      $("#passwordconfError").show();
      return false;
    } else if (
      $("#banduserpassword").val() != $("#banduserpasswordconf").val()
    ) {
      $("#passwordconfError").text("Passwords do not match");
      $("#passwordconfError").show();
      return false;
    }

    if (
      $("#banduseremail")
        .val()
        .trim() == ""
    ) {
      $("#emailError").text("Email required");
      $("#emailError").show();
      return false;
    }
  }

  // Submit button click handler
  $("#regform").on("submit", function(e) {
    e.preventDefault();
    let data = {
      username: $("#bandusername").val(),
      password: $("#banduserpassword").val(),
      email: $("#banduseremail").val()
    };
    let isOk = inputVal();
    if (isOk == false) {
      return;
    }
    $.post("http://localhost:3000/users/register", data, function() {})
      .done(function(res) {
        location.href = "./login";
      })
      .fail(function(e) {
        if (e.status === 403) {
          $("#infoError").text("User already exists!");
          $("#infoError").show();
        }
      });
  });
});
