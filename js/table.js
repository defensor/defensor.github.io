$(document).ready(function () {
  let [row = null, col = null] = getArgs()

  if (!isArgsValid(row, col)) {
    showError()
  } else {
    createTable(row, col)
  }

  // Set event handlers
  $("#tableStyleCard form").change(controlButtonUpdate)
  $("#applyStyleBtn").click(changeTableStyle)

  $("#applyCaptionBtn").click(changeTableCaption)

  $("#tableRemovingCard input[type=radio][name=removeTypeChoiseRadios]").change(changeRemovingType)
  $("#removeRowColBtn").click(removeRowOrCol)

  $("#magicBtn").click(randomChoice)

  $("#clearBtn").click(clearTableFields)
})

// Get number of rows and columns from url
function getArgs() {
  let url = new URL(window.location)
  let args = url.searchParams

  if (args.has("row") && args.has("col")) {
    return [args.get("row"), args.get("col")]
  }

  return []
}

// Create initial table with specified number of rows and columns
function createTable(rowNum, columnNum) {
  let table = $('#datatable')

  // Create header
  let header = $("#datatable>thead>tr")

  header.append('<th scope="col">#</th>')
  for (let i = 0; i < columnNum; i++) {
    header.append(`<th scope="col">${toLetters(i + 1)}</th>`)
  }

  // Create body
  for (let i = 0; i < rowNum; i++) {
    let row = $("<tr>")
    row.append(`<th scope="row">${i + 1}</th>`)
    for (let j = 0; j < columnNum; j++) {
      data = tableData()
      row.append(data)
    }
    table.append(row)
  }
}

// Create td with form inside
function tableData() {
  let data = $("<td>")

  let form = $("<form>")

  // text input
  let inputTextDiv = $("<div>")
  inputTextDiv.attr("class", "form-group")

  let inputText = $("<input>")
  inputText.attr("type", "text")
  inputText.attr("class", "form-control text-input")
  inputText.attr("placeholder", "Enter text")

  inputTextDiv.append(inputText)

  form.append(inputTextDiv)

  // save button
  let saveBut = $("<button>")
  saveBut.attr("type", "button")
  saveBut.attr("class", "btn btn-success save-button")
  saveBut.append($("<span class='glyphicon glyphicon-floppy-disk'></span>"))
  saveBut.click(function () { saveText(form) })

  form.append(saveBut)

  // text placement
  let textPlacement = $("<p>")
  textPlacement.attr("class", "text-placement")
  textPlacement.click(function () { editText(form) })
  textPlacement.hide()

  form.append(textPlacement)

  // delete button
  let delBut = $("<button>")
  delBut.attr("type", "button")
  delBut.attr("class", "btn btn-danger delete-button")
  delBut.append($("<span class='glyphicon glyphicon-trash'></span>"))
  delBut.click(function () { deleteText(form) })
  delBut.hide()

  form.append(delBut)

  // finish
  data.append(form)

  return data
}

// Return letters representation of numbers
function toLetters(num) {
  let mod = num % 26
  let pow = num / 26 | 0
  let out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z')

  return pow ? toLetters(pow) + out : out
}

// Return numbers representation of letters
function toNumbers(word) {
  let num = 0
  let len = word.length - 1

  for (let letter in word) {
    num += (word.charCodeAt(letter) - 64) * (26 ** len)
    len--
  }

  return num
}

// Hide input and save button and show text and delete button
function saveText(form) {
  // get input form elements
  let inputText = form.find(".text-input")
  let saveBut = form.find(".save-button")


  // hide input form elements
  inputText.hide()
  saveBut.hide()

  // get delete form elements
  let textPlacement = form.find(".text-placement")
  let delBut = form.find(".delete-button")

  // set new text
  textPlacement.text(inputText.val())


  // show delete form elements
  textPlacement.show()
  delBut.show()
}


// Hide delete form and show clear input form
function deleteText(form) {
  // get delete form element
  let textPlacement = form.find(".text-placement")
  let delBut = form.find(".delete-button")

  // hide delete form elements
  textPlacement.hide()
  delBut.hide()

  // get input form elements
  let inputText = form.find(".text-input")
  let saveBut = form.find(".save-button")

  // clean input textarea
  inputText.val("")

  // show input form elements
  inputText.show()
  saveBut.show()
}

// Hide delete form and show input form with current text
function editText(form) {
  // get delete form element
  let textPlacement = form.find(".text-placement")
  let delBut = form.find(".delete-button")

  // hide delete form elements
  textPlacement.hide()
  delBut.hide()

  // get input form elements
  let inputText = form.find(".text-input")
  let saveBut = form.find(".save-button")

  // show input form elements
  inputText.show()
  saveBut.show()
}

// Get-arguments validation
function isArgsValid(rowNum, columnNum) {
  if (rowNum == null || columnNum == null)
    return false

  if (!$.isNumeric(rowNum) || !$.isNumeric(columnNum))
    return false

  if (rowNum <= 0 || rowNum > 999)
    return false

  if (columnNum <= 0 || columnNum > 999)
    return false

  return true
}

// Update button caption with actual form fields info
function controlButtonUpdate() {
  let form = $("#tableStyleCard form")
  let button = $("#applyStyleBtn")

  let width = form.find("input").val()
  let style = form.find('select').val()

  let buttonCaption = "Apply"

  if (!!width) {
    buttonCaption += ` ${width}px`
    if (width < 1 || width > 999) {
      button.prop("disabled", true)
      $("#changeWidthErrorModalBox").modal("show")
    }
    else {
      button.prop("disabled", false)
    }
  }

  if (style != "default") {
    if (buttonCaption == "Apply")
      buttonCaption += ` border ${style}`
    else
      buttonCaption += ` and border ${style}`
  }

  button.text(buttonCaption)
}

// Apply new table style settings
function changeTableStyle() {
  let form = $("#tableStyleCard form")

  let width = form.find("input").val()
  let style = form.find('select').val()


  if (!!width) {
    $("#datatable").css({ "width": width })
  }

  if (style != "default") {
    $("#datatable").css({ "border": style })
  }
}

// Change table caption header
function changeTableCaption() {
  $("#datatable caption h1").text($("#tableCaptionCard input").val())
}

// Change active fields according to radios
function changeRemovingType() {
  let rowIn = $("#tableRemoveRowControl")
  let colIn = $("#tableRemoveColumnControl")

  if (this.value == "row") {
    rowIn.prop("disabled", false)
    colIn.prop("disabled", true)
  } else {
    rowIn.prop("disabled", true)
    colIn.prop("disabled", false)
  }
}

// Remove row or column in the datatable
function removeRowOrCol() {
  let type = $("#tableRemovingCard :radio[name=removeTypeChoiseRadios]:checked").val()

  if (type == "row")
    removeRow()
  else
    removeColumn()
}

// Remove row in the datatable
function removeRow() {
  let rowNum = $("#tableRemoveRowControl").val()

  if (rowNum < 1 || rowNum > ($("#datatable").find("tr").length - 1)) {
    $("#removeRowErrorModalBox").modal('show')
  }
  else {
    $("#datatable tr").eq(rowNum).remove()
    refreshRowNumbers()
  }
}

// Remove column in the datatable
function removeColumn() {
  let colNum = toNumbers($("#tableRemoveColumnControl").val().toUpperCase())

  if (colNum < 1 || colNum > ($("#datatable tr:first").find("th").length - 1)) {
    $("#removeColumnErrorModalBox").modal('show')
  }
  else {
    $("#datatable tr").each(function () {
      $(this).find("th,td").filter(`:eq(${colNum})`).remove()
    })
    refreshColumnCodes()
  }
}

// Create some *magic*
function randomChoice() {
  let table = $("#datatable")
  let row = Math.floor(Math.random() * (table.find("tr").length - 1)) + 1
  let col = Math.floor(Math.random() * table.find("tr:eq(1)").find("td").length)
  let elem = table.find(`tr:eq(${row})`).find(`td:eq(${col})`)

  let color = '#' + Math.floor(Math.random() * 16777215).toString(16)
  let fontSize = 15 + Math.floor(Math.random() * (25 - 15))

  let method = Math.floor(Math.random() * 4);
  if (method == 0) {
    elem.css("background-color", color)
  } else if (method == 1) {
    elem.css("color", color)
  } else if (method == 2) {
    elem.css("font-size", parseFloat(fontSize) + "pt")
  } else if (method == 3) {
    deleteText(elem.find("form"))
  }

}

// Clean table field
function clearTableFields() {
  $("#datatable form").each(function () {
    deleteText($(this))
  })
}

function showError() {
  $("#args_invalid_alert").removeAttr("hidden")
  $("#datatable").attr("hidden", true)
  $("#controls").attr("hidden", true)
}

function refreshRowNumbers() {
  let i = 1;
  $("#datatable tr:gt(0)").each(function () {
    $(this).find("th").text(i++)
  })
}

function refreshColumnCodes() {
  let i = 1;
  $("#datatable tr:first").find("th:gt(0)").each(function () {
    $(this).text(toLetters(i++))
  })
}
