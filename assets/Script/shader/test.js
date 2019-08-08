cc.Class({
    extends: cc.Component,

    properties: {

    },
    start() {
        this._start = Date.now();
        this.target = this.getComponent(cc.Sprite);
        if (this.target && this.target.spriteFrame) {
            let texture = this.target.spriteFrame.getTexture();
            this._material.setTexture(texture);
            this._material.updateHash(Date.now());
            this.target._material = this._material;
            this.target._renderData._material = this._material;
            if (this.autoStart) {
                this._shouldRun = true;
            }
        }
    },
    onLoad: function () {
        cc.dynamicAtlasManager.enabled = false;
        const material = require('./test/TestMaterial');

        this._material = new material();

        this.node.on(cc.Node.EventType.MOUSE_MOVE,e=>{
            let location = this.node.convertToNodeSpaceAR(e.getLocation());
            // this._material.setPosition({
            //     x:  -(location.x - this.node.width/2) / (this.node.width/2),
            //     y:  -(this.node.height - location.y - this.node.height/2)/(this.node.height/2)
            // });
            this._material.setPosition({
                x:- location.x / (this.node.width),
                y:location.y / (this.node.height),
            })
            
        })
    },


    update(dt) {
        const now = Date.now();
        let time = ((now - this._start) / 1000);
        // if (time >= 1.414) {
        //     time = 0;
        //     this._start = now;
        // }
        this._material.setTime(time);
    },
});