let shader = {
    name: 'test',

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

    //渐变亮度的流光
    // frag: `
    // uniform float time;
    // uniform sampler2D iTexture;
    // varying vec2 uv0;
    // uniform vec4 color;

    // void main()
    // {
    //    vec4 src_color = color * texture2D(iTexture, uv0).rgba;

    //     float w = 0.4;       //宽度
    //     // float start = tan(time/1.414);  // tan函数  -> 重复
    //     float start = abs(sin(time/1.414)); //sin -> <-往复 
    //     // float start = tan(time/1.414);  
    //     float strength = 3.0;   //流光增亮强度   (调整该值改变流光的增亮强度)
    //     // float strength = 0.08;   //流光增亮强度   (调整该值改变流光的增亮强度)
    //     float offset = 0.2;      //偏移值         (调整该值改变流光的倾斜程度)
    //     if(uv0.x < start &&  uv0.x > (start - w))
    //     // if(uv0.x < (start - offset * uv0.y) &&  uv0.x > (start - offset * uv0.y - w))
    //     {
    //         strength = 1.0 + 2.0 * (1.0-abs(uv0.x - start + w/2.) / (w/2.)); //渐变强度
    //         vec3 result = vec3( src_color.r * strength, src_color.g *strength, src_color.b *strength);
    //         gl_FragColor = vec4(result, src_color.a);

    //     }else{
    //         gl_FragColor = src_color;
    //     }
    // }`,

    // 带周期的随机闪电 
    // frag: `
    // uniform float time;
    // uniform sampler2D iTexture;
    // varying vec2 uv0;
    // uniform vec4 color;

    // // 伪随机
    // float random (float n) {
    //     return fract(sin(n)*1000000.);
    // }
    // float randomPix(float x,float y){
    //     return fract(cos(x * (12.9898) + y * (4.1414)) * 43758.5453);
    // }
    // void main()
    // {
    //    vec4 src_color = color * texture2D(iTexture, uv0).rgba;
    //     float r = 0.5;       //半径
    //     // float start = tan(time/1.414);  // tan函数  -> 重复
    //     // float start = abs(sin(time/1.414)); //sin -> <-往复 
    //     float start = 0.5;  // tan函数  -> 重复

    //     float shouldStartLight = sin(time);
    //     float rand = random(time);
    //     float strength = 3.0;   //中心亮度增强   (调整该值改变流光的增亮强度)

    //     float dis = abs(sqrt((uv0.x - start)*(uv0.x - start) + (uv0.y - 0.5)*(uv0.y - 0.5)));
    //     //前 决定连续出现时的间隔  后决定闪电组出现的频率即概率
    //     if(rand>0.85 && shouldStartLight > (rand)){
    //         if(dis<=r)
    //         {
    //             strength = 1. + 3.* (1.-dis/r);
    //             vec3 result = vec3( src_color.r * strength, src_color.g *strength, src_color.b *strength);
    //             gl_FragColor = vec4(result, src_color.a);
    //         }else{
    //             gl_FragColor = src_color;
    //         }
    //     }else{
    //         gl_FragColor = src_color;
    //     }

    // }`,

    // rand noise
    // frag: `
    // uniform float time;
    // uniform sampler2D iTexture;
    // varying vec2 uv0;
    // uniform vec4 color;

    // float random2(vec2 p){
    //     return fract(sin(dot(p.xy,vec2(12.23,78.32)))*232348.23);
    // }
    // float random3(float x,float y){
    //     return fract(cos(x * (time) + y * (time)) * 43758.5453);
    // }

    // float random (vec2 st) {
    //     return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
    // }
    // // 散列函数（哈希值）
    // float hash(float n) {
    //     return fract(sin(n) * 1e4);
    // }

    // float hash(vec2 p) { 
    //     return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x))));
    // }
    // float noise(vec2 x) {
    //     vec2 i = floor(x);
    //     vec2 f = fract(x);

    //     // Four corners in 2D of a tile
    //     float a = hash(i);
    //     float b = hash(i + vec2(1.0, 0.0));
    //     float c = hash(i + vec2(0.0, 1.0));
    //     float d = hash(i + vec2(1.0, 1.0));

    //     // Simple 2D lerp using smoothstep envelope between the values.
    //     // return vec3(mix(mix(a, b, smoothstep(0.0, 1.0, f.x)),
    //     //			mix(c, d, smoothstep(0.0, 1.0, f.x)),
    //     //			smoothstep(0.0, 1.0, f.y)));

    //     // Same code, with the clamps in smoothstep and common subexpressions
    //     // optimized away.
    //     vec2 u = f * f * (3.0 - 2.0 * f);
    //     return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    // }

    // void main()
    // {
    //     vec4 src_color = color * texture2D(iTexture, uv0).rgba;
    //     // float start = tan(time/1.414);  // tan函数  -> 重复
    //     // float start = abs(sin(time/1.414)); //sin -> <-往复 
    //     float now = abs(sin(time/1.414));
    //     // vec3 result = vec3( random2(uv0), random2(uv0), random2(uv0));
    //     // vec3 result = vec3( random3(uv0.x,uv0.y), random3(uv0.x,uv0.y), random3(uv0.x,uv0.y));
    //     vec3 result = vec3( noise(uv0), noise(uv0), noise(uv0));
    //     gl_FragColor = vec4(result, src_color.a);
    // }`,

    //跟随鼠标的眩光效果
    frag: `
        const int NUM_SAMPLES = 60;
        uniform float time;
        varying vec2 uv0;
        uniform sampler2D iTexture;
        uniform vec2 u_mouse;  //鼠标位置

        float random (vec2 st) {
            return fract(sin(dot(st.xy + fract(time),vec2(12.9898,78.233)))*43758.5453123);
        }
        float noise(vec2 u){
            return mix( mix( random( vec2(0.0,0.0) ),
                            random( vec2(1.0,0.0) ), u.x),
                        mix( random( vec2(0.0,1.0) ),
                            random( vec2(1.0,1.0) ), u.x), u.y);
        }

        void main(void) 
        {
            float decay=0.96815;
            float exposure=0.21;
            float density=0.926;
            float weight= 0.9;//0.58767;

            vec2 tc = uv0;
            vec2 deltaTexCoord = tc;

            deltaTexCoord =  uv0 + u_mouse - 0.5;//+vec2(sin(time*.7)*.3,-cos(time*.2)*.3)-.5;
            deltaTexCoord *= 1.0 / float(NUM_SAMPLES)  * density;

            float illuminationDecay = 1.0;
            vec4 color =texture2D(iTexture, tc.xy)*0.305104;

            tc += deltaTexCoord * fract( sin(dot(uv0.xy+fract(time),vec2(12.9898, 78.233)))* 43758.5453 );

            for(int i=0; i < NUM_SAMPLES; i++)
            {
                tc -= deltaTexCoord;
                vec4 sampleTex = texture2D(iTexture, tc)*0.305104;
                sampleTex *= illuminationDecay * weight;
                color += sampleTex;
                illuminationDecay *= decay;
            }
            gl_FragColor = color*exposure;
            // gl_FragColor = vec4( noise(uv0), noise(uv0), noise(uv0), 1.0);
        }
    `


    //噪音 烟雾
    // frag:`
    // const vec2 u_resolution = vec2(640,1136);
    // // uniform vec2 u_resolution;
    // uniform vec2 u_mouse;
    // uniform float time;

    // float random (in vec2 _st) {
    //     return fract(sin(dot(_st.xy,
    //                         vec2(12.9898,78.233)))*
    //         43758.5453123);
    // }

    // // Based on Morgan McGuire @morgan3d
    // // https://www.shadertoy.com/view/4dS3Wd
    // float noise (in vec2 _st) {
    //     vec2 i = floor(_st);
    //     vec2 f = fract(_st);

    //     // Four corners in 2D of a tile
    //     float a = random(i);
    //     float b = random(i + vec2(1.0, 0.0));
    //     float c = random(i + vec2(0.0, 1.0));
    //     float d = random(i + vec2(1.0, 1.0));

    //     vec2 u = f * f * (3.0 - 2.0 * f);

    //     return mix(a, b, u.x) +
    //             (c - a)* u.y * (1.0 - u.x) +
    //             (d - b) * u.x * u.y;
    // }

    // #define NUM_OCTAVES 5

    // float fbm ( in vec2 _st) {
    //     float v = 0.0;
    //     float a = 0.5;
    //     vec2 shift = vec2(100.0);
    //     // Rotate to reduce axial bias
    //     mat2 rot = mat2(cos(0.5), sin(0.5),
    //                     -sin(0.5), cos(0.50));
    //     for (int i = 0; i < NUM_OCTAVES; ++i) {
    //         v += a * noise(_st);
    //         _st = rot * _st * 2.0 + shift;
    //         a *= 0.5;
    //     }
    //     return v;
    // }

    // void main() {
    //     vec2 st = gl_FragCoord.xy/u_resolution.xy*3.;
    //     // st += st * abs(sin(time*0.1)*3.0);
    //     vec3 color = vec3(0.0);

    //     vec2 q = vec2(0.);
    //     q.x = fbm( st + 0.00*time);
    //     q.y = fbm( st + vec2(1.0));

    //     vec2 r = vec2(0.);
    //     r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*time );
    //     r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*time);

    //     float f = fbm(st+r);

    //     color = mix(vec3(0.101961,0.619608,0.666667),
    //                 vec3(0.666667,0.666667,0.498039),
    //                 clamp((f*f)*4.0,0.0,1.0));

    //     color = mix(color,
    //                 vec3(0,0,0.164706),
    //                 clamp(length(q),0.0,1.0));

    //     color = mix(color,
    //                 vec3(0.666667,1,1),
    //                 clamp(length(r.x),0.0,1.0));

    //     gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
    // }
    // `
    // frag: `

    // uniform float time;
    // uniform sampler2D iTexture;
    // uniform vec3 iResolution;
    // uniform vec4 color;
    // varying vec2 uv0;

    // vec3 hsv2rgb (in vec3 hsv) {
    //     hsv.yz = clamp (hsv.yz, 0.0, 1.0);
    //     return hsv.z * (1.0 + 0.5 * hsv.y * (cos (2.0 * 3.14159 * (hsv.x + vec3 (0.0, 2.0 / 3.0, 1.0 / 3.0))) - 1.0));
    // }

    // float rand (in vec2 seed) {
    //     return fract (sin (dot (seed, vec2 (12.9898, 78.233))) * 137.5453);
    // }
    // void main(){
    //     vec2 p = gl_FragCoord.xy / iResolution.xy;
    //     vec2 frag = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
    //     frag *= 1.0 - 0.2 * cos (frag.yx) * sin (3.14159 * 0.5 * texture2D (iTexture, vec2 (0.0)).x);
    //     frag *= 5.0;
    //     float random = rand (floor (frag));
    //     vec2 black = smoothstep (1.0, 0.8, cos (frag * 3.14159 * 2.0));
    //     vec3 color = hsv2rgb (vec3 (random, 1.0, 1.0));
    //     color *= black.x * black.y * smoothstep (1.0, 0.0, length (fract (frag) - 0.5));
    //     color *= 0.5 + 0.5 * cos (random + random * time + time + 3.14159 * 0.5 * texture2D (iTexture, vec2 (0.7)).x);
    //     gl_FragColor = vec4 (color, 1.0);
    // }

    // `
    // frag: `
    // uniform float time;
    // uniform sampler2D iTexture;
    // uniform vec3 iResolution;
    // uniform vec4 color;
    // varying vec2 uv0;
    //         //Calculate the squared length of a vector
    // float length2(vec2 p){
    //     return dot(p,p);
    // }

    // //Generate some noise to scatter points.
    // float noise(vec2 p){
    //     return fract(sin(fract(sin(p.x) * (43.13311)) + p.y) * 31.0011);
    // }

    // float worley(vec2 p) {
    //     //Set our distance to infinity
    //     float d = 1e30;
    //     //For the 9 surrounding grid points
    //     for (int xo = -1; xo <= 1; ++xo) {
    //         for (int yo = -1; yo <= 1; ++yo) {
    //             //Floor our vec2 and add an offset to create our point
    //             vec2 tp = floor(p) + vec2(xo, yo);
    //             //Calculate the minimum distance for this grid point
    //             //Mix in the noise value too!
    //             d = min(d, length2(p - tp - noise(tp)));
    //         }
    //     }
    //     return 3.0*exp(-4.0*abs(2.5*d - 1.0));
    // }

    // float fworley(vec2 p) {
    //     //Stack noise layers 
    //     return sqrt(sqrt(sqrt(
    //         worley(p*5.0 + 0.05*time) *
    //         sqrt(worley(p * 50.0 + 0.12 + -0.1*time)) *
    //         sqrt(sqrt(worley(p * -10.0 + 0.03*time))))));
    // }
    // void main(){
    //     vec2 uv = gl_FragCoord.xy / iResolution.xy;
    //     //Calculate an intensity
    //     float t = fworley(uv * iResolution.xy / 1500.0);
    //     //Add some gradient
    //     t*=exp(-length2(abs(0.7*uv - 1.0)));	
    //     //Make it blue!
    //     gl_FragColor = vec4(t * vec3(0.1, 1.1*t, pow(t, 0.5-t)), 1.0);
    // }
    // `

};

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines);
});

module.exports = shader;