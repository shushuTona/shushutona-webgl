import * as THREE from 'three';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';

class Chap5 {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private plane: THREE.Group;
    private circle: THREE.Group;
    private ring: THREE.Group;
    private shape: THREE.Group;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = this.createCamera();
        this.renderer = this.createRenderer();

        this.scene.add( this.camera );

        // plane
        this.plane = this.createMesh( new THREE.PlaneGeometry( 30, 30, 6, 6 ) );
        this.plane.rotation.x = Math.PI * -0.5;
        this.plane.position.set( 0, 0, 0 );
        this.scene.add( this.plane );

        // circle
        this.circle = this.createMesh( new THREE.CircleGeometry( 2 * Math.PI, 12 ) );
        this.circle.rotation.x = Math.PI * -0.5;
        this.circle.position.set( 0, 10, 0 );
        this.scene.add( this.circle );

        // ring
        this.ring = this.createMesh( new THREE.RingGeometry( 5, 10, 12) );
        this.ring.rotation.x = Math.PI * -0.5;
        this.ring.position.set( 0, 15, 0 );
        this.scene.add( this.ring );

        // shape
        this.shape = this.createMesh( new THREE.ShapeGeometry( this.drawShape() ) );
        this.shape.rotation.x = Math.PI * -0.2;
        this.shape.position.set( -5, 5, 15 );
        this.scene.add( this.shape );

        this.renderer.render( this.scene, this.camera );
    }

    createRenderer(): THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer();

        renderer.setClearColor( new THREE.Color( 0xffffff ) );
        renderer.setSize( 800, 500 );
        renderer.shadowMap.enabled = true;

        renderer.domElement.id = 'chap5';
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
        camera.position.set( 30, 30, 30 );
        camera.lookAt( 0, 0, 0 );

        return camera;
    }

    createMesh( geom: THREE.BufferGeometry ): THREE.Group {
        const meshMaterial = new THREE.MeshNormalMaterial();
        const wireFrameMaterial = new THREE.MeshBasicMaterial();

        meshMaterial.side = THREE.DoubleSide;
        wireFrameMaterial.wireframe = true;

        const mesh = SceneUtils.createMultiMaterialObject( geom, [meshMaterial, wireFrameMaterial] );

        return mesh;
    }

    drawShape(): THREE.Shape {
        const shape = new THREE.Shape();

        shape.moveTo( 0, 0 ); // 開始点
        shape.lineTo( 10, 10 );
        shape.bezierCurveTo( 15, 25, 25, 25, 30, 40 );
        shape.splineThru( [
            new THREE.Vector2( 32, 30 ),
            new THREE.Vector2( 28, 20 ),
            new THREE.Vector2( 30, 10 )
        ] );
        shape.quadraticCurveTo( 20, 15, 10, 10 );

        return shape;
    }
}

export { Chap5 };
