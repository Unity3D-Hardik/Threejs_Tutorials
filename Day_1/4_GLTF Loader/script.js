import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let scene, camera, renderer, model;


// Initialize the scene
function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
        'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
        function (gltf) {
            model = gltf.scene;
            scene.add(model);
            console.log('Model loaded successfully!');
        },
        // Optional: progress callback
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Optional: error callback
        function (error) {
            console.error('An error occurred loading the model', error);
        }
    );

    // Handle window resizing
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    if (window.innerWidth === 0 || window.innerHeight === 0) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    // Example: Rotate the model
    if (model) {
        model.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}

// Start the application
init();
animate();