const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function renderClock() {
    /**
     * 清除画布状态
     */
    ctx.clearRect(0, 0, 800, 600);

    //保存最初的画笔
    ctx.save();

    /**
     * 将坐标移动到画布中央
     * 并逆时针旋转90度
     * 目的:
     * 以12点的刻度作为零点
     */
    ctx.translate(400, 300);
    ctx.rotate((-Math.PI / 180) * 90);

    /**
     * 绘制刻度:分针的刻度线
     */
    ctx.save();
    for (let index = 0; index < 60; index++) {
        ctx.rotate(Math.PI / 30);
        ctx.beginPath();
        ctx.moveTo(190, 0);
        ctx.lineTo(200, 0);
        ctx.strokeStyle = "orange";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
    ctx.restore();

    /**
     * 绘制刻度:时针的刻度线
     */
    ctx.save();
    for (let index = 0; index < 12; index++) {
        ctx.rotate(Math.PI / 6);
        ctx.beginPath();
        ctx.moveTo(180, 0);
        ctx.lineTo(200, 0);
        ctx.strokeStyle = "darkgrey";
        ctx.lineWidth = 10;
        ctx.stroke();

        // ctx.font = "bolder 16px 微软雅黑";
        // const text = index+4 > 12 ? index-8: index+4;
        // if (0<index<10) {
        //     ctx.fillText(text,0,160);
        // } else {
        //     ctx.fillText(text,0,155);
        // }

        // ctx.lineWidth = 1;
        // ctx.strokeRect(155,-10,10,20);

        ctx.closePath();
    }
    ctx.restore();

    // /**
    //  * 绘制时针的文本
    //  */
    // ctx.save();
    // for (let index = 0; index < 1; index++) {
    //     // // ctx.rotate(Math.PI/6);
    //     // const degree = 90 + 30 - (index+1)*30;
    //     // console.log({degree});
    //     // ctx.rotate(degree*180/Math.PI);

    //     ctx.rotate(Math.PI/6);
    //     ctx.translate(158,0);
    //     ctx.save();
    //     const degree = 90 - (index+1)*30;
    //     ctx.rotate(degree*180/Math.PI);
    //     ctx.font = "bolder 16px 微软雅黑";
    //     if (0<index<10) {
    //         ctx.fillText(index+1,0,5);
    //     } else {
    //         ctx.fillText(index+1,0,5);
    //     }
    //     ctx.restore();
    // }
    // ctx.restore();

    /**
     * 绘制表盘
     */
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, 200, 0, 2 * Math.PI);
    ctx.strokeStyle = "darkgrey";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();

    /**
     * 获取时间
     */
    let time = new Date();
    const hourShow = time.getHours(),
        minute = time.getMinutes(),
        second = time.getSeconds();
    const hour = hourShow > 12 ? hourShow - 12 : hourShow;

    /**
     * 绘制秒针
     */
    ctx.beginPath();
    ctx.rotate(((2 * Math.PI) / 60) * second);
    ctx.moveTo(-30, 0);
    ctx.lineTo(170, 0);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    /**
     * 绘制分针
     */
    ctx.save();
    ctx.beginPath();
    ctx.rotate(((2 * Math.PI) / 60) * minute + ((2 * Math.PI) / 3600) * second);
    ctx.moveTo(-20, 0);
    ctx.lineTo(120, 0);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    /**
     * 绘制时针
     */
    ctx.save();
    ctx.beginPath();
    ctx.rotate(
        ((2 * Math.PI) / 12) * hour +
            ((2 * Math.PI) / 60 / 12) * minute +
            ((2 * Math.PI) / 3600 / 12) * second
    );
    ctx.moveTo(-20, 0);
    ctx.lineTo(100, 0);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    /**
     * 绘制中间的圆
     */
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    /**
     * 回到最初的画笔
     * 就是坐标系平移到中心/逆时针旋转到12点位置之前的画笔状态
     */
    ctx.restore();

    /**
     * 绘制时间
     */
    const hourText = hourShow < 10 ? `0${hourShow}` : `${hourShow}`;
    const minuteText = minute < 10 ? `0${minute}` : `${minute}`;
    const secondText = second < 10 ? `0${second}` : `${second}`;
    const timeText = `${hourText} : ${minuteText} : ${secondText}`;
    ctx.font = "bolder 24px 微软雅黑";
    const width = ctx.measureText(timeText).width;
    const left = (800 - width) / 2;
    ctx.fillText(timeText, left, 550);
}

setInterval(renderClock, 1000);
