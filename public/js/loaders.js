export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}



// loading level from levels JSON
export function loadLevel(name) {
  
  return fetch(`js/levels/${name}.json`)
    .then(response => 
      response.json())
      
      
}