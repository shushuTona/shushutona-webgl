import * as THREE from 'three';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';

class Chap4 {
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private spotLight: THREE.SpotLight;

    constructor() {
        this.scene = new THREE.Scene();

        this.renderer = this.createRenderer();

        this.camera = this.createCamera();
        this.scene.add( this.camera );

        this.spotLight = new THREE.SpotLight( 0xffffff );
        this.spotLight.position.set( -0, 30, 60 );
        this.spotLight.castShadow = true;
        this.spotLight.intensity = 0.6;
        this.scene.add( this.spotLight );

        this.addBasicCube( -30, -30, 10 );

        this.addDepthCube( 0, 0, 0 );
        this.addDepthCube( 0, 10, 0 );
        this.addDepthCube( 0, -10, 0 );

        this.addMultiCube( 10, 0, -20 );

        this.addStandardCube( -10, 10, 10 );

        this.addLine();
    }

    renderScene() {
        this.renderer.render( this.scene, this.camera );
    }

    createRenderer(): THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer();

        renderer.setClearColor( new THREE.Color( 0x000000 ) );
        renderer.setSize( 800, 500 );
        renderer.shadowMap.enabled = true;

        renderer.domElement.id = 'chap4';
        document.body.appendChild( renderer.domElement );

        return renderer;
    }

    createCamera(): THREE.PerspectiveCamera {
        const camera = new THREE.PerspectiveCamera(
            45,
            800 / 500,
            30,
            200
        );
        camera.position.set( 20, 40, 20 );
        camera.lookAt( 0, 0, 0 );

        return camera;
    }

    addBasicCube( x = 0, y = 0, z = 0 ) {
        const cubeGeometry = new THREE.BoxGeometry( 10, 10, 10 );
        const cubeMaterial = new THREE.MeshBasicMaterial( {
            color: '#ff0000',
            transparent: true,
            opacity: 0.5
        } );
        const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

        cube.position.set( x, y, z );

        this.scene.add( cube );

        this.renderScene();
    }

    addDepthCube( x = 0, y = 0, z = 0 ) {
        const cubeMaterial = new THREE.MeshDepthMaterial();
        const colorMaterial = new THREE.MeshBasicMaterial( {
            color: 0x00ff00,
            transparent: true,
            blending: THREE.MultiplyBlending
        } );
        const cube = SceneUtils.createMultiMaterialObject(
            new THREE.BoxGeometry( 5, 5, 5 ),
            [
                colorMaterial,
                cubeMaterial
            ]
        );

        cube.position.set( x, y, z );
        cube.children[1].scale.set( 0.99, 0.99, 0.99 );
        cube.castShadow = true;

        this.scene.add( cube );

        this.renderScene();
    }

    addMultiCube( x = 0, y = 0, z = 0 ) {
        const multiMaterial = [
            new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
            new THREE.MeshBasicMaterial({ color: 0xff0000 }),
            new THREE.MeshBasicMaterial({ color: 0xff0000 }),
            new THREE.MeshBasicMaterial({ color: 0x0000ff }),
            new THREE.MeshBasicMaterial({ color: 0x0000ff }),
            new THREE.MeshBasicMaterial({ color: 0x000000 }),
            new THREE.MeshBasicMaterial({ color: 0x000000 }),
            new THREE.MeshBasicMaterial({ color: 0x00f0f0 }),
            new THREE.MeshBasicMaterial({ color: 0x00f0f0 }),
            new THREE.MeshBasicMaterial({ color: 0xffffff }),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        ];

        const cube = new THREE.Mesh(
            new THREE.BoxGeometry( 10, 10, 10 ),
            multiMaterial
        );

        cube.position.set( x, y, z );
        cube.castShadow = true;

        this.scene.add( cube );

        this.renderScene();
    }

    addStandardCube( x = 0, y = 0, z = 0 ) {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry( 10, 10, 10 ),
            new THREE.MeshStandardMaterial( {
                color: 0x7777ff
            } )
        );
        cube.position.set( x, y, z );
        cube.castShadow = true;

        this.scene.add( cube );
        this.renderScene();
    }

    addLine() {
        const material = new THREE.LineBasicMaterial( {
            color: 0xffffff
        } );

        const points = [];
        points.push( new THREE.Vector3( -10, 0, 0 ) );
        points.push( new THREE.Vector3( 0, 10, 0 ) );
        points.push( new THREE.Vector3( 10, 0, 0 ) );

        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const line = new THREE.Line( geometry, material );
        this.scene.add( line );
        this.renderScene();
    }
}

export { Chap4 };
