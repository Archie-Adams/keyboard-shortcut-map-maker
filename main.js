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
        case "MainLoadHtml":
          break;
        case "MainNewSet":
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
  // CSS from site.css

  // .bodyStyle {
  //   width:1109px; 
  //   margin:0 auto;
  // }
  // h1 {
  //   text-align: center;
  //   padding-top: 20px;
  //   font-size: 48px;
  //   font-weight: 500;
  // }
  // h2 {
  //   font-size: 24px;
  //   margin-bottom: 7px;
  // }
  // h3 {
  //   font-size: 20px;
  // }

  // All css from keyboard and keyboard-colours

  // var GetFileBlobUsingURL = function (url, convertBlob) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.open("GET", url);
  //   xhr.responseType = "blob";
  //   xhr.addEventListener('load', function () {
  //     convertBlob(xhr.response);
  //   });
  //   xhr.send();
  // };

  // var blobToFile = function (blob, name) {
  //   blob.lastModifiedDate = new Date();
  //   blob.name = name;
  //   return blob;
  // };

  // var GetFileObjectFromURL = function (filePathOrUrl, convertBlob) {
  //   GetFileBlobUsingURL(filePathOrUrl, function (blob) {
  //     convertBlob(blobToFile(blob, 'testFile.jpg'));
  //   });
  // };
  // var FileURL = "site.css"
  // GetFileObjectFromURL(FileURL, function (fileObject) {
  //   // console.log(fileObject);
  //   var frSite = new FileReader();
  //   frSite.onload = function () {
  //     console.log(frSite.result);
  //   }

  //   frSite.readAsText(fileObject);
  // });


  $.when($.get("site.css"))
    .done(function (response) {
      console.log(response);
      // $('<style />').text(response).appendTo($('head'));
      // $('div').html(response);
    });



}
/* -------------------------------------------------------------------------- */

/* --------------------------- Load HTML Function --------------------------- */
$(document).on("change", "#inputfile", function () {

  // Clear the current list.
  $(document).find("#KeyboardTable").empty();

  var fr = new FileReader();
  fr.onload = function () {

    var string = fr.result;
    var object = $('<div/>').html(string).contents();
    $(document).find("#KeyboardTable").html(object.find("#KeyboardTable").html());

    // Could just leave controls on and apply hidden class to them, unhide on load.
    // Now need to add controls to the keyboards.
  }

  // console.log(this.files);
  fr.readAsText(this.files[0]);
})
/* -------------------------------------------------------------------------- */

