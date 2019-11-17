$(".my-form").submit(function(event) {
  event.preventDefault();
  $.ajax({
    url: "http://localhost:2000/api/users/registration",
    type: "post",
    data: {
      username: $("#username").val(),
      password: $("#password").val()
    },
    dataType: "json",
    success: function(data, textStatus, request) {
      alert(JSON.stringify(data));
      location.href = "http://localhost:2000/";
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $("h4").text("Wrong email or password");
      console.log(jqXHR, textStatus, errorThrown);
    }
  });
});
