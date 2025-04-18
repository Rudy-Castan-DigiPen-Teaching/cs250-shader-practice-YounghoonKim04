#version 300 es

precision mediump float;

out vec4 FragColor;

in vec3 v_normal;

uniform vec3 u_light;

void main(void)
{
    vec3       n   = normalize(v_normal);
    FragColor  = vec4((n*0.5)+vec3(0.5), 1.0);
}
