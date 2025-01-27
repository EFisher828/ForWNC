const downloadMap = () => {
  map.resize();
  map.once('render', async () => {
    // Get the map's canvas
    const mapCanvas = map.getCanvas();
    const originalWidth = mapCanvas.width;
    const originalHeight = mapCanvas.height;

    const aspectRatio = 16 / 9;

    if (originalWidth / originalHeight > aspectRatio) {
      newWidth = originalHeight * aspectRatio;
      newHeight = originalHeight;
    } else {
      newWidth = originalWidth;
      newHeight = originalWidth / aspectRatio;
      console.log(newWidth, newHeight)
    }

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = newWidth;
    offscreenCanvas.height = newHeight;

    let ctx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

    const startX = (originalWidth - newWidth) / 2;
    const startY = (originalHeight - newHeight) / 2;

    await ctx.drawImage(mapCanvas, startX, startY, newWidth, newHeight, 0, 0, newWidth, newHeight);

    const legendWidth = 0.3 * newWidth
    const legendHeight = 0.2 * newHeight
    const legendMarginX = 0.02 * newWidth
    const legendMarginY = 0.015 * newWidth

    ctx.shadowColor = 'black';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#646464';
    ctx.fillRect(newWidth - legendWidth - legendMarginX, newHeight - legendHeight - legendMarginY, legendWidth, legendHeight);

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    let legendColors = [];
    let legendTitles = [];

    // Object.keys(allPolgyons).forEach((key, i) => {
    //   const item = allPolgyons[key]
    //   const itemColor = item.color
    //   if (!legendColors.includes(itemColor)) {
    //     legendColors.push(itemColor)
    //     legendTitles.push(item.title)
    //   }
    // });

    legendColors = ['#AEDFF0', '#85B5EF', '#5A83C9', '#5562B4', '#A482E5'] ;
    legendTitles = ['T - 1"', '1 - 3"', '2 - 4"', '3 - 6"', '6"+']

    const cubeWidth = 20;
    const cubeHeight = (legendHeight - 30) / legendColors.length;

    legendColors.reverse()
    legendTitles.reverse()

    legendColors.forEach((lColor, i) => {
      const lTitle = legendTitles[i]
      ctx.fillStyle = lColor;
      ctx.fillRect(newWidth - legendMarginX - cubeWidth - 100, newHeight - legendHeight - legendMarginY + 15 + (cubeHeight * i), cubeWidth, cubeHeight)

      const fontSize = 20
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillText(lTitle, newWidth - legendMarginX - 85, newHeight - legendHeight - legendMarginY + 15 + (cubeHeight * i) + fontSize + ((cubeHeight - fontSize) / 2))
    });

    ctx.font = `bold 30px Arial`;
    ctx.textAlign = 'center'
    ctx.fillText('Expected Snowfall', newWidth - legendWidth - legendMarginX + ((legendWidth - cubeWidth - 100)/2), newHeight - legendHeight - legendMarginY + 45)

    ctx.font = `22px Arial`;
    // ctx.fillText('Friday Afternoon into Saturday Morning', newWidth - legendWidth - legendMarginX + ((legendWidth - cubeWidth - 100)/2), newHeight - legendHeight - legendMarginY + 90, (legendWidth - cubeWidth - 100) * 0.95, legendHeight)
    const text = 'Snow begins Friday afternoon and tapers off by mid-day Saturday. Sleet may mix in at times, reducing totals in some areas.'
    const maxWidth = (legendWidth - cubeWidth - 100) * 0.9;
    const lineHeight = 26; // Adjust for spacing between lines
    const x = newWidth - legendWidth - legendMarginX + ((legendWidth - cubeWidth - 100) / 2);
    const y = newHeight - legendHeight - legendMarginY + 80;

    const words = text.split(' ');
    let line = '';
    let lines = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line); // Push the last line

    // Draw each line
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y + i * lineHeight);
    }




    const dataURL = offscreenCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'captured-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
