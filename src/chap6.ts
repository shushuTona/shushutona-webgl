import * as THREE from 'three';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';

class Chap6 {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = this.createCamera();
        this.renderer = this.createRenderer();

        // this.createConvex();
        // this.createLathe();
        // this.cretaExtrude();
        // this.createTube();
        this.createParametric();
        // this.createText();

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

    createConvex() {
        const points = [];

        for ( let i = 0; i < 20; i++ ) {
            const randomX = -15 + Math.round( Math.random() * 30 );
            const randomY = -15 + Math.round( Math.random() * 30 );
            const randomZ = -15 + Math.round( Math.random() * 30 );

            points.push( new THREE.Vector3( randomX, randomY, randomZ ) );

        }

        const sphereGroup = new THREE.Group();
        const sphereMaterial = new THREE.MeshBasicMaterial( {
            color: 0xff0000,
            transparent: false
        } );

        points.forEach( ( point ) => {
            const sphereGeometry = new THREE.SphereGeometry( 0.2 );
            const sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial );

            sphereMesh.position.copy( point );
            sphereGroup.add( sphereMesh );
        } );

        this.scene.add( sphereGroup );

        const convexGeometry = new ConvexGeometry( points );
        const convexMesh = this.createMesh( convexGeometry );

        this.scene.add( convexMesh );
    }

    createLathe() {
        const points = [];
        const height = 5;
        const count = 30;

        for ( let i = 0; i < count; i++ ) {
            points.push(new THREE.Vector2(
                    ( Math.sin( i * 0.2 ) + Math.cos( i * 0.3 ) ) * height + 12,
                    ( i - count ) + count / 2
                ));
        }

        const sphereGroup = new THREE.Group();
        sphereGroup.rotation.y = Math.PI / 2;
        sphereGroup.rotation.x = 0.5 * Math.PI;

        const sphereMaterial = new THREE.MeshBasicMaterial( {
            color: 0xff0000,
            transparent: false
        } );

        points.forEach( ( point ) => {
            const sphereGeometry = new THREE.SphereGeometry( 0.2 );
            const sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial );

            sphereMesh.position.set( point.x, point.y, 0 );
            sphereGroup.add( sphereMesh );
        } );

        this.scene.add( sphereGroup );

        const latheGeometry = new THREE.LatheGeometry(
            points,
            12,
            0,
            1.5 * Math.PI
        );

        const LatheMesh = this.createMesh( latheGeometry );
        LatheMesh.rotation.x = 0.5 * Math.PI;

        this.scene.add( LatheMesh );
    }

    cretaExtrude() {
        const shape = new THREE.Shape();

        shape.moveTo( 0, 0 ); // 開始点
        shape.lineTo( 10, 10 );
        shape.lineTo( 10, 0 );
        shape.lineTo( 0, 0 );
        shape.lineTo( 0, 10 );
        shape.lineTo( 10, 10 );

        const extrudePotion: THREE.ExtrudeGeometryOptions = {
            depth: 10,
            bevelThickness: 2,
            bevelSize: 1,
            bevelSegments: 3,
            bevelEnabled: true,
            curveSegments: 12,
            steps: 1
        }

        const extrudeMesh = this.createMesh( new THREE.ExtrudeGeometry( shape, extrudePotion ) );

        this.scene.add( extrudeMesh );
    }

    createTube() {
        const points = [];

        for ( let i = 0; i < 10; i++ ) {
            const positionX = -20 + Math.round( Math.random() * 50);
            const positionY = -15 + Math.round( Math.random() * 40);
            const positionZ = -20 + Math.round( Math.random() * 40 );

            points.push( new THREE.Vector3( positionX, positionY, positionZ ) );
        }

        const sphereGroup = new THREE.Group();
        const sphereMaterial = new THREE.MeshBasicMaterial( {
            color: 0xff0000,
            transparent: false
        } );

        points.forEach( ( point ) => {
            const sphereGeometry = new THREE.SphereGeometry( 0.2 );
            const sphereMesh = new THREE.Mesh( sphereGeometry , sphereMaterial );

            sphereMesh.position.copy( point );
            sphereGroup.add( sphereMesh );
        } );

        this.scene.add( sphereGroup );

        const tubeGeometry = new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3( points ),
            100,
            0.8
        );

        const tubeMesh = this.createMesh( tubeGeometry );
        this.scene.add( tubeMesh );
    }

    createParametric() {
        const parametricMesh = this.createMesh( new THREE.ParametricGeometry( ParametricGeometries.klein, 25, 25 ) );

        this.scene.add( parametricMesh );
    }

    createText() {
        const fontLoader = new THREE.FontLoader();

        fontLoader.load( 'helvetiker_regular.typeface.json', ( helvetiker ) => {
            const options: THREE.TextGeometryParameters = {
                size: 90,
                height: 90,
                font: helvetiker,
                bevelThickness: 9,
                bevelSize: 4,
                bevelEnabled: true,
                curveSegments: 12
            };

            const textMesh = this.createMesh( new THREE.TextGeometry( 'shushuTona', options ) );

            this.scene.add( textMesh );
        } );
    }
}

export { Chap6 };
