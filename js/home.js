var generator = 3;
var prime = 17;
var key = Math.floor(Math.random() * 15);
if (key === 0 || key == 1) {
  key = key + 2;
}
var publicKey = generator ** key % prime;
var result = {
  publicKey: publicKey,
  prime: prime,
  generator: generator
};

$.ajax({
  url: "http://localhost:2000/api/home/preprocess",
  type: "post",
  data: result,
  dataType: "json",
  success: function(data, textStatus, request) {
    let privateKey = publicKey ** data.publicKey % prime;
    for (var i = 0; i < data.key.length; ++i) {
      data.key[i] = data.key[i] / privateKey;
    }
    localStorage.setItem("aeskey", JSON.stringify(data.key));
    $("#publicKey").text("Public Key: " + publicKey);
    $("#privateKey").text("Private Key: " + privateKey);
    $("#key").text(JSON.stringify(data.key));
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
  }
});

$.ajaxSetup({
  headers: {
    "auth-token": localStorage.getItem("auth-token")
  }
});

$(".my-form").submit(function(event) {
  event.preventDefault();
  var key = localStorage.getItem("aeskey");
  key = JSON.parse(key);
  var textBytes = aesjs.utils.utf8.toBytes($("#content").val());
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var encryptedBytes = aesCtr.encrypt(textBytes);
  $.ajax({
    url: "http://localhost:2000/api/home/adddoc",
    type: "post",
    data: {
      heading: $("#heading").val(),
      content: JSON.stringify(encryptedBytes)
    },
    dataType: "json",
    success: function(data, textStatus, request) {
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    }
  });
});

$.ajax({
  url: "http://localhost:2000/api/home/getdoc",
  type: "get",
  data: {},
  dataType: "json",
  success: function(data, textStatus, request) {
    tablee(data);
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
  }
});

function tablee(json) {
  var tr;
  for (var i = 0; i < json.length; i++) {
    tr = $("<tr/>");
    tr.append(
      "<td id='tblu' name=" + json[i]._id + ">" + json[i].heading + "</td>"
    );
    $("table tbody").append(tr);
    $("#tblu").on("click", function(event) {
      event.preventDefault();
      localStorage.setItem("id", $(this).attr("name"));
      window.open("http://localhost:2000/view", "_self");
    });
  }
  $("#data").after('<div class="w3-margin-left w3-margin-top" id="nav"></div>');
  var rowsShown = 5;
  var rowsTotal = $("#data tbody tr").length;
  var numPages = rowsTotal / rowsShown;
  for (i = 0; i < numPages; i++) {
    var pageNum = i + 1;
    $("#nav").append('<a href="#" rel="' + i + '">' + pageNum + "</a> ");
  }
  $("#data tbody tr").hide();
  $("#data tbody tr")
    .slice(0, rowsShown)
    .show();
  $("#nav a:first").addClass("active");
  $("#nav a").bind("click", function() {
    $("#nav a").removeClass("active");
    $(this).addClass("active");
    var currPage = $(this).attr("rel");
    var startItem = currPage * rowsShown;
    var endItem = startItem + rowsShown;
    $("#data tbody tr")
      .css("opacity", "0.0")
      .hide()
      .slice(startItem, endItem)
      .css("display", "table-row")
      .animate({ opacity: 1 }, 300);
  });
}

function doit(id) {
  localStorage.setItem("id", id);
  window.open("http://localhost:2000/view", "_self");
}
