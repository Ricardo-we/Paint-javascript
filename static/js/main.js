var canvas = document.getElementById('canvas');
var canvas_pos = canvas.getBoundingClientRect();
var ctx = canvas.getContext('2d');
var click = false;

//BUTTONS
var btn_clear = document.getElementById('delete');
var btn_pincel = document.getElementById('pincel');
var btn_linea = document.getElementById('linea')
var btn_cuadrado = document.getElementById('cuadrado');
var btn_circulo = document.getElementById('circulo')
var btn_grid = document.getElementById('btn_grid');
var fillBg = document.getElementById('fillBg'), bg_color = "#000";
var borrador = document.getElementById('borrador');
var color_selector = document.getElementById('color'), grosor_selector = document.getElementById('grosor');

//------------------------------BASIC FUNCTIONS--------------------------------//
function color(color_val){
    ctx.fillStyle = color_val;
    ctx.strokeStyle = color_val;
    bg_color = color_val;
}

function grosor(grosor_val){
    ctx.lineWidth = grosor_val;
}

function removeCanvasEvents(func1, func2){
    canvas.removeEventListener('mousedown', func1, {passive:true})
    canvas.removeEventListener('mouseup', func2, {passive:true})
}

function removeAllListeners(){
    removeCanvasEvents(startRect, drawRect);
    removeCanvasEvents(startCircle, drawCircle);
    removeCanvasEvents(startLine, drawLine);
    canvas.removeEventListener('mousemove',draw, {passive:true})
    canvas.removeEventListener('mousedown',drawing, {passive:true})
}

//  -------------------PINCEL---------------//
function draw(event) {
    x = event.clientX - canvas_pos.left;
    y = event.clientY - canvas_pos.top;

    if (click === true){
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function drawing(e) {
    click = true;
    ctx.beginPath()
    let x = e.clientX, y = e.clientY;
    ctx.moveTo(x - canvas_pos.left, y - canvas_pos.top)
    canvas.addEventListener('mousemove', draw)
}


btn_pincel.addEventListener('click', function(){
    removeAllListeners()
    
    color(color_selector.value);
    grosor(grosor_selector.value);
    
    canvas.addEventListener('mousedown', drawing);
    canvas.addEventListener('mouseup', function(){
        click = false;
    });

});


/******************************FUNCION BORRADOR**********************************/ 
borrador.addEventListener('click',function(){
    removeAllListeners()
    
    ctx.fillStyle = "#ffff";
    ctx.strokeStyle = "#ffff";
    grosor(grosor_selector.value);

    canvas.addEventListener('mousedown', drawing);
    canvas.addEventListener('mouseup', function(){
        click = false;
    });
})


/************************************FUNCION LINEA RECTA********************************************/
var xlinea1 = 0, ylinea1 = 0;

function startLine(e){
    click = true;
    xlinea1 = e.clientX - canvas_pos.left;
    ylinea1 = e.clientY - canvas_pos.top;
}

function drawLine(e){
    let x2 = e.clientX - canvas_pos.left;
    let y2 = e.clientY - canvas_pos.top;
    
    canvas.addEventListener('mousedown', startLine);
    click = false;
    if (click === false){
        ctx.beginPath()
        ctx.moveTo(xlinea1, ylinea1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath()
    }
}

btn_linea.addEventListener('click', function(){
    removeAllListeners();
    color(color_selector.value);
    grosor(grosor_selector.value);
    canvas.addEventListener('mousedown', startLine);
    canvas.addEventListener('mouseup', drawLine)
})

//------------------------------CUADRADO---------------------------------//
var xcuadrado1 = 0, ycuadrado1 = 0;

function startRect(e){
    click = true;
    xcuadrado1 = e.clientX - canvas_pos.left;
    ycuadrado1 = e.clientY - canvas_pos.top;
    console.log("x1: " + x1 + " y1: " + y1)
}

function drawRect(e){
    let x2 = e.clientX - canvas_pos.left;
    let y2 = e.clientY - canvas_pos.top;

    canvas.addEventListener('mousedown', startRect);
    
    click = false;

    if(click === false){
        ctx.strokeRect(xcuadrado1,ycuadrado1, x2-xcuadrado1, y2-ycuadrado1);
    }

}

btn_cuadrado.addEventListener('click', () =>{
    removeAllListeners()
    color(color_selector.value);
    grosor(grosor_selector.value);
    canvas.addEventListener('mousedown', startRect)
    canvas.addEventListener('mouseup', drawRect)
});


//------------------------------CIRCULO------------------------------//
var xcircle1 = 0, ycircle1 = 0;

function startCircle(e){
    click = true;
    xcircle1 = e.clientX - canvas_pos.left;
    ycircle1 = e.clientY - canvas_pos.top;
}

function drawCircle(e){
    let x2 = e.clientX - canvas_pos.left;
    let y2 = e.clientY - canvas_pos.top;
    
    canvas.addEventListener('mousedown', startCircle);
    click = false;

    if (click === false){
        ctx.beginPath()
        ctx.arc(xcircle1, ycircle1, x2-xcircle1, 0, 2*Math.PI);
        ctx.stroke();
        ctx.closePath()
    }
}

btn_circulo.addEventListener('click', function(){
    removeAllListeners();
    color(color_selector.value);
    grosor(grosor_selector.value);
    canvas.addEventListener('mousedown', startCircle);
    canvas.addEventListener('mouseup', drawCircle)

})


//----------------------------CLEAR-------------------------//
btn_clear.addEventListener('click',function(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
})


//-------------------------GRID----------------------------------//
function grid(rows, columns){

    var gridNumControlRow = canvas.width/columns;
    
    if(rows > 200 || columns > 200){
        rows = 1, columns = 1
        alert("No puedes poner más de doscientos")
    }

    for (let i = 0; i <= rows; i++){
        ctx.beginPath()
        ctx.lineTo(0, i*gridNumControlRow);
        ctx.lineTo(canvas.width, i*gridNumControlRow);
        ctx.closePath()
        ctx.stroke()
    }

    for (let i = 0; i <= columns; i++){
        ctx.beginPath()
        ctx.lineTo(i*gridNumControlRow, 0);
        ctx.lineTo(i*gridNumControlRow, canvas.height);
        ctx.closePath()
        ctx.stroke()
    }

}

btn_grid.addEventListener('click', () => {
    filas = prompt("Introduce el tamaño del grid (Entre 1 y 200)");
    columnas = filas;
    grid(filas, columnas);
})

fillBg.addEventListener('click', () =>{
    canvas.style.backgroundColor = bg_color;
})