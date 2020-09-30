// Drawing using mouseclicks
function initMouseDraw() {
    var ctx = document.getElementById("my_canvas").getContext("2d");
    ctx.canvas.addEventListener("mousemove", function (event) {
        const offsetX = ctx.canvas.offsetLeft;
        const offsetY = ctx.canvas.offsetTop;
        var mouseX = event.clientX - offsetX;
        var mouseY = event.clientY - offsetY;
        var status = document.getElementById("status");
        status.innerHTML = mouseX + " | " + mouseY;
    });
    ctx.canvas.addEventListener("click", function (event) {
        const offsetX = ctx.canvas.offsetLeft;
        const offsetY = ctx.canvas.offsetTop;
        var mouseX = event.clientX - offsetX;
        var mouseY = event.clientY - offsetY;
        // alert(mouseX+" | "+mouseY);
        ctx.fillStyle = "orange";
        ctx.fillRect(mouseX-15, mouseY-15, 30, 30);
    });
};

// Drawing fixed points on the canvas
function initFixedPoints() {
    var ctx = document.getElementById("my_canvas").getContext("2d");
    var buildings = [ {"id":"house","x":100,"y":100,"w":50,"h":50,"bg":"magenta"},
                      {"id":"grocery","x":200,"y":100,"w":50,"h":50,"bg":"green"},
                      {"id":"post_office","x":300,"y":100,"w":50,"h":50,"bg":"blue"}
    ];
    for (var i = 0; i < buildings.length; i++) {
         var b = buildings[i];
         ctx.fillStyle = b.bg;
         ctx.fillRect(b.x,b.y,b.w,b.h);
    }
}

function varPythonJS() {
    fetch(`${window.origin}/exampleAJAX`)
    .then(function(response){

        if (response.status !== 200) {
            console.log(`Response was not 200: ${respnse.status}`);
            return ;
        }

        response.json().then(function(xyCoordinates){
            var ctx = document.getElementById("my_canvas").getContext("2d");
            ctx.fillStyle = "black"
            ctx.fillRect(xyCoordinates[0], xyCoordinates[1], 50, 50);   
        })

    });
};

// Using websockets to get draw in canvas
function drawFromPython(){
    var ctx = document.getElementById("my_canvas").getContext("2d");
    websocket = new WebSocket("ws://192.168.1.205:6789/");

    websocket.onmessage = function (event) {
        
        data = JSON.parse(event.data);

        
        var i;
        for (i = 0; i < data.length; i++) {
            var detectie = data[i];
            // Draw points
            ctx.fillStyle = "black"
            ctx.beginPath();   
            ctx.moveTo(detectie.points[0].x, detectie.points[0].y);
            ctx.lineTo(detectie.points[1].x, detectie.points[1].y);
            ctx.lineTo(detectie.points[2].x, detectie.points[2].y);
            ctx.lineTo(detectie.points[3].x, detectie.points[3].y);
            ctx.closePath();
            ctx.fill();
            
        }
        
    };
    websocket.onopen = function(event) {
        websocket.send(JSON.stringify({action: 'register'}));
    }
    
};


window.addEventListener("load", function (event) {
    initMouseDraw();
    initFixedPoints();
    varPythonJS();
    drawFromPython();
});