const dataKey = "APPDATA";


console.log("localstorage key ", dataKey)


function showExistingDates() {
    const rawdata = localStorage.getItem(dataKey);
    const data = JSON.parse(rawdata);
    if (data) {
      $.each(data, function (key, value) { 
        console.log("set", key, value)
        $("input[name='"+key+"']").val(value);
        $("textarea[name='"+key+"']").val(value);
      });
      return data.length;
    } else {return 0;}
}


$(document).ready(function () {

  $('#shareBtn').click(function() {
    console.log("Share button clicked");
    $('#shareModal').modal('show');
  })
  $('#modalClose').click(function() {
    console.log("Share modal close");
    $('#shareModal').modal('hide');
  })

  

  $('.clock-field').clockTimePicker({
    duration: true,
    durationNegative: true,
    precision: 5,
    i18n: {
      cancelButton: 'Cancel'
    },
    onAdjust: function (newVal, oldVal) {
      //...
    }
  });


  // "save"-button
  $("#btn-submit").click(function () {


    console.log("SUBMIT")

    // parse all form data into a hashtable
    var pagedata = $("form").serializeArray().reduce(function (obj, item) {
      console.log("item", item.name)
      obj[item.name] = item.value;
      return obj;
    }, {});

    const rawdataExisting = localStorage.getItem(dataKey);
    var existingData = {}
    if (rawdataExisting) {
      existingData = JSON.parse(rawdataExisting);
    }
    console.log("old data", existingData);
    console.log("new data", pagedata);
    localStorage.setItem(dataKey, JSON.stringify(pagedata));

    location.href="index.html";

    $("#saveCode").html("");
    $.each(pagedata, function (key, value) { // delete "temp" values that have only internal use for the time selectors
      if (key.indexOf('temp') == -1) {
        $("#saveCode").append(key.replace(/^\w\w-/, "") + ': "' + value + '"' + "\n");
      }
    });

    $('#saveModal').modal('show');
  });

  $("input[type='radio']").each(function (idx, ele) {
    ele.value = $.trim(ele.nextSibling.nodeValue)
  });
  $("input[type='checkbox']").each(function (idx, ele) {
    ele.value = $.trim(ele.nextSibling.nodeValue)
  });

  const numExistingDates = showExistingDates();
  if (numExistingDates) {
    $("#btn-download").click(function () {
      startDownload();
    });
  } else {
    $("#btn-download").hide();
  }


});

