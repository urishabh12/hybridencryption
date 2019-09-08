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
