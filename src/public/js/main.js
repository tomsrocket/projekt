
const dataKey = "APPDATA";

console.log("TEST2")

$(document).ready(function(){

  const rawdata = localStorage.getItem(dataKey);
  const data = JSON.parse(rawdata);
  $.each(data, function (key, value) { 
    console.log("set", key, value)
    $(".var-"+key).html(value);
  });
  //  return data.length

  const mydate = new Date();
  const options = { weekday: "long" };
  const weekday = new Intl.DateTimeFormat("en-US", options).format(mydate);
  $(".vv-weekday").html(weekday);
  console.log("weekday", weekday)

  const lessons = data["timetable-1"];
  const lessonlist = lessons.split(",");
  var currentLession = 0; 
  for (const lesson of lessonlist) {
    console.log("lesson", lesson);
    $('#lessontable').append('<tr class="mint"><td>' + (++currentLession) + '</td><td>' + lesson + '</td></tr>')
    if (currentLession==6) {
        $('#lessontable').append('<tr class="table-secondary"><td>' + (++currentLession) + '</td><td>Lunch Break</td></tr>')
    }
  }

  const todolist = data["todolist"];
  const todos = todolist.split("\n");
  var currentTodo = 0
  for (const todo of todos) {
    if (todo) {
      const todol = "todo" + (++currentTodo)
      console.log("todo", todo, todol);
      $('#todolist').append('<div class="form-check"><input class="form-check-input" type="checkbox" value="'+todol+'" id="'+todol+'"><label for="'+todol+'" class="form-check-label">'+todo+'</label></div>'
        )
      }
   }


});

