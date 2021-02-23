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
    private box: THREE.Group;
    private sphere: THREE.Group;
    private cylinder: THREE.Group;
    private torus: THREE.Group;
    private torusKnot: THREE.Group;
    private icosahedron: THREE.Group;
    private tetrahedron: THREE.Group;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = this.createCamera();
        this.renderer = this.createRenderer();

        this.scene.add( this.camera );

        // plane
        this.plane = this.createMesh( new THREE.PlaneGeometry( 20, 20, 6, 6 ) );
        this.plane.rotation.x = Math.PI * -0.5;
        this.plane.position.set( -5, -20, -5 );
        this.scene.add( this.plane );

        // circle
        this.circle = this.createMesh( new THREE.CircleGeometry( 2 * Math.PI, 12 ) );
        this.circle.rotation.x = Math.PI * -0.5;
        this.circle.position.set( -5, -5, -5 );
        this.scene.add( this.circle );

        // ring
        this.ring = this.createMesh( new THREE.RingGeometry( 5, 10, 12) );
        this.ring.rotation.x = Math.PI * -0.5;
        this.ring.position.set( -5, -10, -5 );
        this.scene.add( this.ring );

        // shape
        this.shape = this.createMesh( new THREE.ShapeGeometry( this.drawShape() ) );
        this.shape.rotation.x = Math.PI * -0.2;
        this.shape.position.set( -10, 0, 0 );
        // this.scene.add( this.shape );

        // box
        this.box = this.createMesh( new THREE.BoxGeometry( 10, 10, 10, 5, 5, 5 ));
        this.box.rotation.y = Math.PI * -1.8;
        this.box.position.set( -5, 0, 22 );
        this.scene.add( this.box );

        // sphere
        this.sphere = this.createMesh( new THREE.SphereGeometry( 5, 13, 8, 0, 4.3, 1, 0.9 ) );
        this.sphere.rotation.z = Math.PI * -1.2;
        this.sphere.position.set( 15, 10, -10 );
        this.scene.add( this.sphere );

        // cylinder
        this.cylinder = this.createMesh( new THREE.CylinderGeometry( 3, 3, 10, 15, 5, true, 2, 4.5 ) );
        this.cylinder.position.set( 20, 0, 0 );
        this.cylinder.rotation.z = Math.PI * -0.2;
        this.scene.add( this.cylinder );

        // torus
        this.torus = this.createMesh( new THREE.TorusGeometry( 5, 1, 15, 15, Math.PI * 1.2 ) );
        this.torus.position.set( -15, 10, 15 );
        this.torus.rotation.y = Math.PI * 0.1;
        this.torus.rotation.x = Math.PI * -0.5;
        this.scene.add( this.torus );

        // torusKnot
        this.torusKnot = this.createMesh( new THREE.TorusKnotGeometry( 5, 1, 80, 10, 2, 5 ) );
        this.torusKnot.position.set( -20, 5, -10 );
        this.scene.add( this.torusKnot );

        // icosahedron
        this.icosahedron = this.createMesh( new THREE.IcosahedronGeometry( 2, 1 ) );
        this.icosahedron.position.set( 13, 5, 13 );
        this.scene.add( this.icosahedron );

        // tetrahedron
        this.tetrahedron = this.createMesh( new THREE.TetrahedronGeometry( 8, 1 ) );
        this.tetrahedron.position.set( 0, 15, -15 );
        this.scene.add( this.tetrahedron );

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
        shape.quadraticCurveTo( 10, 20, 10, 10 );

        return shape;
    }
}

export { Chap5 };
