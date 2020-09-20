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
         ctx.fillRect(b.x,b.y,b.w,b.h)
    }
}


window.addEventListener("load", function (event) {
    initMouseDraw();
    initFixedPoints();
});