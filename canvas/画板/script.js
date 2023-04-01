const canvas = document.querySelector(".canvas");
const btns = document.querySelectorAll(".menu .btn");

const data = new Data(canvas);

data.setCanvasSize();

data.setWhiteBackground();

btns.forEach((btn) => {
    const type = btn.getAttribute("type");
    const value = btn.getAttribute("value");
    btn.addEventListener("click", () => {
        if (type === "brush" || type === "rect" || type === "circle") {
            data.type = type;
            btns.forEach((item) => {
                const itemType = item.getAttribute("type");
                if (itemType !== "lineWidth") {
                    item.classList.remove("active");
                }
            });
            btn.classList.add("active");
        } else if (type === "lineWidth") {
            data.lineWidth = LINE_WIDTH[value];
            btns.forEach((item) => {
                const itemType = item.getAttribute("type");
                if (itemType === "lineWidth") {
                    item.classList.remove("active");
                }
            });
            btn.classList.add("active");
        } else if (type === "color") {
            const input = btn.querySelector("input");
            input?.click();
        } else if (type === "save") {
            data.saveCanvas();
        }
    });
});

const btnColorInput = document.querySelector(".menu .btn[type='color'] input");
btnColorInput.addEventListener("change",()=>{
    data.lineColor = btnColorInput.value;
})

canvas.addEventListener("mousedown", (e) => {
    data.setIsDraw(true);
    data.mousedownOperation(e);
});
canvas.addEventListener("mouseup", (e) => {
    data.setIsDraw(false);
    data.mouseupOperation(e);
});
canvas.addEventListener("mousemove", (e) => {
    if (!!!data.type || !data.isDraw) return;
    data.draw(e);
});

const observeServer = new ResizeObserver((entries)=>{
    for (const iterator of entries) {
        if (iterator.target === canvas) {
            const {width,height} = iterator.contentRect;
            data.setCanvasSize(width,height);
        }
    }
})
observeServer.observe(canvas);