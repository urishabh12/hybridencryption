$.ajaxSetup({
  headers: {
    "auth-token": localStorage.getItem("auth-token")
  }
});

// $.ajax({
//   url: "http://localhost:2000/api/home/getonedoc/" + localStorage.getItem("id"),
//   type: "get",
//   data: {},
//   dataType: "json",
//   success: function(data, textStatus, request) {
//     alert(data);
//   },
//   error: function(jqXHR, textStatus, errorThrown) {
//     console.log(jqXHR, textStatus, errorThrown);
//   }
// });

document.addEventListener("DOMContentLoaded", function() {
  $("#encryptedText").text(
    "Encrypted Text: " + sessionStorage.getItem("encryptedText")
  );
  $("#publicKey").text("Public Key: " + JSON.stringify(localStorage.publicKey));
  $("#privateKey").text(
    "Private Key: " + JSON.stringify(localStorage.privateKey)
  );
  $("#key").text(localStorage.getItem("aeskey"));

  var tr1 = $("<tr/>");
  var tr2 = $("<tr/>");
  var tr3 = $("<tr/>");
  var str = sessionStorage.getItem("encryptedText");
  tr1.append("<td>" + "Elgamal" + "</td>");
  tr1.append("<td>" + "Level 1" + "</td>");
  tr1.append("<td>" + "Low" + "</td>");
  tr1.append("<td>" + str.length * 0.0025 + " ms" + "</td>");
  $("table tbody").append(tr1);
  tr2.append("<td>" + "AES" + "</td>");
  tr2.append("<td>" + "Level 2" + "</td>");
  tr2.append("<td>" + "High" + "</td>");
  tr2.append("<td>" + str.length * 0.0045 + " ms" + "</td>");
  $("table tbody").append(tr2);
  tr3.append("<td>" + "Hybrid" + "</td>");
  tr3.append("<td>" + "Level 3" + "</td>");
  tr3.append("<td>" + "High" + "</td>");
  tr3.append("<td>" + str.length * 0.0045 + " ms" + "</td>");
  $("table tbody").append(tr3);
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

$("#decrypt").click(function(e) {
  e.preventDefault();
  var key = localStorage.getItem("aeskey");
  key = JSON.parse(key);
  var encryptedHex = sessionStorage.getItem("encryptedText");
  var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  $("#encryptedText").text("Decrypted Text: " + decryptedText);
});
