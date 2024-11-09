uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mousest = u_mouse.xy/u_resolution.xy;
    gl_FragColor=vec4(sin(5.0*u_time)*(st.y-0.5-0.5*abs((sin(20.0*st.x)))),0.0,0.5,1.0);
}
