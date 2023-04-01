class Data {
    type = "";
    value = "";
    isDraw = false;
    lineColor = "black";
    lineWidth = LINE_WIDTH.thin;
    beginX = 0;
    beginY = 0;
    imageData = null;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }
    setWhiteBackground(){
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0,0,this.getCanvasWidth(),this.getCanvasHeight());
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
        this.setWhiteBackground();
    }
    saveImageData() {
        this.imageData = this.ctx.getImageData(
            0,
            0,
            this.getCanvasWidth(),
            this.getCanvasHeight()
        );
    }
    putImageData() {
        if (this.imageData) {
            this.ctx.putImageData(
                this.imageData,
                0,
                0,
                0,
                0,
                this.getCanvasWidth(),
                this.getCanvasHeight()
            );
        }
    }
    saveBegin(e) {
        this.beginX = this.getPositionX(e);
        this.beginY = this.getPositionY(e);
    }
    setIsDraw(isDraw) {
        this.isDraw = isDraw;
    }
    getCanvasWidth() {
        return this.canvas.offsetWidth;
    }
    getCanvasHeight() {
        return this.canvas.offsetHeight;
    }
    getPositionX(e) {
        return e.pageX - this.canvas.offsetLeft;
    }
    getPositionY(e) {
        return e.pageY - this.canvas.offsetTop;
    }
    setCanvasSize({ width = 0, height = 0 } = {}) {
        this.saveImageData();
        this.canvas.setAttribute("width", width || this.getCanvasWidth());
        this.canvas.setAttribute("height", height || this.getCanvasHeight());
        this.putImageData();
    }
    mousedownOperation(e) {
        if (this.type === "brush") {
            this.ctx.beginPath();
            const x = this.getPositionX(e),
                y = this.getPositionY(e);
            this.ctx.moveTo(x, y);
        } else if (this.type === "rect" || this.type === "circle") {
            this.saveBegin(e);
            this.saveImageData();
        }
    }
    mouseupOperation(e) {
        if (this.type === "brush") {
            this.ctx.closePath();
        }
    }
    draw(e) {
        this[`${this.type}Draw`](e);
    }
    brushDraw(e) {
        const x = this.getPositionX(e),
            y = this.getPositionY(e);
        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.stroke();
    }
    rectDraw(e) {
        this.clearCanvas();
        this.putImageData();
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.rect(
            this.beginX,
            this.beginY,
            this.getPositionX(e) - this.beginX,
            this.getPositionY(e) - this.beginY
        );
        this.ctx.stroke();
        this.ctx.closePath();
    }
    circleDraw(e) {
        this.clearCanvas();
        this.putImageData();
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.lineColor;
        const r = Math.sqrt(
            Math.pow(this.getPositionX(e) - this.beginX, 2) +
                Math.pow(this.getPositionY(e) - this.beginY, 2)
        );
        this.ctx.arc(this.beginX, this.beginY, r, 0, Math.PI*2);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    saveCanvas(){
        this.canvas.toBlob(function(blob) {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.style.display = "none";
            link.download = `${new Date().toDateString()}.jpeg`;
            link.href = url;
            link.click();
            link.remove();
        },"image/jpeg",1)
    }
}
