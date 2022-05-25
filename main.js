// 是否按下鼠标
var down = false;
// 画笔颜色
var color = '#000000';
// 画笔大小
var size = 16;

// tool工具栏
var tool = document.getElementById("tool");
// 画板
var canvas = document.getElementById("canvas");
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

canvas.addEventListener('mousedown',(e)=>{
    down = true;
    // console.log('鼠标按下');
})

canvas.addEventListener('mouseup',(e)=>{
    down = false;
    // console.log('鼠标抬起');
})

canvas.addEventListener('mousemove',(e)=>{
    if(down){
        // 创建div
        let div = document.createElement('div');
        div.classList.add('point');
        div.style.left=e.clientX+'px';
        // 这里有一个小 bug
        // 因为加了tool工具栏，所以offsetX/Y才是真实的高度
        // 但是使用 offsetX/Y 会出现一些奇怪的点，在左上角
        // 不得已只有用clientX/Y减去上面tool工具栏的高度，来获取鼠标位置
        div.style.top=e.clientY-tool.offsetHeight+'px';
        div.style.background=color;
        div.style.width=size + 'px';
        div.style.height=size + 'px';
        canvas.appendChild(div);
        console.log(size);
        // console.log('鼠标按下移动');
    }else{
        // console.log('鼠标抬起移动');
    }
})

// 初始化画布
function init(){
    // 获取当前窗口大小
    var clientHeight =  document.documentElement.clientHeight;
    // 减去工具栏高度
    canvas.style.height=(clientHeight-tool.offsetHeight) + 'px';
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
