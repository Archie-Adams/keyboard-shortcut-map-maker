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

  var key = $(this);

  if (activeColour == "") {
    // If a colour button is not selected add new text.
    var currentText = $(key).find(".userText").text();
    var newKeyText = prompt("Please enter new text for the key.", currentText);
    if (newKeyText != null) {
      $(key).find(".userText").text(newKeyText);
    }
  } else {
    // If a colour button is selected change key colour.

    // Remove akk classes containing substring 'key--colour'
    $(key).removeClass(function (index, css) {
      return (css.match(/(^|\s)key--colour\S+/g) || []).join(' ');
    });
    // Add the activeColour.
    if (activeColour != "NONE") {
      $(key).addClass(activeColour);
    }
  }

  // Set key to be pressed for 200ms.
  key.addClass("key--pressed");
  setTimeout(() => { key.removeClass("key--pressed"); }, 200);

});
/* -------------------------------------------------------------------------- */

/* ---------------------------- Colour selection ---------------------------- */
$(document).on("click", ".colourkey", function () {
  var dataKey = $(this).attr('data-key');

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
  if ($(this).hasClass("key--pressed")) {
    $("[data-key*='Colour']").removeClass("key--pressed");
    activeColour = "";
  }
  else {
    $("[data-key*='Colour']").removeClass("key--pressed");
    $(this).addClass("key--pressed");
  }
});
/* -------------------------------------------------------------------------- */


/* ---------------------- Add/Remove element functions. --------------------- */
$(document).on("click", "#AddSectionDivider", function () {
  var template = $(document).find("#templateSectionDivider").clone();
  template.removeAttr('hidden');
  template.removeAttr('id');
  $(template).find('hr').prop('id', 'divider' + new Date().getTime());
  template.appendTo("#KeyboardTable");
});

$(document).on("click", "#AddKeyboard", function () {
  var template = $(document).find("#template10Keyless").clone();
  template.removeAttr('hidden');
  template.removeAttr('id');
  $(template).find('div').prop('id', 'kbd' + new Date().getTime());
  template.appendTo("#KeyboardTable");
});

// TODO: Implement addChordSection()
$(document).on("click", "#AddChordSection", function () {

});

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
$(document).on("click", ".up", function () {
  before = $(this.parentNode).prev();
  $(this.parentNode).insertBefore(before);
});
$(document).on("click", ".down", function () {
  after = $(this.parentNode).next();
  $(this.parentNode).insertAfter(after);
});

// TODO: Implement drag and drop.
/* -------------------------------------------------------------------------- */


/* ---------------------------- Editable headers ---------------------------- */
$(document).on("click", "#loadedFileHeader", function () {
  var currentText = $(this).text().substring(1, $(this).text().length - 5);
  var newText = prompt("Please enter a new filename.", currentText);
  if (newText != null) {
    $(this).text(newText + ".html");
  }
});

$(document).on("click", ".editable:not(#loadedFileHeader)", function () {
  var currentText = $(this).text().substring(1, $(this).text().length);
  var newText = prompt("Please enter a new name.", currentText);
  if (newText != null) {
    $(this).text(newText);
  }
});

$(document).on("mouseover", ".editable", function () {
  $(this).text("✎" + $(this).text());
});
$(document).on("mouseleave", ".editable", function () {
  text = $(this).text();
  if (text[0] == "✎") {
    $(this).text(text.substring(1, text.length));
  }
});
/* -------------------------------------------------------------------------- */


/* -------------------------- Save to HTML function ------------------------- */
function saveToHtml() {

  // Create new document.
  var parser = new DOMParser();
  var outfile = parser.parseFromString("", "text/html");

  // Add comment at head of file telling user how to edit.
  $(outfile).find('html').prepend(
    '<!-- This file was made using: ' +
    'https://archie-adams.github.io/keyboard-shortcut-map-maker/ It can be ' +
    'edited by loading it with the same website. -->');

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

              // TODO: Nested due to async? function timings.

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
              $(outfile).find('li span:not(.userText)').addClass('hidden');
              $(outfile).find('li p').addClass('hidden');


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


/* ---------------------------- New Set Function ---------------------------- */
function newSet() {
  if (confirm('If you start a new set unsaved changes will be lost.')) {
    $(document).find("#KeyboardTable").empty();
    $(document).find(loadedFileHeader).text("New-Set.html");
    $(document).find('#AddKeyboard').click();
  }
}
/* -------------------------------------------------------------------------- */
