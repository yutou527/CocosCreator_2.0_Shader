const FluxyMaterial = require('./fluxay/FluxyMaterial');

cc.Class({
    extends: cc.Component,

    properties: {

    },
    start() {

    },
    onLoad: function () {
        cc.dynamicAtlasManager.enabled = false;
        if (this.getComponent(cc.Sprite).spriteFrame.textureLoaded()) {
            this.initMaterial();
        } else {
            this.getComponent(cc.Sprite).spriteFrame.on('load', e => {
                this.scheduleOnce(_ => {
                    this.initMaterial();
                });
            }, this);
        }
    },
    initMaterial() {
        this._start = Date.now();
        this._material = new FluxyMaterial();

        this.target = this.getComponent(cc.Sprite);
        if (this.target && this.target.spriteFrame) {
            let texture = this.target.spriteFrame.getTexture();
            this._material.setTexture(texture);
            this._material.updateHash(Date.now());
            this.target._material = this._material;
            this.target._renderData._material = this._material;
        }
    },
    update(dt) {
        if (!this._material)
            return;
        const now = Date.now();
        let time = ((now - this._start) / 1000);
        // if (time >= 1.414) {
        //     time = 0;
        //     this._start = now;
        // }
        this._material.setTime(time * 2);
    },
});