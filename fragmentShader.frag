uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float curve(vec2 st, vec2 mousest) {
    return abs(st.y-0.5 - 0.5*(1.0-mousest.y)*sin(20.0*st.x-10.0*mousest.x*u_time));
}

float plot(float x) {    
    return smoothstep(0.02, 0.0, x);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mousest = u_mouse.xy/u_resolution.xy;
    
    float isOnCurve = curve(st, mousest);

    vec3 color = vec3(isOnCurve, 0.4, 0.5);

    // Plot a line
    float pct = plot(isOnCurve);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,1.0);

	gl_FragColor = vec4(color,1.0);
}
