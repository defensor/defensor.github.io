$(document).ready(function () {
  $("#createTableBtn").click(goToTable)
})

function goToTable() {
  let col = $("#inputColumnNumber").val()
  let row = $("#inputRowNumber").val()

  if (col < 1 || col > 999 || row < 1 || row > 999) {
    $("#createTableErrorModalBox").modal("show")
  }
  else {
    window.location.href = `table.html?row=${row}&col=${col}`
  }
}
