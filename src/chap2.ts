import * as THREE from 'three';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';

class Chap2 {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private plane: THREE.Mesh;
    private planeGeometry: THREE.PlaneGeometry;
    private planeMaterial: THREE.MeshLambertMaterial;
    private ambientLight: THREE.AmbientLight;
    private spotLight: THREE.SpotLight;
    private count: number;

    constructor() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2( 0xffffff, 0.015 );

        // camera
        this.camera = new THREE.PerspectiveCamera(
            40,
            800 / 500,
            0.1,
            2000
        );
        this.camera.position.x = -50;
        this.camera.position.y = 20;
        this.camera.position.z = -50;
        this.camera.lookAt( this.scene.position );
        this.scene.add( this.camera );

        // renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor( new THREE.Color( 0xEEEEEE ) );
        this.renderer.setSize( 800, 500 );
        this.renderer.shadowMap.enabled = true;

        // plane
        this.planeGeometry = new THREE.PlaneGeometry( 60, 60, 1, 1 );
        this.planeMaterial = new THREE.MeshLambertMaterial( {
            color: 0xffffff
        } );
        this.plane = new THREE.Mesh( this.planeGeometry, this.planeMaterial );
        this.plane.position.x = 0;
        this.plane.position.y = 0;
        this.plane.position.z = 0;
        this.plane.rotation.x = -0.5 * Math.PI;
        this.plane.receiveShadow = true;
        this.scene.add( this.plane );

        // ambientLight
        this.ambientLight = new THREE.AmbientLight( 0x0c0c0c );
        this.scene.add( this.ambientLight );

        // spotLight
        this.spotLight = new THREE.SpotLight( 0xffffff );
        this.spotLight.position.set( -30, 20, -30 );
        this.spotLight.castShadow = true;
        this.scene.add( this.spotLight );

        this.renderer.domElement.id = 'chap2';
        document.body.appendChild( this.renderer.domElement );

        this.renderer.render( this.scene, this.camera );

        this.count = 0;
        let timer: NodeJS.Timer;

        timer = setInterval( () => {
            if ( this.count < 5 ) {
                this.count++;
                this.addCube();
            } else {
                clearInterval( timer );

                const cubeRotation = () => {
                    this.scene.traverse( ( threeObj ) => {
                        if (
                            threeObj instanceof THREE.Mesh &&
                            threeObj !== this.plane
                        ) {
                            threeObj.rotation.x += 0.02;
                            threeObj.rotation.y += 0.02;
                            threeObj.rotation.z += 0.02;
                        }
                    } );

                    this.renderer.render( this.scene, this.camera );
                    requestAnimationFrame( cubeRotation );
                };

                cubeRotation();

                // setTimeout(() => {
                //     this.scene.overrideMaterial = new THREE.MeshLambertMaterial( {
                //         color: 0xff0000,
                //         opacity: 0.1
                //     } );
                // }, 1000);
            }
        }, 1000 );
    }

    addCube() {
        const cubeGeometry = new THREE.BoxGeometry( this.count, this.count, this.count );
        const materials = [
            new THREE.MeshLambertMaterial( {
                opacity: 0.9,
                color: 0xff0000,
                transparent: true
            } ),
            new THREE.MeshBasicMaterial( {
                color: 0xaa0000,
                wireframe: true
            } )
        ];
        const cube = SceneUtils.createMultiMaterialObject( cubeGeometry, materials );
        cube.children.forEach( ( obj: THREE.Object3D ) => {
            obj.castShadow = true;
        } );

        cube.name = `cube-${this.count}`;
        cube.position.set(
            -30 + this.count * 4,
            this.count * 4,
            -30 + this.count * 4
        );
        cube.rotation.set(
            this.count * 5,
            this.count * 5,
            this.count * 5
        );

        cube.children[1].scale.set( 1.2, 1.2, 1.2 );

        this.scene.add( cube );
        this.renderer.render( this.scene, this.camera );
    }
}

export { Chap2 };
