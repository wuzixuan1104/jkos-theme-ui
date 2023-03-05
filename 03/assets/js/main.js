
let scene, renderer;
let camera;
let mesh;

let isMouseDown = false;
 
function init() {
  scene = new THREE.Scene(); 
  
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
  camera.position.z = 25; 
  camera.position.y = 0; 
  
  const tloader = new THREE.TextureLoader();
  let textFlare0 = tloader.load('https://ithanmang.gitee.io/threejs/home/textures/lensflare/lensflare0_alpha.png')
  let textFlare3 = tloader.load('https://ithanmang.gitee.io/threejs/home/textures/lensflare/lensflare3.png')

  // const plight = new THREE.PointLight(0xffffff, 1, 2000);
  // let lensFlare = new THREE.Lensflare();
  // lensFlare.addElement(new THREE.LensflareElement(textFlare0, 500, 0, plight.color))
  // lensFlare.addElement(new THREE.LensflareElement(textFlare3, 60, 0.6, plight.color))
  // lensFlare.addElement(new THREE.LensflareElement(textFlare3, 100, 0.7, plight.color))
  // lensFlare.addElement(new THREE.LensflareElement(textFlare3, 60, 0.9, plight.color))
  // lensFlare.addElement(new THREE.LensflareElement(textFlare3, 70, 1, plight.color))

  // plight.add(lensFlare)
  // plight.position.set(-100, 50, 0)
  // scene.add(plight);
  // camera.add(spotlight.target);

  renderer = new THREE.WebGLRenderer(); 
  renderer.setSize(window.innerWidth, window.innerHeight); 
  document.body.appendChild(renderer.domElement); 

  // renderer.setClearColor(0x00ffff, 1); 
  renderer.gammaOutput = true;
  

  const light = new THREE.DirectionalLight("#c1582d", 1);
  const ambient = new THREE.AmbientLight("#85b2cd");
  light.position.set( 0, -70, 100 ).normalize();
  scene.add(light);
  scene.add(ambient);

  // var texture = new THREE.Texture();
  // var manager = new THREE.LoadingManager();
  // manager.onProgress = function ( item, loaded, total ) {};
  // var onProgress = function ( xhr ) {};
  // var onError = function ( xhr ) {};

  var loader = new THREE.GLTFLoader();

  // Load a glTF resource
  loader.load(
      // resource URL
      'assets/img/scene.gltf',
      // called when the resource is loaded
      function ( gltf ) {
        mesh = gltf.scene;
        mesh.scale.set( 10, 10, 10 );
        scene.add( mesh );

        //scene.add( gltf.scene );

        //gltf.animations; // Array<THREE.AnimationClip>
        //gltf.scene; // THREE.Scene
        //gltf.scenes; // Array<THREE.Scene>
        //gltf.cameras; // Array<THREE.Camera>
        //gltf.asset; // Object
      },
      // called when loading is in progresses
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      // called when loading has errors
      function ( error ) {
        console.log( 'An error happened: ', error );
      }
  );
  
  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("touchstart", onMouseDown);
  document.addEventListener("mouseup", onMouseUp);
  document.addEventListener("touchend", onMouseUp);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("touchmove", onMouseMove);

  render();   
}

function render() {
  requestAnimationFrame( render ); 
  renderer.render(scene, camera); 
}

function onMouseDown(event) {
  isMouseDown = true;
}

function onMouseMove(event) {
  if (isMouseDown) {
    if ( mesh ) {
        mesh.rotation.y = getMouseX(event)/50;
        mesh.rotation.x = getMouseY(event)/50;

    }
  }
}

function onMouseUp(event) {
    isMouseDown = false;
}

function getMouseX(event) {
  if (event.type.indexOf("touch") == -1)
    return event.clientX;
  else
    return event.touches[0].clientX;
}

function getMouseY(event) {
  if (event.type.indexOf("touch") == -1)
    return event.clientY;
  else
    return event.touches[0].clientY;
}

window.addEventListener('DOMContentLoaded', init);