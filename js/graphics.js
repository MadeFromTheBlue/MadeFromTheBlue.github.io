var sqrt2 = Math.sqrt(2);
var angle = Math.atan2(1, sqrt2);

function draw(canvas) {
    var mw = Math.min(canvas.width, canvas.height);
    var ctx = canvas.getContext('2d');
    ctx.transform(mw / 3, 0, 0, mw / 3, canvas.width / 2, mw / 2);
    ctx.rotate(angle);
    ctx.rect(-1 / 2, -sqrt2 / 2, 1, sqrt2);
    ctx.fillStyle = "#3250FF";
    ctx.fill();
}

(function (draw) {
    var canvas = document.getElementById('canvas');

    window.addEventListener('resize', resize, false);

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw(canvas);
    }
    resize();
})(draw);