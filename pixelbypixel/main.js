const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const fpsCounter = document.getElementById('fps')

// to increase performance createImageData method 
// should be executed once e.g. before drawing
let image = context.createImageData(canvas.width, canvas.height);
let data = image.data;

function drawPixel(x, y, color) {
    let roundedX = Math.round(x);
    let roundedY = Math.round(y);

    let index = 4 * (canvas.width * roundedY + roundedX);

    data[index + 0] = color.r;
    data[index + 1] = color.g;
    data[index + 2] = color.b;
    data[index + 3] = color.a;
}

function swapBuffer() {
    context.putImageData(image, 0, 0);
}

function loop(){
    const t0 = performance.now();

    for(var i = 0; i < 160000; ++i) {
        let x = canvas.width * Math.random();
        let y = canvas.height * Math.random();
        let color = {r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255), a: 255};

        drawPixel(x, y, color);
    }

    swapBuffer();
    requestAnimationFrame(loop);

    const t1 = performance.now();
    fpsCounter.innerHTML = Math.floor(t1 - t0) + " ms (frame time)";
}

requestAnimationFrame(loop);
