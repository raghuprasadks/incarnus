data = [
  {x: 1, y: 14830},
  {x: 2, y: 85055},
  {x: 3, y: 03485},
  {x: 4, y: 57885}
 ]

 function getMaxY() {
  return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
}
