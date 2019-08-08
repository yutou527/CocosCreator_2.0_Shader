cc.Class({
    extends: cc.Component,

    properties: {
        from: 1, //开始亮度 1为原亮度
        to: 3,
        speed: 1,
        breath: true,
        autoStart: false,
        isAnim: true, //是否需要动画
        delay: 1, //非动画方式的延迟回复时间
    },
    start() {
        this.target = this.getComponent(cc.Sprite);
        if (this.target && this.target.spriteFrame) {
            let texture = this.target.spriteFrame.getTexture();
            this._material.setTexture(texture);
            this._material.updateHash(Date.now());
            this.target._material = this._material;
            this.target._renderData._material = this._material;
            if (this.autoStart) {
                this.doStart();
            }
        }
    },
    onLoad: function () {
        this._light = this.from;

        cc.dynamicAtlasManager.enabled = false;
        const LightMaterial = require('./light/LightMaterial');

        this._material = new LightMaterial();
    },
    onEnable() {
        // this.startAnim = true;
    },
    doStart() {
        this._light = this.from;
        this._isRunning = true;
        if (this.from > this.to) {
            this._direction = -1;
            this._from = this.to;
            this._to = this.from;
        } else {
            this._direction = 1;
            this._from = this.from;
            this._to = this.to;
        }
        if (!this.isAnim) {
            this._material.setStrength(this.to);
            this.unscheduleAllCallbacks();
            this.scheduleOnce(_ => {
                this._material.setStrength(this.from);
                this._isRunning = false;
            }, this.delay)
        } else {
            this._material.setStrength(this.from);
            this._shouldRun = true;
        }
    },
    doPause() {

    },
    doResume() {

    },
    doStop(revert) {
        if (this._shouldRun) {
            this._shouldRun = false;
            this._isRunning = false;
        }
        if (revert) {
            this._material.setStrength(1);
        }
        this._material.setRevert(true);

    },
    update(dt) {
        if (!this._isRunning) {
            return;
        }
        if (this.target && this.target.spriteFrame && this._material) {
            let texture = this.target.spriteFrame.getTexture();
            this._material.setTexture(texture);
            this.target._material = this._material;
            this.target._renderData._material = this._material;
        }

        if (!this._shouldRun) {
            return;
        }
        if (this._light >= this._to) {
            this._direction = -1;
        }
        if (this._light <= this._from) {
            this._direction = 1;
        }
        this._light += dt * this.speed * this._direction;
        if ((this._light >= this._to || this._light <= this._from) && !this.breath) {
            this.doStop(false);
        } else {
            this._material.setStrength(this._light);
        }
    },
});