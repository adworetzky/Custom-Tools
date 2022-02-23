// A SVG editor boiler plate for use as a template interface. Basically a non-designer need to be able to edit the text of SVGs we make in figma and export them as pngs to post places.

setup();

// Main OOP
$(window).on("load", function () {
  //for Angelique: I'm having a lot of trouble with the order of things and what to put event listeners on.
  // I'm fairly sure the order of things is:

  // get the content of the SVG object
  let svgObject = document.getElementById("svg-object").contentDocument;
  console.log(svgObject);

  // create an image that later I can change the src of
  let img = $("<img id=svg-img>");
  img.appendTo("body");

  // Make a change to the original SVG
  changeTextofSVG(svgObject, document.querySelector("#text-entry-box").value);
  $("#text-entry-box").on("input", function () {
    changeTextofSVG(svgObject, document.querySelector("#text-entry-box").value);
  });

  // Generate Blob URL from SVG object
  let url = makeBlobFromSVG(svgObject);

  // Draw an image to the Canvas
  drawImageToCanvas(document.querySelector("#svg-img"));

  // Update that image src as the blob URL
  updateImageSrc(document.querySelector("#svg-img"), url);

  // For the life of me, I can't get it to run. I can change an element of the original SVG. I think my main problem is an async one. I'm not sure when to have things trigger.
});

//Change the Text of my sample svg
function changeTextofSVG(svgObject, string) {
  svgObject.getElementById("textID").textContent = string;
  console.log("Text Changed");
}

// Generate a Blob URL to later use as image.src to load the svg as an imag to the canvas
function makeBlobFromSVG(svgObject) {
  const blob = new Blob([svgObject], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  console.log(url);
  return url;
}

// draw the blob to the canvas
function drawImageToCanvas(image) {
  let c0 = document.querySelector("#canvas0");
  let ctx0 = c0.getContext("2d");

  $("#svg-img").on("load", function () {
    ctx0.drawImage(image, 0, 0, c0.width, c0.height);
  });
  console.log("imageDrawn");
}

// update the "image" src
function updateImageSrc(image, url) {
  image.src = url;
  console.log("src updated");
}

function setup() {
  // Wrappers
  $("<div id=ui-wrapper>").appendTo("main");
  $("<div id=canvas-wrapper>").appendTo("main");
  $("<div id=ti-wrapper>").appendTo("#ui-wrapper");

  // Canvas
  $("<canvas id=canvas0 width=1080 height=1080 >").appendTo("#canvas-wrapper");

  // Inputs
  $("<input type=text class=ui-element id=text-entry-box>").appendTo(
    "#ti-wrapper"
  );
  $("#text-entry-box").before("<label class=ui-element>Text Input</label>");

  // load svg into DOM so it can be accessed
  $(
    "<object id=svg-object data=assets/sampleSVG.svg type=image/svg+xml>"
  ).appendTo("#ui-wrapper");
}
