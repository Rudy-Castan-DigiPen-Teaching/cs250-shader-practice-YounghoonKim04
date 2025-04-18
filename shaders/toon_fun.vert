#version 300 es


precision mediump float;


uniform mat4 u_modelViewProjectionMatrix;
uniform mat3 u_normalMatrix;

in vec4 a_position;


in vec3  a_normal;
out vec3 v_normal;

void main(void)
{
    v_normal    = u_normalMatrix * a_normal;
    gl_Position = u_modelViewProjectionMatrix * a_position;
}
