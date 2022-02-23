// Order of operations
// 1. Create UI
// 2. Draw first SVG
// 3. Event listener actions:
// 3a. Create event listener
// 3b. Update SVG
// 3c. Redraw SVG

const canvasId = 'canvas0',
  defaultSvg = '/assets/sampleSVG.svg',
  inputId = 'text-entry-box',
  objId = 'svg-object',
  textId = 'textID';

const init = () => {
  // Sidebar
  const sidebar = document.createElement('div');
  sidebar.id='ui-wrapper';
  const label = document.createElement('label');
  label.for = inputId;
  label.className = 'ui-element';
  const input = document.createElement('input');
  input.type = 'text';
  input.id = inputId;
  input.className = 'ui-element';
  sidebar.appendChild(label);
  sidebar.appendChild(input);

  // Canvas
  const canvasWrapper = document.createElement('div');
  canvasWrapper.id = 'canvas-wrapper';
  const canvas = document.createElement('canvas');
  canvas.id  = canvasId;
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
}

window.onload = init();
