/**
 * Represents a fakeProgress
 * @constructor
 * @param {object} options - options of the contructor
 * @param {object} [options.timeConstant=1000] - the timeConstant in milliseconds (see https://en.wikipedia.org/wiki/Time_constant)
 * @param {object} [options.autoStart=false] - if true then the progress auto start
 */
const FakeProgress = function (opts) {

	if (!opts) {
		opts = {};
	}

    /**
     * 进度条变化的时长
     */
	this.timeConstant = opts.timeConstant || 1000;

    /**
     * 当前进度
     */
	this.progress = 0;


	this._running = false;

    /**
     * 内部进度变化的频率
     */
	this._intervalFrequency = 100;

    /**
     * 默认不自动启动
     */
	this.autoStart = opts.autoStart || false;

    /**
     * 父progress实例
     */
	this.parent = opts.parent;
	this.parentStart = opts.parentStart;
	this.parentEnd = opts.parentEnd;

    /**
     * 如果自动启动
     * 直接调用start方法
     */
	if (this.autoStart) {
		this.start();
	}
};

/**
 * 启动
 * 每100ms设置一次当前progress
 */
FakeProgress.prototype.start = function () {
	this._time = 0;
	this._intervalId = setInterval(this._onInterval.bind(this), this._intervalFrequency);
};
FakeProgress.prototype._onInterval = function () {
	this._time += this._intervalFrequency;
	this.setProgress(1 - Math.exp(-1 * this._time / this.timeConstant));
};

/**
 * 结束
 * 设置进度为1
 */
FakeProgress.prototype.end = function () {
	this.stop();
	this.setProgress(1);
};

/**
 * 清除内部定时器
 */
FakeProgress.prototype.stop = function () {
	clearInterval(this._intervalId);
	this._intervalId = null;
};

/**
 * Create a sub progress bar under the first progres
 * @method
 * @param {object} options - options of the FakeProgress contructor
 * @param {object} [options.end=1] - the progress in the parent that correspond of 100% of the child
 * @param {object} [options.start=fakeprogress.progress] - the progress in the parent that correspond of 0% of the child
 */

/**
 * 基于当前progress
 * 创建子progress
 */
FakeProgress.prototype.createSubProgress = function (opts) {
    /**
     * 子progress的起点:
     * 如果创建子progress的时候传了起点,就用传进来的起点
     * 如果创建子progress的时候没有传起点,就用父progress的当前progress
     */
	const parentStart = opts.start || this.progress;

    /**
     * 子progress的终点
     * 如果创建子progress的时候没有传终点
     * 则终点是1
     */
	const parentEnd = opts.end || 1;

    /**
     * 合并选项
     */
	const options = Object.assign({}, opts, {
		parent: this,
		parentStart: parentStart,
		parentEnd: parentEnd,
		start: null,
		end: null
	});

	const subProgress = new FakeProgress(options);
	return subProgress;
};

/**
 * 设置进度
 */
FakeProgress.prototype.setProgress = function (progress) {
    /**
     * 设置当前progress
     */
	this.progress = progress;
	if (this.parent) {
        /**
         * 设置父级progress
         * 
         * 子progress只作用于父progress的某一段上
         */
		this.parent.setProgress(((this.parentEnd - this.parentStart) * this.progress) + this.parentStart);
	}
};

if (typeof exports === 'object' && typeof module === 'object') {
	module.exports = FakeProgress;
}
