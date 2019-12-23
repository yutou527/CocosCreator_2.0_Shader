cc.Class({
    extends: cc.Component,

    properties: {
        testNode: cc.Node,
    },

    // use this for initialization
    onLoad: function () {

        this.scheduleOnce(_ => {
            this.testNode.active = true;
        }, 0.1)
    },

    // called every frame
    update: function (dt) {

    },
});
