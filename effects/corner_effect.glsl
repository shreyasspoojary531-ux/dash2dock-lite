uniform sampler2D tex;
uniform float width;
uniform float height;
uniform float radius;

// Signed distance to a rounded box
float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + vec2(r);
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2(0.0))) - r;
}

void main() {
    vec4 c = texture2D(tex, cogl_tex_coord_in[0].st);
    if (radius <= 0.0 || width <= 0.0 || height <= 0.0) {
        cogl_color_out = c;
        return;
    }

    vec2 halfSize = vec2(width * 0.5, height * 0.5);
    vec2 p = cogl_tex_coord_in[0].st * vec2(width, height) - halfSize;
    float r = min(radius, min(halfSize.x, halfSize.y));
    float dist = roundedBoxSDF(p, halfSize, r);

    // Smooth anti-aliased edge over 1.5 pixels
    float alpha = 1.0 - smoothstep(0.0, 1.5, dist);
    cogl_color_out = c * alpha;
}
