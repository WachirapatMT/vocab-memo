export function shuffle(array) {
  for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
    let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
