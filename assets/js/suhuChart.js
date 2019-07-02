var _url = "/sensor";
    var dpSuhu = [];
    var dpKelembaban = [];
    var dpKarbon = [];
    var lblSuhu = [];
    var lblKelembaban = [];
	var lblKarbon = [];
	var tblHistory = '';
	var suhuMax = '';
	var suhuMin = '';
	var nomor = 1;
	// function updateChart(){
	function addChart(){
		// $.ajax({url: "", success: })
	$.ajax({
		url : "http://127.0.0.1:7777/sensor", 
		success: function(data){
		//HISTORY
			$.each(data, function(key, items){
				
				tblHistory += "<tr>"
							+ "<td>"+ nomor +"</td>"
							+ "<td>"+ items.suhu +"</td>"
							+ "<td>"+ items.kelembaban +"</td>"
							+ "<td>"+ items.karbon +"</td>"
							+ "<td>"+ new Date(items.datetime) +"</td>"
							"</tr>";
				nomor++
			})

			$('#tbl-history').html(tblHistory)

			for (var i = 0; i < data.length; i++) {
				dpSuhu.push(
					data[i].suhu
				);
				lblSuhu.push(
					new Date(data[i].datetime).getSeconds()
				);
				if (dpSuhu.length > 10 )
				{
					dpSuhu.shift();
					lblSuhu.shift();				
				}
			}
			// console.log(lblSuhu);
			let chartTemp = document.getElementById('chartSuhu').getContext('2d');

			let popChartTemp = new Chart(chartTemp,{
				type:'line',
				data:{
					labels:lblSuhu,
					datasets:[{
						label: 'Suhu',
						data: dpSuhu,
						backgroundColor:'rgba(255, 159, 64, 0.6)'
					}
					]
				},
				options:{
					animation:{
						duration:0
					},
					scales: {
						yAxes: [{
							display: true,
							ticks: {
								min: 0,    
								max:100,
								stepSize:10
							}
						}],
						xAxes: [{
							ticks: {
								fontSize: 18
							}
						}]
					}
				}
			});

			$('#suhu-home').html(data[0].suhu)

			popChartTemp.update(); 	
		},
		cache:false
	});
	
	//script real-time
	  setTimeout(function(){addChart();},1000);

	}


$(document).ready(function () {
	setTimeout(function(){addChart();},1000);
	// $.ajax({
	// 	url : "/sensor/jam",
	// 	success: function(data){
	// 		$('#suhuMax').html(data[0].maxSuhu)
	// 		$('#suhuMin').html(data[0].minSuhu)
	// 		// agar angka setelah koma dibatasi 2, menggunakan toFixed
	// 		$('#suhuAvg').html(data[0].avgSuhu.toFixed(2))
	// 		console.log(suhuMax)
	// 	}
	// });
})
