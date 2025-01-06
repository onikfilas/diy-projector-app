const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('imageInput');
const toolbar = document.getElementById('toolbar');
const overlayOptions = document.getElementById('overlayOptions');
const moveTool = document.getElementById('moveTool');

let img = null;
let scale = 1;
let rotation = 0;
let flipX = 1;
let flipY = 1;
let isMenuVisible = true;
let isMoveToolVisible = false;
let isOverlayOptionsVisible = false;
let currentColor = 'black'; // For invert colors

// Load image
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        drawImage();
      };
    };
    reader.readAsDataURL(file);
  }
});

// Full screen mode
document.getElementById('fullScreen').addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Toggle menu visibility
document.getElementById('toggleMenu').addEventListener('click', () => {
  isMenuVisible = !isMenuVisible;
  toolbar.style.display = isMenuVisible ? 'block' : 'none';
});

// Invert colors
document.getElementById('invertColors').addEventListener('click', () => {
  if (currentColor === 'black') {
    currentColor = 'green';
  } else if (currentColor === 'green') {
    currentColor = 'white';
  } else {
    currentColor = 'black';
  }
  drawImage();
});

// Show/hide move tool
document.getElementById('showMoveTool').addEventListener('click', () => {
  isMoveToolVisible = !isMoveToolVisible;
  moveTool.style.display = isMoveToolVisible ? 'block' : 'none';
});

// Show/hide overlay options
document.getElementById('showOverlays').addEventListener('click', () => {
  isOverlayOptionsVisible = !isOverlayOptionsVisible;
  overlayOptions.style.display = isOverlayOptionsVisible ? 'block' : 'none';
});

// Draw image on canvas
function drawImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(flipX, flipY);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.fillStyle = currentColor;
  ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
  ctx.restore();
}
