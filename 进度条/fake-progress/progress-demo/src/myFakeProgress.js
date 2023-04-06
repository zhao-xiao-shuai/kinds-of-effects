export class myFakeProgress {
    constructor(opts) {
        opts = opts || {};

        /**
         * 进度条变化的快慢
         * 数字越大,变化的越慢
         */
        this.timeConstant = opts.timeConstant || 1000;
        /**
         * 是否自动启动
         * 默认不自动启动
         */
        this.autoStart = opts.autoStart || false;
        /**
         * 统计消耗时间的截止百分比
         */
        this.staticPercentage = opts.staticPercentage || 0.99;

        /**
         * 当前进度
         */
        this.progress = 0;

        /**
         * 内部进度变化的频率
         */
        this._intervalFrequency = 100;
        /**
         * 内部定时器
         */
        this._intervalId = null;
        /**
         * 启动之后的时间
         */
        this._time = 0;

        /**
         * 如果自动启动
         * 直接调用start方法
         */
        if (this.autoStart) {
            this.start();
        }

        /**
         * 进度从0到指定值消耗的时间
         */
        this.timeWaste = null;
    }
    /**
     * 启动之后
     * 每100ms计算一次progress值
     */
    start() {
        this._time = 0;
        const timeStart = new Date();
        this._intervalId = setInterval(() => {
            this._time += this._intervalFrequency;
            /**
             * 关键代码
             * 进度的变化规律: 1 - 1/e^(t/d)
             * 其中:
             * t表示时间
             * d实际上就是传入的timeConstant值
             * d越大,函数曲线变化的越慢
             */
            this.progress = 1 - Math.exp((-1 * this._time) / this.timeConstant);
            if (!this.timeWaste && this.progress > this.staticPercentage) {
                const timeEnd = new Date();
                this.timeWaste = (timeEnd - timeStart) / 1000;
            }
        }, this._intervalFrequency);
    }
    /**
     * 结束时
     * 1. 清除定时器
     * 2. 将progress值设置为1
     * 3. 清除消耗时间
     */
    end() {
        clearInterval(this._intervalId);
        this._intervalId = null;
        this.progress = 1;
        this.timeWaste = null;
    }
}
