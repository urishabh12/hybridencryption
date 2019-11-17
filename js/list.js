$("#publicKey").text("Public Key: " + JSON.stringify(localStorage.publicKey));
$("#privateKey").text(
  "Private Key: " + JSON.stringify(localStorage.privateKey)
);
$("#key").text(localStorage.getItem("aeskey"));

$.ajaxSetup({
  headers: {
    "auth-token": localStorage.getItem("auth-token")
  }
});

function build(json) {
  var tr;
  for (var i = 0; i < json.length; i++) {
    tr = $("<tr/>");
    tr.append("<td name=" + json[i].content + ">" + json[i].heading + "</td>");
    $("table tbody").append(tr);
  }
  $("td").click(function(e) {
    e.preventDefault();
    let content = $(this).attr("name");
    sessionStorage.setItem("encryptedText", content);
    window.open("http://localhost:2000/view", "_self");
  });
}

$.ajax({
  url: "http://localhost:2000/api/home/getAllDoc",
  type: "get",
  dataType: "json",
  success: function(data, textStatus, request) {
    build(data);
  },
  error: function(jqXHR, textStatus, errorThrown) {
    alert("Failure");
    console.log(jqXHR, textStatus, errorThrown);
  }
});

$("#list").click(function(e) {
  e.preventDefault();
  window.open("http://localhost:2000/list", "_self");
});

$("#logout").click(function(e) {
  e.preventDefault();
  localStorage.removeItem("auth-token");
  window.open("http://localhost:2000/", "_self");
});
