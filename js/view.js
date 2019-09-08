$.ajaxSetup({
  headers: {
    "auth-token": localStorage.getItem("auth-token")
  }
});

$.ajax({
  url: "http://localhost:2000/api/home/getonedoc/" + localStorage.getItem("id"),
  type: "get",
  data: {},
  dataType: "json",
  success: function(data, textStatus, request) {
    alert(data);
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
  }
});
