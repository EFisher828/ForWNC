const newImg = (imgIndex) => {
  const imgDict = {
    0: './Images/SwannanoaHeleneBanner.jpg',
    3: './Images/IMG_1067-Pano-2.jpg',
    1: './Images/IMG_7815.jpg',
    2: './Images/DJI_0116.jpg',
    4: './Images/DJI_0405-Pano-3.jpg',
    5: './Images/IMG_2418.jpg'
  }

  const headerImgDiv = document.getElementById("homeimage")
  headerImgDiv.style.backgroundImage = `url(${imgDict[imgIndex]})`

  let headerImgCircle = document.getElementById(`img${imgIndex}`)
  headerImgCircle.style.backgroundColor = 'white'
  for (img in [0,1,2,3,4,5]) {
    imgIndex = Number(imgIndex)
    img = Number(img)
    if (typeof img === 'number' && typeof imgIndex === 'number' && img !== imgIndex) {
      let headerImgCircle = document.getElementById(`img${img}`)
      headerImgCircle.style.backgroundColor = 'transparent'
    }
  }
}
