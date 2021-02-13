import * as THREE from 'three';

class Chap3 {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    // private axes: THREE.AxesHelper;

    // plane
    private plane: THREE.Mesh;
    private planeGeometry: THREE.PlaneGeometry;
    private planeMaterial: THREE.MeshLambertMaterial;

    // sphere
    private sphere: THREE.Mesh;
    private sphereGeometry: THREE.SphereGeometry;
    private sphereMaterial: THREE.MeshLambertMaterial;

    // Light
    private spotLight: THREE.SpotLight;
    private ambientLight: THREE.AmbientLight;
    private pointLight: THREE.PointLight;
    private directionalLight: THREE.DirectionalLight;
    private hemisphereLight: THREE.HemisphereLight;
    // private cameraHelper: THREE.CameraHelper;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45,
            800 / 500,
            0.1,
            1000
        );
        this.camera.position.set( 60, 30, 60 );
        this.camera.lookAt( this.scene.position );
        this.scene.add( this.camera );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor( new THREE.Color( 0xffffff ) );
        this.renderer.setSize( 800, 500 );
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // this.axes = new THREE.AxesHelper( 20 );
        // this.scene.add( this.axes );

        this.planeGeometry = new THREE.PlaneGeometry( 60, 60, 1, 1 );
        this.planeMaterial = new THREE.MeshLambertMaterial( {
            color: 0xffffff
        });
        this.plane = new THREE.Mesh( this.planeGeometry, this.planeMaterial );
        this.plane.position.set( 0, 0, 0 );
        this.plane.rotation.x = -0.5 * Math.PI;
        this.plane.receiveShadow = true;

        this.scene.add( this.plane );

        this.sphereGeometry = new THREE.SphereGeometry( 4, 10, 10 );
        this.sphereMaterial = new THREE.MeshLambertMaterial( {
            color: 0x00ff00
        } );
        this.sphere = new THREE.Mesh( this.sphereGeometry, this.sphereMaterial );
        this.sphere.position.set( 0, 5, 0 );
        this.sphere.castShadow = true;
        this.scene.add( this.sphere );

        // spotLight
        this.spotLight = new THREE.SpotLight( 0xffffff );
        this.spotLight.position.set( 0, 40, 0 );
        this.spotLight.castShadow = true;
        this.spotLight.target = this.sphere;
        // this.spotLight.angle = 1;
        // this.spotLight.distance = 80;
        this.spotLight.intensity = 0.5;
        this.spotLight.shadow.camera.far = 50;
        this.spotLight.shadow.camera.fov = 30;
        this.scene.add( this.spotLight );

        // ambientLight
        this.ambientLight = new THREE.AmbientLight( 0x606060 );
        this.scene.add( this.ambientLight );

        // pointLight
        this.pointLight = new THREE.PointLight( 0xaaffdd );
        this.pointLight.position.set( 15, 15, 15 );
        this.pointLight.intensity = 1.5;
        this.pointLight.decay = 0.1;
        this.pointLight.distance = 15;
        this.scene.add( this.pointLight );

        // directionalLight
        this.directionalLight = new THREE.DirectionalLight( 0x0e0e0e );
        this.directionalLight.position.set( 30, 100, 0 );
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.camera.top = 10;
        this.directionalLight.shadow.camera.bottom = -10;
        this.directionalLight.shadow.camera.left = -10;
        this.directionalLight.shadow.camera.right = 10;
        // this.scene.add( this.directionalLight );

        // hemisphereLight
        this.hemisphereLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 );
        this.hemisphereLight.position.set( 0, 500, 0 );
        this.scene.add( this.hemisphereLight );

        // cameraHelper
        // this.cameraHelper = new THREE.CameraHelper( this.spotLight.shadow.camera );
        // this.scene.add( this.cameraHelper );

        this.renderer.domElement.id = 'chap3';
        document.body.appendChild( this.renderer.domElement );

        this.renderer.render( this.scene, this.camera );

        let count = 5;
        const animation = () => {
            count += 0.05;
            this.sphere.position.y = 5 + ( 15 * Math.abs( Math.sin( count ) ) );

            this.renderer.render( this.scene, this.camera );

            requestAnimationFrame( animation );
        }

        animation();
    }
}

export { Chap3 };
