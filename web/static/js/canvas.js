// // Drawing using mouseclicks
// function initMouseDraw() {
//     var ctx = document.getElementById("my_canvas").getContext("2d");
//     ctx.canvas.addEventListener("mousemove", function (event) {
//         const offsetX = ctx.canvas.offsetLeft;
//         const offsetY = ctx.canvas.offsetTop;
//         var mouseX = event.clientX - offsetX;
//         var mouseY = event.clientY - offsetY;
//         var status = document.getElementById("status");
//         status.innerHTML = mouseX + " | " + mouseY;
//     });
//     ctx.canvas.addEventListener("click", function (event) {
//         const offsetX = ctx.canvas.offsetLeft;
//         const offsetY = ctx.canvas.offsetTop;
//         var mouseX = event.clientX - offsetX;
//         var mouseY = event.clientY - offsetY;
//         // alert(mouseX+" | "+mouseY);
//         ctx.fillStyle = "orange";
//         ctx.fillRect(mouseX-15, mouseY-15, 30, 30);
//     });
// };

// // Drawing fixed points on the canvas
// function initFixedPoints() {
//     var ctx = document.getElementById("my_canvas").getContext("2d");
//     var buildings = [ {"id":"house","x":100,"y":100,"w":50,"h":50,"bg":"magenta"},
//                       {"id":"grocery","x":200,"y":100,"w":50,"h":50,"bg":"green"},
//                       {"id":"post_office","x":300,"y":100,"w":50,"h":50,"bg":"blue"}
//     ];
//     for (var i = 0; i < buildings.length; i++) {
//          var b = buildings[i];
//          ctx.fillStyle = b.bg;
//          ctx.fillRect(b.x,b.y,b.w,b.h);
//     }
// }

// function varPythonJS() {
//     fetch(`${window.origin}/exampleAJAX`)
//     .then(function(response){

//         if (response.status !== 200) {
//             console.log(`Response was not 200: ${respnse.status}`);
//             return ;
//         }

//         response.json().then(function(xyCoordinates){
//             var ctx = document.getElementById("my_canvas").getContext("2d");
//             ctx.fillStyle = "black"
//             ctx.fillRect(xyCoordinates[0], xyCoordinates[1], 50, 50);   
//         })

//     });
// };

// // Using websockets to get draw in canvas
// function drawFromPython(){
//     var ctx = document.getElementById("my_canvas").getContext("2d");
//     websocket = new WebSocket("ws://192.168.1.205:6789/");

//     websocket.onmessage = function (event) {

//         data = JSON.parse(event.data);


//         var i;
//         for (i = 0; i < data.length; i++) {
//             var detectie = data[i];
//             // Draw points
//             ctx.fillStyle = "black"
//             ctx.beginPath();   
//             ctx.moveTo(detectie.points[0].x, detectie.points[0].y);
//             ctx.lineTo(detectie.points[1].x, detectie.points[1].y);
//             ctx.lineTo(detectie.points[2].x, detectie.points[2].y);
//             ctx.lineTo(detectie.points[3].x, detectie.points[3].y);
//             ctx.closePath();
//             ctx.fill();

//         }

//     };
//     websocket.onopen = function(event) {
//         websocket.send(JSON.stringify({action: 'register'}));
//     }

// };


// 
//     initMouseDraw();
//     initFixedPoints();
//     varPythonJS();
//     drawFromPython();
// });
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