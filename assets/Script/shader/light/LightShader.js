let shader = {
    name: 'light',

    defines: [

    ],
    vert: `
    uniform mat4 viewProj;
    attribute vec3 a_position;
    attribute vec2 a_uv0;
    varying vec2 uv0;
    void main() {
        vec4 pos = viewProj * vec4(a_position, 1);
        gl_Position = pos;
        uv0 = a_uv0;
    }`,
    frag: `
    uniform float light_strength;
    uniform sampler2D iTexture;
    uniform bool revert;
    varying vec2 uv0;

    void main()
    {
        vec4 src_color = texture2D(iTexture, uv0).rgba;
        float strength = light_strength;
        vec3 result = vec3(src_color.r * strength, src_color.g * strength, src_color.b * strength);
        gl_FragColor = vec4(result, src_color.a);
    }`,

};

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines);
});

module.exports = shader;