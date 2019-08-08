const math = cc.vmath;
const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;
const gfx = renderEngine.gfx;
const Material = renderEngine.Material;

// Require to load the shader to program lib
require('./LightShader');

function LightMaterial(name) {
    Material.call(this, false);

    var pass = new renderer.Pass('light');
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
            name: 'light_strength',
            type: renderer.PARAM_FLOAT
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
cc.js.extend(LightMaterial, Material);
cc.js.mixin(LightMaterial.prototype, {
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
    setStrength(s) {
        this.effect.setProperty('light_strength', s);
    },
    setRevert(isRevert) {
        this.effect.setProperty('revert', isRevert);
    },

});

module.exports = LightMaterial;