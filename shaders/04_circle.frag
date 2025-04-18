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
uniform vec2 u_mouse;
uniform float u_time;

vec2 to_coord(vec2 pixel_point)
{
    vec2 point = pixel_point / u_resolution;
    if(u_resolution.x > u_resolution.y)
    {
        point.x *= u_resolution.x / u_resolution.y;
        point.x += (u_resolution.y - u_resolution.x) / u_resolution.x;
    }
    else
    {
        point.y *= u_resolution.y / u_resolution.x;
        point.y += (u_resolution.x - u_resolution.y) / u_resolution.y;
    }
    return point;
}

float sCircle(vec2 point, vec2 center, float radius)
{
    return distance(point, center) - radius;
}

float circle(vec2 point, vec2 center, float radius)
{
    float sd = sCircle(point, center, radius);
    float E = fwidth(sd);
    return 1. - smoothstep(-E, E, sd);
}

void main(void)
{
    vec2 position = to_coord(gl_FragCoord.xy);

    vec2 norm_mouse = u_mouse / u_resolution;

    vec3 baseColor = vec3(norm_mouse.x, 0.5, norm_mouse.y);

    vec2 center = vec2(0.5);

    float orbitRadius = mix(0.1, 0.5, norm_mouse.x);
    float speedFactor = mix(0.5, 4.0, norm_mouse.y);
    float circleSize = mix(0.02, 0.1, norm_mouse.y);

    float angle = u_time * speedFactor;
    vec2 movingPoint = center + vec2(cos(angle), sin(angle)) * orbitRadius;

    float centerDot = circle(position, center, 0.025);

    float orbitDot = circle(position, movingPoint, circleSize);

    float lineWidth = 0.005;
    float line = smoothstep(lineWidth, 0.0, abs(dot(normalize(movingPoint - center), normalize(position - center)) - 1.0) * length(position - center));
    line *= step(distance(position, center), orbitRadius);

    vec3 color = baseColor;
    color = mix(color, vec3(1.0, 0.9333, 0.0), orbitDot);
    color = mix(color, vec3(1.0, 0.702, 0.9098), centerDot);
    color = mix(color, vec3(1.0, 1.0, 1.0), line);

    FragColor = vec4(color, 1.0);
}
