import "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
import { OrbitControls } from '/public/assets/js/OrbitControls-619c712a.js';
import "https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js";
import "https://unpkg.com/three@0.128.0/examples/js/loaders/RGBELoader.js";

let camera, scene, renderer, bulbLight, bulbMat, hemiLight, stats;
let floorMat;
let ballModel, lightModel, pugModel;

init();
animate();

function init() {
  const container = document.getElementById( 'container' );

  camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 100 );
  camera.position.x = - 4;
  camera.position.z = 4;
  camera.position.y = 2;

  scene = new THREE.Scene();

  // 環景圖片
  loadRgb()

  // 頭上光點
  const bulbGeometry = new THREE.SphereGeometry( 0.02, 16, 30 );
  bulbLight = new THREE.PointLight( 0xffee88, 1, 100, 2 );

  bulbMat = new THREE.MeshStandardMaterial( {
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0x000000
  } );
  bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
  bulbLight.position.set( 0, 5, 0 );
  bulbLight.castShadow = true;

  scene.add( bulbLight );
  scene.add( bulbLight );
  scene.add( bulbLight );



  // 地板光
  hemiLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 0.02 );
  scene.add( hemiLight );

  // 地板材質
  floorMat = new THREE.MeshStandardMaterial( {
    roughness: 0.8,
    color: 0xffffff,
    metalness: 0.2,
    bumpScale: 0.0005
  } );

  // 地板材質圖片 loader - 1
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load( '/jkos-theme-ui/assets/img/hardwood2_diffuse.jpg', function ( map ) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set( 10, 24 );
    map.encoding = THREE.sRGBEncoding;
    floorMat.map = map;
    floorMat.needsUpdate = true;
  } );

  // 地板材質圖片 loader - 2
  textureLoader.load( '/jkos-theme-ui/assets/img/hardwood2_bump.jpg', function ( map ) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set( 10, 24 );
    floorMat.bumpMap = map;
    floorMat.needsUpdate = true;

  } );

  // 地板材質圖片 loader - 3
  textureLoader.load( '/jkos-theme-ui/assets/img/hardwood2_roughness.jpg', function ( map ) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set( 10, 24 );
    floorMat.roughnessMap = map;
    floorMat.needsUpdate = true;
  } );

  
  // 地板位置
  const floorGeometry = new THREE.PlaneGeometry( 20, 20 );
  const floorMesh = new THREE.Mesh( floorGeometry, floorMat );
  floorMesh.receiveShadow = true;
  floorMesh.rotation.x = - Math.PI / 2.0;
  scene.add( floorMesh );

  // 渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.useLegacyLights = false;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  // 加入 3D 物件
  load3D();

  // 相機角度
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.minDistance = 1;
  controls.maxDistance = 20;

  window.addEventListener( 'resize', onWindowResize );
}

// 周遭景色
async function loadRgb() {
  const rgbeLoader = new THREE.RGBELoader();
  const envMap = await rgbeLoader.loadAsync( '/jkos-theme-ui/assets/img/textures/moonless_golf_1k.hdr ' );
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = envMap;
  scene.environment = envMap;
}

async function load3D() {
  const loader = new THREE.GLTFLoader();
  // 牛
  loader.load(
    '/jkos-theme-ui/assets/img/Cow.glb',
    function(gltf) {
      pugModel = gltf.scene;
      pugModel.position.set(0, 0, 2);
      pugModel.rotation.set(0, 90, 0);
      scene.add(pugModel);

      pugModel.traverse( function( node ) {
        if ( node.isMesh ) { node.castShadow = true; }
      });
    }
  );
  // 沙灘球
  loader.load(
    '/jkos-theme-ui/assets/img/beachball.glb',
    function(gltf) {
      ballModel = gltf.scene;
      ballModel.position.set(-2, 2, 0);
      ballModel.rotation.set(0, 100, 0);
      // ballModel.setSize(5)
      ballModel.material = new THREE.MeshToonMaterial({
        color: 0x777777
      });
      ballModel.castShadow = true;
      // ballModel.material = new THREE.MeshLambertMaterial();
        // scene.add( ballModel );

      ballModel.traverse( function( node ) {
        if ( node.isMesh ) { node.castShadow = true; }
      });

      scene.add(ballModel);
    }
  );
  // 幽浮
  loader.load(
    '/jkos-theme-ui/assets/img/ufo.glb',
    function(gltf) {
      lightModel = gltf.scene;
      lightModel.position.set(0, 5, 0);
      scene.add(lightModel);
    }
  );
  
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  const time = Date.now() * 0.0015;
  // 動態調整位置
  ballModel.position.y = Math.cos( time ) * 0.75 + 1.25;
  renderer.render( scene, camera );
}