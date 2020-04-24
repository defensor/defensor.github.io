$(document).ready(function () {
  $("#createTableBtn").click(goToTable)
})

function goToTable() {
  let col = $("#inputColumnNumber").val()
  let row = $("#inputRowNumber").val()

  window.location.href = `table.html?row=${row}&col=${col}`
}
