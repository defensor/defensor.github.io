$(document).ready(function () {
  let [row = null, col = null] = getArgs()

  if (!isArgsValid(row, col)) {
    // TODO Throw error
    alert("Row or col invalid!")
  } else {
    createTable(row, col)
  }
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
  saveBut.html("Save")
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
  delBut.html("Delete")
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
  textPlacement.html(inputText.val())


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
