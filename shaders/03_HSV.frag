#version 300 es
precision mediump float;

/**
 * \file
 * \author Younghoon Kim
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

#ifdef GL_ES
precision mediump float;
#endif

out vec4 FragColor;
uniform vec2 u_resolution;
uniform float u_time;

vec3 rgb2hsb(in vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsb2rgb(in vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    rgb = rgb * rgb * (3.0 - 2.0 * rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);
    
    float hue = mod(st.x + u_time * 0.1, 1.0);
    float sat = sin(u_time + st.y * 3.0) * 0.5 + 0.5;
    float bright = smoothstep(0.0, 1.0, st.y);
    
    color = hsb2rgb(vec3(hue, sat, bright));
    
    FragColor = vec4(color, 1.0);
}