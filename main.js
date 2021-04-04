/* -------------------------------------------------------------------------- */
/*                                   main.js                                  */
/* -------------------------------------------------------------------------- */
/*                            Author: Archie Adams                            */
/* -------------------------------------------------------------------------- */
/*                             TODO: Description.                             */
/* -------------------------------------------------------------------------- */

activeColour = "";

/* --------------------------- Handle keypresses. --------------------------- */
$(document).on("click", ".key", function () {

  var dataKey = $(this).attr('data-key');

  var keyboardId = $(this).parent().parent().parent().attr('id');
  var keyboard = $(document).find("#" + keyboardId);
  var key;
  var animateKey = true;

  if (keyboardId != undefined) {
    // Find key on specific keyboard.
    key = $(keyboard).find("[data-key=" + dataKey + "]")

    if (activeColour == "") {
      // If a colour button is not selected add new text.
      var currentText = $(key).find(".userText").text();
      var newKeyText = prompt("Please enter new text for the key.", currentText);
      if (newKeyText != null) {
        $(key).find(".userText").text(newKeyText);
      }
    } else {
      // If a colour button is selected change key colour.

      // 1) remove akk classes containing substring 'key--colour'
      $(key).removeClass(function (index, css) {
        return (css.match(/(^|\s)key--colour\S+/g) || []).join(' ');
      });

      if (activeColour != "NONE") {
        $(key).addClass(activeColour);
      }
    }

  } else {
    // A menu key, not on a keyboard.
    key = $("[data-key=" + dataKey + "]");

    // TODO: Add a .colourkey and an event listen function, remove complexity from above.
    // Check for a colour selection button.
    if (dataKey.includes("Colour")) {
      switch (dataKey) {
        case "ColourCoral":
          activeColour = "key--colour--coral";
          break;
        case "ColourBlue":
          activeColour = "key--colour--blue";
          break;
        case "ColourNavy":
          activeColour = "key--colour--navy";
          break;
        case "ColourGreen":
          activeColour = "key--colour--green";
          break;
        case "ColourOrange":
          activeColour = "key--colour--orange";
          break;
        case "ColourNone":
          activeColour = "NONE";
          break;
      }
      // Creates a toggle effect for each colour button.
      if (key.hasClass("key--pressed")) {
        $("[data-key*='Colour']").removeClass("key--pressed");
        activeColour = "";
      }
      else {
        $("[data-key*='Colour']").removeClass("key--pressed");
        key.addClass("key--pressed");
      }
      animateKey = false;
    }

    // Check for a main menu button.
    else if (dataKey.includes("Main")) {
      switch (key.attr('data-key')) {
        // TODO: Probably un-needed. REMOVE
        // Have a .menukey, .key on the key class so this function is not ran
        // when menu keys are used.
        case "MainLoadHtml":
          break;
        case "MainNewSet":
          break;
        case "MainSavePng":
          break;
        case "MainSaveHTML":

          break;
        case "MainPrint":
          // TODO: Have as onclick JS
          window.print();
          break;
      }
    }

    // Check add element keys.
    // TODO: Change to event listeners on the functions.
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

  if (animateKey) {
    animate(key)
  }
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


/* -------------------------- Save to HTML function ------------------------- */
function saveToHtml() {

  // Create new document.
  var parser = new DOMParser();
  var outfile = parser.parseFromString("", "text/html");

  // TODO: Comment to say/link where made and where can be edited.

  // Add all meta tags to the head.
  $('head').find('meta').appendTo($(outfile).find('head'));

  // Add title to the head.
  title = $(document).find('#loadedFileHeader').text();
  $(outfile).find('head').append("<title>" + title + "</title>");

  // Add css styling to the head.
  $.when($.get("site.css"))
    .done(function (response) {
      $('<style />').text(response).appendTo($(outfile).find('head'));
      $.when($.get("keyboard.css"))
        .done(function (response) {
          $('<style />').text(response).appendTo($(outfile).find('head'));
          $.when($.get("key-colours.css"))
            .done(function (response) {
              $('<style />').text(response).appendTo($(outfile).find('head'));

              // FIXME: Nested due to async? function timings.

              // Create the header.
              $(outfile).find('head').after('<header></header>');
              $('header').find('h1').clone().appendTo($(outfile).find('header'));
              $('header').find('h2').clone().appendTo($(outfile).find('header'));
              $(outfile).find('header').append('<div style=" padding-top: 1px;"></div>');

              // Create the body.
              $(outfile).find('body').append('<div style=" margin-top: 30px;" class="top-padding-50px"></div>');
              $(outfile).find('body').append('<div class="bodyStyle"></div>');
              $(outfile).find('.bodyStyle').append($(document).find('#KeyboardTable').clone());

              // Visually remove UI from keyboards.
              $(outfile).find('li span').addClass('hidden');
              $(outfile).find('li p').addClass('hidden');

              // console.log(outfile);

              // Create and download the file
              let data = new XMLSerializer().serializeToString(outfile);
              const textToBLOB = new Blob([data], { type: 'text/html' });
              let newLink = document.createElement("a");
              newLink.download = title;

              if (window.webkitURL != null) {
                newLink.href = window.webkitURL.createObjectURL(textToBLOB);
              }
              else {
                newLink.href = window.URL.createObjectURL(textToBLOB);
                newLink.style.display = "none";
                document.body.appendChild(newLink);
              }

              newLink.click();
            });
        });
    });

}
/* -------------------------------------------------------------------------- */


/* --------------------------- Load HTML Function --------------------------- */
$(document).on("change", "#inputfile", function () {

  // Clear the current keyboard list.
  $(document).find("#KeyboardTable").empty();

  var fr = new FileReader();
  fr.onload = function () {

    // Set the document keyboard list to the read in keyboard list.
    var string = fr.result;
    var object = $('<div/>').html(string).contents();
    $(document).find("#KeyboardTable").html(object.find("#KeyboardTable").html());

    // Unhide the controls on the keyboards.
    $(document).find("#KeyboardTable li span").removeClass('hidden');
    $(document).find("#KeyboardTable li p").removeClass('hidden');
  }
  fr.readAsText(this.files[0]);
})
/* -------------------------------------------------------------------------- */

