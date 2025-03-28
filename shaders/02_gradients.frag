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

#define PI 3.14159265359

out vec4 FragColor;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.149, 0.141, 0.912);
vec3 colorB = vec3(1.000, 0.833, 0.224);

float plot(vec2 st, float pct) {
    return smoothstep(pct - 0.01, pct, st.y) - smoothstep(pct, pct + 0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x += sin(u_time + st.y * 10.0) * 0.05;
    
    vec3 color = vec3(0.0);
    vec3 pct = vec3(st.x);

    pct.r = smoothstep(0.0, 1.0, sin(u_time) * 0.5 + 0.5);
    pct.g = sin(st.x * PI + u_time * 2.0);
    pct.b = pow(st.x + sin(u_time), 0.5);
    
    color = mix(colorA, colorB, pct);
    
    float dist = distance(st, u_mouse / u_resolution);
    color *= 1.0 - smoothstep(0.2, 0.5, dist);
    
    color = mix(color, vec3(1.0, 0.0, 0.0), plot(st, pct.r));
    color = mix(color, vec3(0.0, 1.0, 0.0), plot(st, pct.g));
    color = mix(color, vec3(0.0, 0.0, 1.0), plot(st, pct.b));
    
    FragColor = vec4(color, 1.0);
}
