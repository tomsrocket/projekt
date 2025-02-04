
const dataKey = "APPDATA";

console.log("TEST2")

$(document).ready(function(){

  const rawdata = localStorage.getItem(dataKey);
  if (! rawdata) {
    $('#staticBackdrop').modal('show'); 
    return;
  }



  const data = JSON.parse(rawdata);
  $.each(data, function (key, value) { 
    console.log("set", key, value)
    $(".var-"+key).html(value);
  });

  var mydate = new Date();
  const options = { weekday: "long" };
  const weekday = new Intl.DateTimeFormat("en-US", options).format(mydate);
  $(".vv-weekday").html(weekday);
  console.log("weekday", weekday)

  function getDayName(jdate) {
    return jdate.toLocaleDateString("en-US", { weekday: 'long' });        
  }
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function paintLessons(jdate) {
    var dayNr = jdate.getDay();
    console.log("draw lesson table for day", dayNr)
    const lessons = data["timetable-" + dayNr];
    $('#lessonsday').html(getDayName(jdate))
    $('#lessontable').html('');
    if (lessons) {
      const lessonlist = lessons.split(",");
      var currentLession = 0; 
      for (const lesson of lessonlist) {
        console.log("lesson", lesson);
        $('#lessontable').append('<tr class="mint"><td>' + (++currentLession) + '</td><td>' + lesson + '</td></tr>')
        if (currentLession==6) {
            $('#lessontable').append('<tr class="table-secondary"><td>' + (++currentLession) + '</td><td>Lunch Break</td></tr>')
        }
      }
    }
  }
  paintLessons(mydate);

  const todolist = data["todolist"];
  const todos = todolist.split("\n");
  var currentTodo = 0
  for (const todo of todos) {
    if (todo) {
      const todol = "todo" + (++currentTodo)
      console.log("todo", todo, todol);
      $('#todolist').append('<div class="form-check"><input class="form-check-input" type="checkbox" value="'+todo.replace('"',"'")+'" id="'+todol+'"><label for="'+todol+'" class="form-check-label">'+todo+'</label></div>'
        )
      }
   }

  var cloneCount = 0;
  $("#todolist input").click(function(){
    const todoItem = $(this).val();
    const todoStatus = $(this).is(':checked');
    console.log("val", todoStatus, todoItem)
    $('#liveToast')
        .clone()
        .attr('id', 'liveToast'+ (++cloneCount))
        .insertAfter('[id^=liveToast]:last') 
          //            ^-- Use '#id' if you want to insert the cloned 
          //                element in the beginning
    $('#liveToast'+cloneCount+' .toast-body').text((todoStatus?'Resolved ':'Opened ') + todoItem); //<--For DEMO
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(document.getElementById("liveToast" + cloneCount));
    toastBootstrap.show()

  }); 


  $("#btnPrevDay").click(function(){
    mydate = addDays(mydate, -1);
    paintLessons(mydate);
  });
  $("#btnNextDay").click(function(){
    mydate = addDays(mydate, 1);
    paintLessons(mydate);
  });


  function convertH2M(timeInHour){
    var timeParts = timeInHour.split(":");
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
  }
  
  var timeInMinutes = convertH2M("14:30");
  console.log(timeInMinutes);

  var startTime = convertH2M(data['startTime']);
  var endTime = convertH2M(data['endTime']);

  function timeFunc() {
    const timeStr =  new Date().toLocaleTimeString('en-US', { hour12: false, 
      hour: "numeric", 
      minute: "numeric"});
    const timeInt = convertH2M(timeStr);
    if (timeInt > endTime) {
      $('#progressBar').removeClass(['progress-bar-striped','progress-bar-animated'])
    } 
    const total = endTime-startTime;
    const current = timeInt-startTime;
    const progressInt = current/total*100;
    const progressPercent = "" + parseInt(progressInt) + "%";
    console.log("time current", timeStr, timeInt, current +"/"+total, progressPercent);  

    $('#progressBar').html(timeStr);
    $('#progressBar').css("width", progressPercent)
  }
  setTimeout(timeFunc, 20000);
  timeFunc();

});

