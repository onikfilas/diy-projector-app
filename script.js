const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('imageInput');
const flipHorizontalBtn = document.getElementById('flipHorizontal');
const flipVerticalBtn = document.getElementById('flipVertical');
const rotateBtn = document.getElementById('rotate');
const resetBtn = document.getElementById('reset');

let img = null;
let scale = 1;
let rotation = 0;
let flipX = 1;
let flipY = 1;

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

// Flip horizontally
flipHorizontalBtn.addEventListener('click', () => {
  flipX *= -1;
  drawImage();
});

// Flip vertically
flipVerticalBtn.addEventListener('click', () => {
  flipY *= -1;
  drawImage();
});

// Rotate 90 degrees
rotateBtn.addEventListener('click', () => {
  rotation += 90;
  if (rotation >= 360) rotation = 0;
  drawImage();
});

// Reset image
resetBtn.addEventListener('click', () => {
  scale = 1;
  rotation = 0;
  flipX = 1;
  flipY = 1;
  drawImage();
});

// Draw image on canvas
function drawImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(flipX, flipY);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
  ctx.restore();
}