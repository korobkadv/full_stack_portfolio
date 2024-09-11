// Ініціалізація Three.js сцени
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("three-canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Створення відео текстури
const video = document.createElement("video");
video.src = "img/hero-background.mp4"; // Шлях до відео файлу
video.loop = true;
video.muted = true;
video.play();

const videoTexture = new THREE.VideoTexture(video);
scene.background = videoTexture; // Встановлюємо відео як фон для сцени

// Завантаження текстур для кожної грані куба
const loader = new THREE.TextureLoader();
const materials = [
  new THREE.MeshBasicMaterial({ map: loader.load("img/javascript.jpg") }), // грань з "JavaScript"
  new THREE.MeshBasicMaterial({ map: loader.load("img/react.jpg") }), // грань з "React"
  new THREE.MeshBasicMaterial({ map: loader.load("img/node.png") }), // грань з "Node.js"
  new THREE.MeshBasicMaterial({ map: loader.load("img/html.jpg") }), // грань з "HTML5"
  new THREE.MeshBasicMaterial({ map: loader.load("img/css.jpg") }), // грань з "CSS3"
  new THREE.MeshBasicMaterial({ map: loader.load("img/git.png") }), // грань з "Git"
];

// Функція для створення куба з врахуванням 60% від висоти вікна
function createCube(cubeWidth = 4, cubeHeight = 4) {
  if (window.innerWidth <= 500) {
    cubeHeight = 3;
    cubeWidth = 3;
  }
  const geometry = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeWidth); // Пропорційний куб
  const cube = new THREE.Mesh(geometry, materials);
  return cube;
}

// Додаємо куб до сцени
let cube = createCube();
scene.add(cube);

// Позиціонуємо камеру
camera.position.z = 5;

// Анімація куба
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();

// Функція для оновлення розміру куба при зміні розміру вікна
function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  // Видаляємо старий куб і додаємо новий з оновленим розміром
  scene.remove(cube);
  if (window.innerWidth <= 500) {
    cubeHeight = 2;
    cubeWidth = 2;
  } else {
    cubeHeight = 3;
    cubeWidth = 3;
  }
  cube = createCube(cubeHeight, cubeWidth);
  scene.add(cube);
}

// Додаємо подію для оновлення розміру куба при зміні розміру вікна
window.addEventListener("resize", onWindowResize);

// Інтерактивність на рух миші
window.addEventListener("mousemove", function (event) {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

  cube.rotation.x += mouseY * 0.05;
  cube.rotation.y += mouseX * 0.05;
});

//********************** Додаєм портфоліо через DOM **************************************
const searchMain = document.getElementById("projects");

function CreateSection(clas, text, searchBlock) {
  const createSection = document.createElement("section");
  createSection.setAttribute("class", `${clas}  section-card`);
  createSection.innerHTML = text;
  searchBlock.append(createSection);
}

function CreateArticle(obj, searchBlock) {
  const createSection = document.createElement("article");
  createSection.setAttribute("class", "project-card");
  createSection.innerHTML = `
            <div class='demoImg'>
                <a href='${obj.url}' target='_blanck'>
                    <img src='img/${obj.category}/${obj.img}' alt='${obj.name}' />
                </a>
            </div> 
            <h3>&nbsp;${obj.name}</h3>`;
  searchBlock.append(createSection);
}

category.map((el, index) => {
  CreateSection(el.urlNAme, `<h2>${el.name}</h2>`, searchMain);
  const searchSectionCategory = document.querySelector("." + el.urlNAme);
  CreateSection("category " + el.urlNAme + index, "", searchSectionCategory);
  const searchSectionForArticle = document.querySelector(
    "." + el.urlNAme + index
  );

  demos
    .filter((obj) => {
      return obj.category === el.urlNAme;
    })
    .map((obj) => CreateArticle(obj, searchSectionForArticle));
});
