console.log("meong");
function addChart() {
    $.ajax({
        url: "http://127.0.0.1:7777/sensor",
        success: function (data) {
            $('#kelembaban-home').html(data[0].turbidity + "<small style='font-size:2rem'>% RH</small>")
            $('#suhu-home').html(data[0].temperature + "<small style='font-size:2rem'>°C</small>")
            $('#karbon-home').html(data[0].dissolvedOxygen + "<small style='font-size:2rem'>ppm</small>")
        },
        cache: false
    });
    //script real-time
    setTimeout(function () {
        addChart();
    }, 1000);
}
// function startTime() {
// 	var today = new Date();
// 	var h = today.getHours();
// 	var m = today.getMinutes();
// 	var s = today.getSeconds();
// 	var d = today.getDate();
// 	var month = today.getMonth()+1;
// 	var year = today.getFullYear();
// 	m = checkTime(m);
// 	s = checkTime(s);
// 	document.getElementById('clock-home').innerHTML = h + ":" + m + ":" + s;
// 	document.getElementById('date-home').innerHTML = d + "/" + month + "/"+ year;
// 	var t = setTimeout(startTime, 500);
// }

// function checkTime(i) {
// 	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
// 	return i;
// }
$(document).ready(function () {
	setTimeout(function(){addChart();},1000);
	// $.ajax({
	// 	url : "/sensor/jam",
	// 	success: function(data){
	// 		// var suhuAvg = to
	// 		$('#suhuMax').html(data[0].maxSuhu + " °C")
	// 		$('#suhuMin').html(data[0].minSuhu + " °C")
	// 		$('#karbonMax').html(data[0].maxKar + " ppm")
	// 		$('#karbonMin').html(data[0].minKar + " ppm")
	// 		$('#kelembabanMax').html(data[0].maxKel + " % RH")
	// 		$('#kelembabanMin').html(data[0].minKel + " % RH")

	// 	}
	});
// 	startTime();
// })