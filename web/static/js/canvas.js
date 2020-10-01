
class Brug {
    constructor(p, r) {
        this.points = p;
        this.rijbanen = r;
        this.multiplier = 50;
    }

    draw(ctx, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(Math.round(this.points[0].y * this.multiplier), Math.round(this.points[0].x * this.multiplier));
        ctx.lineTo(Math.round(this.points[1].y * this.multiplier), Math.round(this.points[1].x * this.multiplier));
        ctx.lineTo(Math.round(this.points[2].y * this.multiplier), Math.round(this.points[2].x * this.multiplier));
        ctx.lineTo(Math.round(this.points[3].y * this.multiplier), Math.round(this.points[3].x * this.multiplier));
        ctx.closePath();
        ctx.fill();

        var i;
        for (i = 0; i<this.rijbanen.length; i++) {
            ctx.strokeStyle = "black"
            ctx.beginPath();
            ctx.moveTo(Math.round(this.rijbanen[i].points[0].y * this.multiplier), Math.round(this.rijbanen[i].points[0].x * this.multiplier));
            ctx.lineTo(Math.round(this.rijbanen[i].points[1].y * this.multiplier), Math.round(this.rijbanen[i].points[1].x * this.multiplier));
            ctx.lineTo(Math.round(this.rijbanen[i].points[2].y * this.multiplier), Math.round(this.rijbanen[i].points[2].x * this.multiplier));
            ctx.lineTo(Math.round(this.rijbanen[i].points[3].y * this.multiplier), Math.round(this.rijbanen[i].points[3].x * this.multiplier));
            ctx.closePath();
            ctx.stroke();
            var j;
            for (j = 0; j<this.rijbanen[i].rijstroken.length; j++) {
                ctx.strokeStyle = "black"
                ctx.beginPath();
                ctx.moveTo(Math.round(this.rijbanen[i].rijstroken[j].points[0].y * this.multiplier), Math.round(this.rijbanen[i].rijstroken[j].points[0].x * this.multiplier));
                ctx.lineTo(Math.round(this.rijbanen[i].rijstroken[j].points[1].y * this.multiplier), Math.round(this.rijbanen[i].rijstroken[j].points[1].x * this.multiplier));
                ctx.lineTo(Math.round(this.rijbanen[i].rijstroken[j].points[2].y * this.multiplier), Math.round(this.rijbanen[i].rijstroken[j].points[2].x * this.multiplier));
                ctx.lineTo(Math.round(this.rijbanen[i].rijstroken[j].points[3].y * this.multiplier), Math.round(this.rijbanen[i].rijstroken[j].points[3].x * this.multiplier));
                ctx.closePath();
                ctx.stroke();
            }
        }
    }
}

window.addEventListener("load", function (event) {
    var canvas = document.getElementById("my_canvas");
    var ctx = canvas.getContext("2d");
    websocket = new WebSocket("ws://localhost:6789/");
    var brug;

    websocket.onmessage = function (event) {
        data = JSON.parse(event.data);
        if (data[0].objectId.type == 'brug') {
            brug = new Brug(data[0].points, data[0].rijbanen)
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (data.length == 0) {
            brug.draw(ctx, 'green');
        } else {
            brug.draw(ctx, 'red');
            var i;
            for (i = 0; i < data.length; i++) {
                var detectie = data[i];
                // Draw points
                ctx.fillStyle = "rgba(0, 0, 255, 0.3)"
                ctx.strokeStyle = "blue"
                ctx.beginPath();
                ctx.moveTo(Math.round(detectie.points[0].x * brug.multiplier), Math.round(detectie.points[0].y * brug.multiplier));
                ctx.lineTo(Math.round(detectie.points[1].x * brug.multiplier), Math.round(detectie.points[1].y * brug.multiplier));
                ctx.lineTo(Math.round(detectie.points[2].x * brug.multiplier), Math.round(detectie.points[2].y * brug.multiplier));
                ctx.lineTo(Math.round(detectie.points[3].x * brug.multiplier), Math.round(detectie.points[3].y * brug.multiplier));
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
            }
        }
    };

    websocket.onopen = function (event) {
        websocket.send(JSON.stringify({ action: 'register' }));
    };
});