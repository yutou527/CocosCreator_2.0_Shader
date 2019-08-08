let shader = {
    name: 'fluxy',

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

    // frag:
    //     `#define TAU 6.12
    //     #define MAX_ITER 10
    //     uniform sampler2D texture;
    //     uniform vec4 color;
    //     uniform float time;
    //     varying vec2 uv0;

    //     void main()
    //     {
    //         float time = time * .5+5.;
    //         // uv should be the 0-1 uv of texture...
    //         vec2 uv = uv0.xy;//fragCoord.xy / iResolution.xy;

    //         vec2 p = mod(uv*TAU, TAU)-250.0;

    //         vec2 i = vec2(p);
    //         float c = 1.0;
    //         float inten = .0045;

    //         for (int n = 0; n < MAX_ITER; n++) 
    //         {
    //             float t =  time * (1.0 - (3.5 / float(n+1)));
    //             i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(1.5*t + i.x));
    //             c += 1.0/length(vec2(p.x / (cos(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));
    //         }
    //         c /= float(MAX_ITER);
    //         c = 1.17-pow(c, 1.4);
    //         vec4 tex = texture2D(texture,uv);
    //         vec3 colour = vec3(pow(abs(c), 20.0));
    //         colour = clamp(colour + vec3(0.0, 0.0, .0), 0.0, tex.a);

    //         // 混合波光
    //         float alpha = c*tex[3];  
    //         tex[0] = tex[0] + colour[0]*alpha; 
    //         tex[1] = tex[1] + colour[1]*alpha; 
    //         tex[2] = tex[2] + colour[2]*alpha; 
    //         gl_FragColor = color * tex;
    //     }`,
    frag: `
    uniform float time;
    uniform sampler2D iTexture;
    varying vec2 uv0;
    uniform vec4 color;

    void main()
    {
       vec4 src_color = color * texture2D(iTexture, uv0).rgba;

        float w = 0.4;       //宽度
        float start = abs(sin(time/1.414)); //位置函数
        // float start = tan(time/1.414);  
        float strength = 3.0;   //流光增亮强度   (调整该值改变流光的增亮强度)
        float offset = 0.2;      //偏移值         (调整该值改变流光的倾斜程度)
        if(uv0.x < start &&  uv0.x > (start - w))
        // if(uv0.x < (start - offset * uv0.y) &&  uv0.x > (start - offset * uv0.y - w))
        {
            // strength = 1.0 + 2.*(1.-abs(uv0.x - start + w/2.)/(w/2.)); //渐变强度
            strength = 1.0 + 3.*smoothstep(0.0,1.0,1.-abs(uv0.x - start + w/2.)/(w/2.)); //渐变强度 使用smoothstep
            vec3 result = vec3( src_color.r * strength, src_color.g *strength, src_color.b *strength);
            gl_FragColor = vec4(result, src_color.a);

        }else{
            gl_FragColor = src_color;
        }
    }`,
    //gl_FragColor = vec4(result, src_color.a);
    //gl_FragColor = revert?src_color:vec4(result, src_color.a);
};

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines);
});

module.exports = shader;