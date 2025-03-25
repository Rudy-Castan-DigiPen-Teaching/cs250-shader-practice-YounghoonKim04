#version 300 es
precision mediump float;

/**
 * \file
 * \author Younghoon Kim
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */


out vec4 FragColor;
uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359

float plot(vec2 st, float pct){

  return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec2 st = gl_FragCoord.xy / u_resolution;
    
    float y = fract(sin(st.x * 123.456) * 654.321 - u_time * 0.5);
    
    float pct = plot(st, y);
    
    vec3 color = mix(vec3(0.0, 0.0, 0.5), vec3(1.0, 0.5, 0.0), st.y);
    color = mix(color, vec3(0.9961, 1.0, 0.9216), pct);
    
    FragColor = vec4(color, 1.0);
}
