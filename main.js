// 当前绘制模式
var model = 'line';
// 是否按下鼠标
var down = false;
// 画笔颜色
var color = '#000000';
// 画笔大小
var size = 3;
// 开始坐标
var begin_X = 0;
var begin_Y = 0;
// 结束坐标
var end_X = 0;
var end_Y = 0;
// 当前坐标
// var now_X = 0;
// var now_Y = 0;

// tool工具栏
var tool = document.getElementById("tool");
// 画板
var canvas = document.getElementById("canvas");
// 子画板
var canvas_son = document.getElementById("canvas-son");
// 取色板
var chooseColor = document.getElementById("chooseColor");
// 色值
var chooseColorValue = document.getElementById("chooseColorValue");
// 画笔大小
var pencilSize = document.getElementById("pencilSize");


// 取色板失去焦点事件
chooseColor.addEventListener('blur',(e)=>{
    // 设置画笔颜色
    color = chooseColor.value;
    // 设置色值
    chooseColorValue.value = chooseColor.value;
})

// 改变表单value事件
pencilSize.addEventListener('change',(e)=>{
    // 设置笔的大小
    size=pencilSize.value;
})

// 画板点击事件监听
// canvas.addEventListener('click',(e)=>{
//     console.log(e);
//     console.log('X:' + e.offsetX + ' Y:' + e.offsetY);
//     let div = document.createElement('div');
//     div.classList.add('point');
//     div.style.left=e.offsetX+'px';
//     div.style.top=e.offsetY+'px';
//     div.style.background=color;
//     canvas.appendChild(div);
// })

// pc使用

canvas_son.addEventListener('mousedown',(e)=>{
    down = true;
    var ctx = canvas_son.getContext('2d');
    ctx.beginPath();
})

canvas_son.addEventListener('mouseup',(e)=>{
    down = false;
    var ctx = canvas_son.getContext('2d');
    ctx.closePath();
})

canvas_son.addEventListener('mousemove',(e)=>{
    if(down){
        if(model==='line'){ //绘制线
            var ctx = canvas_son.getContext('2d');
            ctx.strokeStyle = color;
            ctx.lineCap = "round";
            ctx.lineWidth = size;
            ctx.lineTo(e.clientX,e.clientY-tool.offsetHeight)
            ctx.stroke();
        }
        else if(model==='clear'){
            var ctx = canvas_son.getContext('2d');
            ctx.clearRect(e.clientX,e.clientY-tool.offsetHeight, 16, 16);
        }
    }
    else{
        
    }
})


// 手机使用
canvas_son.addEventListener('touchstart',(e)=>{
    down = true;
    var ctx = canvas_son.getContext('2d');
    ctx.beginPath();
})

canvas_son.addEventListener('touchend',(e)=>{
    down = false;
    var ctx = canvas_son.getContext('2d');
    ctx.closePath();
})

canvas_son.addEventListener('touchmove',(e)=>{
    console.log('mole');
    if(down){
        if(model==='line'){ //绘制线
            var ctx = canvas_son.getContext('2d');
            ctx.strokeStyle = color;
            ctx.lineCap = "round";
            ctx.lineWidth = size;
            ctx.lineTo(e.targetTouches[0].pageX,e.targetTouches[0].pageY-tool.offsetHeight)
            ctx.stroke();
        }else if(model==='clear'){
            var ctx = canvas_son.getContext('2d');
            ctx.clearRect(e.targetTouches[0].pageX,e.targetTouches[0].pageY-tool.offsetHeight, 16, 16);
        }
    }
    else{
        
    }
})

// 初始化画布
function init(){
    // 获取当前窗口大小
    var clientHeight =  document.documentElement.clientHeight;
    // 减去工具栏高度
    canvas.style.height=(clientHeight-tool.offsetHeight) + 'px';
    // 设置Canvas的大小
    canvas_son.height = canvas.offsetHeight;
    canvas_son.width = canvas.offsetWidth;
}

// 设置绘制模式
function setModel(value){
    model = value;
}

// 清空canvas画板
document.getElementById("empty").onclick = ()=>{
    var w = canvas_son.offsetWidth;
    var h = canvas_son.offsetHeight;
    var ctx = canvas_son.getContext('2d');
    ctx.clearRect(0, 0, w, h);
}

// 初始加载事件
window.onload = ()=>{
    // 初始化画布
    init();
}

// 视口改变事件
window.onresize = ()=>{
    // 调整画布
    init();
}
