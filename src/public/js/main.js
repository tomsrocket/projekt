
const dataKey = "APPDATA";

console.log("TEST2")

$(document).ready(function(){

    const rawdata = localStorage.getItem(dataKey);
    const data = JSON.parse(rawdata);
    $.each(data, function (key, value) { 
      console.log("set", key, value)
      $(".var-"+key).html(value);
    });
    return data.length

  });

