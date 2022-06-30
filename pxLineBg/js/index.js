'use strict';
console.clear();
var lineLength = 8, lineWeight = 2, minAxisPoints = 70;
var bgColor = '#FFF', lineColor = '#199', points;
var setup = function () {
    createCanvas(window.innerWidth, window.innerHeight);
    //createCanvas(1920, 1080);
    stroke(lineColor);
    strokeWeight(lineWeight);
    fill(lineColor);
    var spacing = Math.min(window.innerWidth, window.innerHeight) / minAxisPoints;
    points = [];
    for (var i = 0; i < width; i += spacing) {
        for (var j = 0; j < height; j += spacing) {
            points.push([i, j]);
        }
    }
};
var draw = function () {
    background(bgColor);
    for (var i = 0; i < points.length; i++) {
        var n = noise(points[i][0] * 0.008, points[i][1] * 0.008, frameCount * 0.003);
        if (n > 0.5) {
            stroke(lineColor);
            var x0 = void 0, y0 = void 0, x1 = void 0, y1 = void 0;
            // do some stuff conditionally maybe?
            x0 = points[i][0] - lineLength;
            y0 = points[i][1] + lineLength;
            x1 = points[i][0] + lineLength;
            y1 = points[i][1] - lineLength;
            line(x0, y0, x1, y1);
        }
        else {
            noStroke();
            var w = map(n, 0, 0.5, 0, 1.3) * lineWeight;
            ellipse(points[i][0], points[i][1], w, w);
        }
    }
};