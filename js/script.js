var content = document.getElementById('content');
var tbar = document.getElementById('tbar');

window.addEventListener('resize', resize, false);

var angles = [0, 0.194, 0.782, 1.764, 3.134, 4.875, 6.958, 9.339, 11.96, 14.75, 17.627, 20.504, 23.294, 25.915, 28.296, 30.379, 32.12, 33.49, 34.472, 35.06, 35.254];

var centers = [];
var edges = [];

var mousex;
var mousey;

var smallDim;

function readMouse(e) {
    mousex = e.clientX;
    mousey = e.clientY;
}
document.onmousemove = readMouse;

(function () {
    for (var i = 0; i < 21; i++) {
        var time = i * 4;
        var timec = "00";
        if (time < 10) {
            timec += "0";
        }
        timec += time;

        var center = new Image();
        center.src = "img/tbarseq/center" + timec + ".png";
        var edge = new Image();
        edge.src = "img/tbarseq/edge" + timec + ".png";
        centers[i] = center;
        edges[i] = edge;
    }
})();

function calch(angle) {
    angle = (angle) / 180 * Math.PI;
    return Math.cos(angle) * 0.25 + Math.sin(angle) * 2 * Math.sqrt(3);
}

function drawtbar(time, scale) {
    if (time < 0) {
        time = 0;
    } else if (time > 1) {
        time = 1;
    }

    var itime = Math.round((time * 80) / 4);

    var center = centers[itime];
    var edge = edges[itime];

    var imh = scale;
    var imw = imh * center.width / center.height;

    var h = calch(angles[itime]);
    tbar.height = h * 160 * (scale / center.height);

    var simh = scale * edge.height / center.height;
    var simw = (tbar.width - imw) / 2;

    var ctx = tbar.getContext("2d");
    ctx.drawImage(center, simw, (tbar.height - imh) / 2, imw, imh);
    simw *= Math.cos(time * Math.PI / 2);
    var y = (tbar.height - simh) / 2;
    ctx.drawImage(edge, 0, y, simw, simh);
    ctx.drawImage(edge, tbar.width - simw, y, simw, simh);
}

function centerLeft(width) {
    return ((window.innerWidth - width) / 2) + "px";
}

function resize() {
    smallDim = Math.min(window.innerWidth, window.innerHeight);

    tbar.width = window.innerWidth;
    content.style.width = window.innerWidth + "px";
}

resize();

setInterval(function () {
    if (mousex)
    {
        drawtbar(1 - (4 * (mousey - 50) / window.innerHeight), Math.min(smallDim, 250));
    }
    else
    {
        drawtbar(0, Math.min(smallDim, 250));
    }
    content.style.top = tbar.height + "px";
    content.style.height = window.innerHeight - tbar.height -5 + "px";
}, 100);