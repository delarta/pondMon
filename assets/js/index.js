function addChart() {
  var tblContent;
  var supernodeToken =
    "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbGFydGEiLCJpc19hZG1pbiI6MSwidXNlcl9pZCI6IjVkMTljNDljMzY2YmMxMDAwYjcwYzkwMSIsImVtYWlsIjoiZGVsYXJ0YS50b2tAZ21haWwuY29tIiwiZXhwIjoxNTYyNjY0NTk3fQ.yKSWUtGmJt-KMmkwCbs8JnepWc0VAAZRjDK1OtIAUQo";
  $.ajax({
    type: "GET",
    url:
      "http://iot.tujuhlangit.id:8080/sensordatas/supernode/5d19c559366bc1000b70c902",
    dataType: "json",
    headers: {
      Authorization:
        "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbGFydGEiLCJpc19hZG1pbiI6MSwidXNlcl9pZCI6IjVkMTljNDljMzY2YmMxMDAwYjcwYzkwMSIsImVtYWlsIjoiZGVsYXJ0YS50b2tAZ21haWwuY29tIiwiZXhwIjoxNTYyNTc2NjQ4fQ.lrr60k1JUP6icyHKSZ7MnWe42nwhaDMx7FSquC-QQgk"
    },
    success: function(data) {
      $.each(data.results, function(key, items) {
        if (items.sensorlabel == "TEMP") {
          $("#temp-home").html(items.data.toFixed(2));
          if (items.data < 22) {
            $("#temp-home").css("color", "yellow");
          } else if (items.data >= 22 && items.data <= 27) {
            $("#temp-home").css("color", "green");
          } else if (items.data > 27) {
            $("#temp-home").css("color", "red");
          }
        } else if (items.sensorlabel == "ACID") {
          $("#acid-home").html(items.data.toFixed(2));
          if (items.data < 6.5) {
            $("#acid-home").css("color", "yellow");
          } else if (items.data >= 6.5 && items.data <= 7.5) {
            $("#acid-home").css("color", "green");
          } else if (items.data > 7.5) {
            $("#acid-home").css("color", "crimson");
          }
        } else if (items.sensorlabel == "TURB") {
          $("#turb-home").html(items.data.toFixed(2));
          if (items.data < 25) {
            $("#turb-home").css("color", "yellow");
          } else if (items.data >= 25 && items.data <= 400) {
            $("#turb-home").css("color", "green");
          } else if (items.data > 400) {
            $("#turb-home").css("color", "red");
          }
        } else if (items.sensorlabel == "OXYG") {
          $("#oxyg-home").html(items.data.toFixed(2));
          if (items.data < 5) {
            $("#oxyg-home").css("color", "red");
          } else if (items.data >= 5) {
            $("#oxyg-home").css("color", "rgb(95, 245, 158)");
          }
        }

        tblContent +=
          "<tr>" +
          "<td>" +
          items.sensorlabel +
          "</td>" +
          "<td>" +
          items.data +
          "</td>" +
          "<td>" +
          items.timestamp +
          "</td>";
        ("</tr>");
      });

      $("#tblContent").html(tblContent);
    }
  });

  // Dissolved Oxygen
  $.ajax({
    type: "GET",
    url:
      "http://iot.tujuhlangit.id:8080/sensordatas/supernode/5d19c559366bc1000b70c902/sensor/5d19c589366bc1000b70c903/?page=1",
    headers: {
      Authorization: supernodeToken
    },
    success: data => {
      var oxyg = data.results.map(item => item.data);

      var ctx = document.getElementById("oxygChart");
      var oxygChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          datasets: [
            {
              label: "Oxygen",
              data: oxyg,
              backgroundColor: ["rgba(255, 99, 132, 0.5)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1
            }
          ]
        },
        options: {
          animation: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  fontColor: "#e7e7e7"
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "#e7e7e7"
                }
              }
            ]
          }
        }
      });
    }
  });
  // Acidity
  $.ajax({
    type: "GET",
    url:
      "http://iot.tujuhlangit.id:8080/sensordatas/supernode/5d19c559366bc1000b70c902/sensor/5d19c591366bc1000b70c904/",
    headers: {
      Authorization: supernodeToken
    },
    success: data => {
      var acid = data.results.map(item => item.data);
      var ctx = document.getElementById("acidChart");
      var acidChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          datasets: [
            {
              label: "Oxygen",
              data: acid,
              backgroundColor: ["rgba(255, 99, 132, 0.5)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1
            }
          ]
        },
        options: {
          animation: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  fontColor: "#e7e7e7"
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "#e7e7e7"
                }
              }
            ]
          }
        }
      });
    }
  });
  // Temperature
  $.ajax({
    type: "GET",
    url:
      "http://iot.tujuhlangit.id:8080/sensordatas/supernode/5d19c559366bc1000b70c902/sensor/5d19c5b1366bc1000b70c905/?page=1",
    headers: {
      Authorization: supernodeToken
    },
    success: data => {
      var temp = data.results.map(item => item.data);
      var ctx = document.getElementById("tempChart");
      var tempChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          datasets: [
            {
              label: "Oxygen",
              data: temp,
              backgroundColor: ["rgba(255, 99, 132, 0.5)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1
            }
          ]
        },
        options: {
          animation: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  fontColor: "#e7e7e7"
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "#e7e7e7"
                }
              }
            ]
          }
        }
      });
    }
  });
  // Turbidity
  $.ajax({
    type: "GET",
    url:
      "http://iot.tujuhlangit.id:8080/sensordatas/supernode/5d19c559366bc1000b70c902/sensor/5d19c5b8366bc1000b70c906/?page=1",
    headers: {
      Authorization: supernodeToken
    },
    success: data => {
      var turb = data.results.map(item => item.data);
      var ctx = document.getElementById("turbChart");
      var turbChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          datasets: [
            {
              label: "Oxygen",
              labelColor: "#e8e8e8",
              data: turb,
              backgroundColor: ["rgba(255, 99, 132, 0.5)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1
            }
          ]
        },
        options: {
          animation: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  fontColor: "#e7e7e7"
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "#e7e7e7"
                }
              }
            ]
          }
        }
      });
    }
  });
  //script real-time
  setTimeout(function() {
    addChart();
  }, 5000);
}

$(document).ready(function() {
  addChart();
});
