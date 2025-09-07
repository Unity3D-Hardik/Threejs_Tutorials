import * as THREE from 'three';

let scene, camera, renderer, cube;
let ChaserCube , TargetCube;


const speed = 0.05;
const targetRadius = 10;

// --- Initialization Function ---
function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera topdown view
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 20, 0);
    camera.lookAt(0, 0, 0);


    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Ambiant Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // create ground plane 
    const planeGeometry = new THREE.PlaneGeometry(50 , 50);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = -1;
    scene.add(plane);

    // Chaser Cube
    const chaserGeometry = new THREE.BoxGeometry(1, 1, 1);
    const chaserMaterial = new THREE.MeshStandardMaterial({ color: 'green' });
    ChaserCube = new THREE.Mesh(chaserGeometry, chaserMaterial);
    ChaserCube.position.set(0, 0.5, 0);
    scene.add(ChaserCube);

    // Target Cube
    const targetGeometry = new THREE.BoxGeometry(1, 1, 1);
    const targetMaterial = new THREE.MeshStandardMaterial({ color: 'red' });
    TargetCube = new THREE.Mesh(targetGeometry, targetMaterial);
    resetTargetCubePosition();
    scene.add(TargetCube);

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    animate();
}

function resetTargetCubePosition() {
    const angle = Math.random() * 2 * Math.PI;
    TargetCube.position.set(targetRadius * Math.cos(angle), 0.5, targetRadius * Math.sin(angle));
}

function animate() {
    requestAnimationFrame(animate);
    moveChaserTowardsTarget();
    renderer.render(scene, camera);
}

function moveChaserTowardsTarget() {
    const direction = new THREE.Vector3().subVectors(TargetCube.position, ChaserCube.position);
    const distance = direction.length();
    if (distance < 1.2) {   
        resetTargetCubePosition();
        return;
    }
    direction.normalize();
    ChaserCube.position.addScaledVector(direction, Math.min(speed, distance));
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}   

init();

// --- Animation Loop ---

