window.addEventListener('resize', resize, false);
window.addEventListener('scroll', scroll);

//var angles = [0, 0.194, 0.782, 1.764, 3.134, 4.875, 6.958, 9.339, 11.96, 14.75, 17.627, 20.504, 23.294, 25.915, 28.296, 30.379, 32.12, 33.49, 34.472, 35.06, 35.254];
var tbarhs = [0.25, 0.261728, 0.297255, 0.356516, 0.439013, 0.543483, 0.667806, 0.808825, 0.962435, 1.12373, 1.28726, 1.44754, 1.5995, 1.7388, 1.8622, 1.96753, 2.05358, 2.11996, 2.16679, 2.19454, 2.20364];

var centers = [];
var edges = [];

var smallDim;

var tbarheight = 250;
var tbarcimheight = 312;
var tbarcimfheight = 352.6;

(function () {
    for (var i = 0; i < tbarhs.length; i++) {
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

function drawtbar() {
    var tbar = $('#tbar')[0];

    var pos = document.body.scrollTop;
    var time = 0;

    function objecttopx(x) {
        return x * 160 * (tbarheight / tbarcimfheight);
    }

    tbar.height = Math.max(tbarheight - pos, objecttopx(0.25));
    tbar.style.top = pos + "px";

    if (tbar.height <= objecttopx(tbarhs[0])) {
        time = 0;
    } else if (tbar.height >= objecttopx(tbarhs[tbarhs.length - 1])) {
        time = tbarhs.length - 1;
    } else {
        while (true) {
            if (tbar.height < (objecttopx(tbarhs[time]) + objecttopx(tbarhs[time + 1])) / 2) {
                break;
            } else {
                time++;
            }
        }
    }

    var center = centers[time];
    var edge = edges[time];

    var imh = tbarheight;
    var imw = imh * center.width / center.height;

    var simh = tbarheight * edge.height / center.height;
    var simw = (tbar.width - imw) / 2;

    var ctx = tbar.getContext("2d");
    ctx.drawImage(center, simw, (tbar.height - imh) / 2, imw, imh);
    simw *= Math.cos(time / (tbarhs.length - 1) * Math.PI / 2);
    var y = (tbar.height - simh) / 2;
    ctx.drawImage(edge, 1, 0, edge.width - 2, edge.height, 0, y, simw, simh);
    ctx.drawImage(edge, 1, 0, edge.width - 2, edge.height, tbar.width - simw, y, simw, simh);
}

function scroll() {
    drawtbar();
}

function resize() {
    var tbar = $('#tbar');
    var width = $('body').innerWidth();

    tbar[0].width = width;

    var contentbox = $('#content_box');
    contentbox.css('width', width + 'px');
    contentbox.css('top', tbarheight + 'px');
    contentbox.css('height', window.innerHeight * 2 + 'px');

    var content = $('#content');
    var marg = 20;
    content.css('margin', width - 2 * marg + 'px');
    content.css('margin', marg + 'px');

    scroll();
}

resize();

centers[centers.length - 1].addEventListener("load", drawtbar, false);