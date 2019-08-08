const material = require('./rain/RainMaterial');

cc.Class({
    extends: cc.Component,

    properties: {

    },
    start() {

        this._start = Date.now();
        this.target = this.getComponent(cc.Sprite);
        if (this.target) {
            let texture = this.target.spriteFrame.getTexture();
            this._material.setTexture(texture);
            this._material.setResolution(this.target.node.width, this.target.node.height);
            this._material.updateHash();
            this.target._material = this._material;
            this.target._renderData._material = this._material;
        }
    },
    onLoad: function () {
        cc.dynamicAtlasManager.enabled = false;
        this._material = new material();
    },
    onEnable() {},

    update(dt) {

        let now = Date.now();
        let time = (now - this._start) / 1000;
        this._material.setTime(time);
    },
});