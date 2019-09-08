$(".my-form").submit(function(event) {
  event.preventDefault();
  alert("add");
  $.ajax({
    url: "http://localhost:2000/api/users/login",
    type: "post",
    data: {
      username: $("#username").val(),
      password: $("#password").val()
    },
    dataType: "json",
    success: function(data, textStatus, request) {
      let id = request.getResponseHeader("auth-token");
      localStorage.setItem("auth-token", id);
      location.href = "http://localhost:2000/home";
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $("h4").text("Wrong email or password");
      console.log(jqXHR, textStatus, errorThrown);
    }
  });
});

if (localStorage.getItem("auth-token") !== null) {
  location.href = "http://localhost:2000/home";
}
