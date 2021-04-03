/* -------------------------------------------------------------------------- */
/*                                   main.js                                  */
/* -------------------------------------------------------------------------- */
/*                            Author: Archie Adams                            */
/* -------------------------------------------------------------------------- */
/*                             TODO: Description.                             */
/* -------------------------------------------------------------------------- */


/* --------------------------- Handle keypresses. --------------------------- */
$(document).on("click", ".key", function () {

  var dataKey = $(this).attr('data-key');

  var keyboardId = $(this).parent().parent().parent().attr('id');
  var keyboard = $(document).find("#" + keyboardId);
  var key;

  if (keyboardId != undefined) {
    // Find key on specific keyboard.
    key = $(keyboard).find("[data-key=" + dataKey + "]")
  } else {
    // A manu key, not on a keyboard.
    key = $("[data-key=" + dataKey + "]");

    // Check for a colour selection button.
    if (dataKey.includes("Colour")) {
      // Currently does nothing.
      // Could be a colour pallet, or allow custom selection of colours in the
      // future.
    }
    // Check for a main menu button.
    else if (dataKey.includes("Main")) {
      switch (key.attr('data-key')) {
        case "MainLoadTxt":
          break;
        case "MainNewSet":
          break;
        case "MainSaveTxt":
          break;
        case "MainSavePng":
          break;
        case "MainSaveHTML":
          break;
        case "MainPrint":
          window.print();
          break;
      }
    }
    // Check add element keys.
    else if (dataKey == "AddSectionDivider") {
      addSectionDivider();
    }
    else if (dataKey == "AddKeyboard") {
      addKeyboard();
    }
    else if (dataKey == "AddChordSection") {
      addChordSection();
    }
  }

  animate(key)
});
/* -------------------------------------------------------------------------- */


/* ----------------------------- Key animations. ---------------------------- */
function animate(key) {
  // Do not animate key if disabled.
  if (key.hasClass("key--disabled")) {
    return;
  }

  // Set key to be pressed for 200ms.
  key.addClass("key--pressed");
  setTimeout(() => { key.removeClass("key--pressed"); }, 200);
}
/* -------------------------------------------------------------------------- */


/* ---------------------- Add/Remove element functions. --------------------- */
// TODO: Implement addSectionDivider()
function addSectionDivider() { }

function addKeyboard() {
  var template = $(document).find("#template").clone();
  template.removeAttr('hidden');
  template.removeAttr('id');
  listLen = $("#KeyboardTable li").length + 1;
  $(template).find('div').prop('id', 'kbd' + listLen);
  template.appendTo("#KeyboardTable");
}

// TODO: Implement addChordSection()
function addChordSection() { }

function removeSectionDivider(SectionDividerLi) {
  if (confirm('Are you sure you want to delete this section divider?')) {
    SectionDividerLi.remove();
  }
}
function removeKeyboard(keyboardLi) {
  if (confirm('Are you sure you want to delete this keyboard?')) {
    keyboardLi.remove();
  }
}
function removeChordSection(ChordLi) {
  if (confirm('Are you sure you want to delete this chord section?')) {
    ChordLi.remove();
  }
}
/* -------------------------------------------------------------------------- */


/* ------------------------ List ordering functions. ------------------------ */
$.fn.moveUp = function () {
  before = $(this).prev();
  $(this).insertBefore(before);
};

$.fn.moveDown = function () {
  after = $(this).next();
  $(this).insertAfter(after);
};

// TODO: Implement drag and drop.
/* -------------------------------------------------------------------------- */
