// Order of operations
// 1. Create UI
// 2. Draw first SVG
// 3. Event listener actions:
// 3a. Create event listener
// 3b. Update SVG
// 3c. Redraw SVG

const canvasId = 'canvas0',
  defaultSvg = './assets/sampleSVG.svg',
  inputId = 'text-entry-box',
  objId = 'svg-object',
  textId = 'textID';

const init = () => {
  // Sidebar
  const sidebar = document.createElement('div');
  sidebar.id = 'ui-wrapper';
  const label = document.createElement('label');
  label.for = inputId;
  label.innerHTML = 'Text Input';
  label.className = 'ui-element';
  const input = document.createElement('input');
  input.type = 'text';
  input.id = inputId;
  input.className = 'ui-element';
  const saveButton = document.createElement('button');
  saveButton.id = 'save-button';
  saveButton.innerHTML = 'Save';
  sidebar.appendChild(label);
  sidebar.appendChild(input);
  sidebar.appendChild(saveButton);

  // Canvas
  const canvasWrapper = document.createElement('div');
  canvasWrapper.id = 'canvas-wrapper';
  const canvas = document.createElement('canvas');
  canvas.id = canvasId;
  canvas.width = 1080;
  canvas.height = 1080;
  canvasWrapper.appendChild(canvas);

  // Object
  const obj = document.createElement('object');
  obj.id = objId;
  obj.type = 'image/svg+xml';
  obj.data = defaultSvg;

  // Update DOM
  document.querySelector('main').appendChild(sidebar);
  document.querySelector('main').appendChild(canvasWrapper);
  document.querySelector('body').appendChild(obj);
  saveButton.onclick = function () {
    const link = document.createElement('a');
    let d = new Date(),
      h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
      m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(),
      s = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
    link.download = 'Export-' + h + '.' + m + '.' + s + '.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  };
  updateDrawing.init();
};

const updateDrawing = {
  init: function () {
    const svg = document.getElementById(objId);

    // wait for this to fully load, then update the canvas element
    svg.addEventListener('load', () => {
      updateDrawing.updateCanvas(svg.contentDocument.querySelector('svg'));
    });
    updateDrawing.listener();
  },
  listener: function () {
    const inputEl = document.getElementById(inputId);
    inputEl.addEventListener('input', () => {
      // console.log(inputEl.value);
      updateDrawing.updateSvg(inputEl.value);
    });
  },
  updateSvg: function (newText) {
    const svg = document.getElementById(objId).contentDocument;
    const text = svg.getElementById(textId);
    // this replaces the existing text with whatever is passed into to the updateDrawing.updateSvg function
    text.textContent = newText;
    // and then updates the canvas to match
    updateDrawing.updateCanvas(svg.querySelector('svg'));
  },
  updateCanvas: function (svg) {
    svg = makeBlobFromSVG(svg);
    let c0 = document.getElementById(canvasId);
    let ctx0 = c0.getContext('2d');
    const image = new Image();
    image.addEventListener(
      'load',
      () => {
        ctx0.drawImage(image, 0, 0, c0.width, c0.height);
      },
      false
    );
    image.src = svg;
  },
};

// Generate a Blob URL to later use as image.src to load the svg as an imag to the canvas
function makeBlobFromSVG(svg) {
  const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  return url;
}
function saveCanvas(canvas) {}

window.onload = init();
