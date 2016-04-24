
function ModelViewer(canvasId) {

	this.addScene = function(elemId, modelName) {

		var element = document.getElementById(elemId);

		var scene = new THREE.Scene();
		scene.userData.element = element;

		var rect = element.getBoundingClientRect();
		var camera = new THREE.PerspectiveCamera( 60, rect.width/rect.height, 0.1, 100 );
		camera.position.x = 2;
		camera.position.y = 5;
		camera.position.z = 5;
		scene.userData.camera = camera;

		var controls = new THREE.OrbitControls( scene.userData.camera, scene.userData.element );
		controls.minDistance = 2;
		controls.maxDistance = 5;
		controls.enablePan = false;
		controls.enableZoom = false;
		controls.autoRotate = true;
		controls.autoRotateSpeed = 2.0;
		scene.userData.controls = controls;

		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setBaseUrl( 'assets/' );
		mtlLoader.setPath( 'assets/' );
		mtlLoader.load( modelName + '.mtl', function( materials ) {
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.setPath( 'assets/' );
			objLoader.load( modelName + '.obj', function ( object ) {
				object.traverse(function(obj){
					obj.receiveShadow = true;
					obj.castShadow = true;
				})
				scene.add( object );
			}, function(){}, function(){
				console.log("Ops!");
			} );
		});

		var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1.0 );
		hemiLight.color.setHSL( 0.6, 1, 0.6 );
		hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
		hemiLight.position.set( 0, 0, 0 );
		scene.add( hemiLight );

		var light = new THREE.DirectionalLight( 0xfffffa, 0.7 );
		light.position.set( 4, 5, 2 );
		light.castShadow = true;
		light.shadow.mapSize.width = 512;
		light.shadow.mapSize.height = 512;
		var shadowWidth = 5;
		light.shadow.camera.left = -shadowWidth;
		light.shadow.camera.right = shadowWidth;
		light.shadow.camera.top = shadowWidth;
		light.shadow.camera.bottom = -shadowWidth;
		light.shadow.camera.far = 20;
		light.shadow.camera.near = 0.1;
		light.shadow.bias = -0.0001;
		scene.add( light );

		scenes.push( scene );
	}

	var updateSize = function() {
		var width = canvas.clientWidth;
		var height = canvas.clientHeight;
		if ( canvas.width !== width || canvas.height != height ) {
			renderer.setSize( width, height, false );
		}
	}

	var render = function() {
		updateSize();

		renderer.setClearColor( 0xffffff );
		renderer.setScissorTest( false );
		renderer.clear();
		renderer.setScissorTest( true );

		scenes.forEach( function( scene ) {
			var element = scene.userData.element;
			var rect = element.getBoundingClientRect();

			if ( rect.bottom < 0 || rect.top  > renderer.domElement.clientHeight ||
				 rect.right  < 0 || rect.left > renderer.domElement.clientWidth ) {
				return;  // it's off screen
			}

			var width = rect.right - rect.left;
			var height = rect.bottom - rect.top;
			var left  = rect.left;
			var bottom = renderer.domElement.clientHeight - rect.bottom;

			renderer.setViewport( left, bottom, width, height );
			renderer.setScissor( left, bottom, width, height );

			var camera = scene.userData.camera;
			scene.userData.controls.update();
			renderer.render( scene, camera );
		} );
	}

	var animate = function() {
		requestAnimationFrame(animate.bind(this));
		render();
	}

	if ( !Detector.webgl ) {
		Detector.addGetWebGLMessage();
	}

	var canvas = document.getElementById(canvasId);
	var scenes = [];
	var renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setClearColor( 0xffffff, 1 );
	renderer.setPixelRatio( window.devicePixelRatio );

	animate();
}
