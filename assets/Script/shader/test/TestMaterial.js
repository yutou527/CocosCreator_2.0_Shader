const math = cc.vmath;
const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;
const gfx = renderEngine.gfx;
const Material = renderEngine.Material;

// Require to load the shader to program lib
require('./TestShader');

function TestMaterial() {
    Material.call(this, false);

    var pass = new renderer.Pass('test');
    pass.setDepth(false, false);
    pass.setCullMode(gfx.CULL_NONE);
    pass.setBlend(
        gfx.BLEND_FUNC_ADD,
        gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA,
        gfx.BLEND_FUNC_ADD,
        gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA
    );

    let mainTech = new renderer.Technique(
        ['transparent'],
        [{
            name: 'iTexture',
            type: renderer.PARAM_TEXTURE_2D
        }, {
            name: 'time',
            type: renderer.PARAM_FLOAT
        }, {
            name: 'u_mouse',
            type: renderer.PARAM_FLOAT2
        }],
        [
            pass
        ]
    );

    this._texture = null;

    // need _effect to calculate hash
    this._effect = this.effect = new renderer.Effect(
        [
            mainTech,
        ], {},
        []
    );

    this._mainTech = mainTech;
}
cc.js.extend(TestMaterial, Material);
cc.js.mixin(TestMaterial.prototype, {
    getTexture() {
        return this._texture;
    },

    setTexture(val) {
        if (this._texture !== val) {
            this._texture = val;
            this._texture.update({
                // Adapt to shader
                flipY: false,
                // For load texture
                mipmap: false
            });
            this.effect.setProperty('iTexture', val.getImpl());
            this._texIds['iTexture'] = val.getId();
        }
    },

    setTime(time) {
        this.effect.setProperty('time', time);
    },
    setPosition(p){
        let pos = math.vec2.create();
        pos.x = p.x;
        pos.y = p.y;
        cc.log(p)
        this.effect.setProperty('u_mouse', pos);
    }
  

});

module.exports = TestMaterial;