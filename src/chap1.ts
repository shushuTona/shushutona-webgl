import * as THREE from 'three';

class Chap1 {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private axes: THREE.AxesHelper;

    // plane
    private plane: THREE.Mesh;
    private planeGeometry: THREE.PlaneGeometry;
    private planeMaterial: THREE.MeshLambertMaterial;

    // cube
    private cube: THREE.Mesh;
    private cubeGeometry: THREE.BoxGeometry;
    private cubeMaterial: THREE.MeshLambertMaterial;

    // square
    private square: THREE.Mesh;
    private squareGeometry: THREE.SphereGeometry;
    private squareMaterial: THREE.MeshLambertMaterial;
    private step: number;

    // spotLight
    private spotLight: THREE.SpotLight;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45,
            800 / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor( new THREE.Color(0xEEEEEE) );
        this.renderer.setSize( 800, window.innerHeight );
        this.renderer.shadowMap.enabled = true;

        this.axes = new THREE.AxesHelper( 20 );
        this.scene.add( this.axes );

        // plane
        this.planeGeometry = new THREE.PlaneGeometry( 60, 20 );
        this.planeMaterial = new THREE.MeshLambertMaterial( {
            color: 0xffffff
        } );
        this.plane = new THREE.Mesh( this.planeGeometry, this.planeMaterial );
        this.plane.rotation.x = -0.5 * Math.PI;
        this.plane.position.x = 15;
        this.plane.position.y = 0;
        this.plane.position.z = 0;
        this.plane.receiveShadow = true;
        this.scene.add( this.plane );

        // cube
        this.cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 );
        this.cubeMaterial = new THREE.MeshLambertMaterial( {
            color: 0xff0000
        } );
        this.cube = new THREE.Mesh( this.cubeGeometry, this.cubeMaterial );
        this.cube.position.x = -4;
        this.cube.position.y = 3;
        this.cube.position.z = 0;
        this.cube.castShadow = true;
        this.scene.add( this.cube );

        // square
        this.squareGeometry = new THREE.SphereGeometry( 4, 20, 20 );
        this.squareMaterial = new THREE.MeshLambertMaterial( {
            color: 0x7777ff
        } );
        this.square = new THREE.Mesh( this.squareGeometry, this.squareMaterial );
        this.square.position.x = 20;
        this.square.position.y = 4;
        this.square.position.z = 2;
        this.square.castShadow = true;
        this.step = 0;
        this.scene.add( this.square );

        // spotLight
        this.spotLight = new THREE.SpotLight( 0xffffff );
        this.spotLight.position.set( -20, 30, -5 );
        this.spotLight.castShadow = true;
        this.scene.add( this.spotLight );

        this.camera.position.x = -30;
        this.camera.position.y = 40;
        this.camera.position.z = 30;
        this.camera.lookAt( this.scene.position );

        this.renderer.domElement.id = 'chap1';
        document.body.appendChild( this.renderer.domElement );

        this.renderScene();

        let timer: NodeJS.Timer;
        window.addEventListener( 'resize', () => {
            clearTimeout( timer );

            timer = setTimeout( () => {
                const widthValue = ( window.innerWidth >= 800 ) ? 800 : window.innerWidth;

                this.camera.aspect = widthValue / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize( widthValue, window.innerHeight );
            }, 300 );
        } );
    }

    renderScene() {
        this.step += 0.04;
        this.square.position.x = 20 + ( 10 * Math.cos( this.step ) );
        this.square.position.y = 2 + ( 10 * Math.abs(Math.sin( this.step )) );

        this.cube.rotation.x += 0.02;
        this.cube.rotation.y += 0.02;
        this.cube.rotation.z += 0.02;

        requestAnimationFrame( () => {
            this.renderScene();
        } );

        this.renderer.render( this.scene, this.camera );
    }
}

export { Chap1 };
