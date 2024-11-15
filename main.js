import * as THREE from 'three';
import vertexShader from './vertexShader.vert?raw';
import fragmentShader from './fragmentShader.frag?raw';

var container;
var camera, scene, renderer, clock;
var uniforms;


init();
animate();

function init() {
    container = document.getElementById( 'container' );
    snippet = document.getElementById( 'snippet' );
    snippet.innerHTML = fragmentShader;

    camera = new THREE.Camera();
    camera.position.z = 1;

    scene = new THREE.Scene();
    clock = new THREE.Clock();

    var geometry = new THREE.PlaneGeometry( 2, 2 );

    uniforms = {
	u_time: { type: "f", value: 1.0 },
	u_resolution: { type: "v2", value: new THREE.Vector2() },
	u_mouse: { type: "v2", value: new THREE.Vector2() }
    };

    var material = new THREE.ShaderMaterial( {
	uniforms: uniforms,
	vertexShader,
	fragmentShader
    } );

    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );

    container.appendChild( renderer.domElement );

    const resizeObserver = new ResizeObserver(onContainerResize);
    resizeObserver.observe(container);

    container.addEventListener("mousemove", (e) => {
        uniforms.u_mouse.value.x = e.offsetX;
        uniforms.u_mouse.value.y = e.offsetY;
    })
}

function onContainerResize( entries ) {
    const { height, width } = entries[0].contentRect
    renderer.setSize( width, height );
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    uniforms.u_time.value += clock.getDelta();
    renderer.render( scene, camera );
}
