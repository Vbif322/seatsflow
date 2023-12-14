export const rotatePoint = (x, y, x0, y0, angle) => {
  let newX = x0 + (x - x0) * Math.cos(angle) - (y - y0) * Math.sin(angle);
  let newY = y0 + (y - y0) * Math.cos(angle) + (x - x0) * Math.sin(angle);
  return { newX, newY };
};

export const vertexFinder = ({ x, y, width, height, angle }) => {
  let A = rotatePoint(x - width / 2, y - height / 2, x, y, angle);
  let B = rotatePoint(x + width / 2, y - height / 2, x, y, angle);
  let C = rotatePoint(x + width / 2, y + height / 2, x, y, angle);
  let D = rotatePoint(x - width / 2, y + height / 2, x, y, angle);
  let xArr = [A.newX, B.newX, C.newX, D.newX];
  let yArr = [A.newY, B.newY, C.newY, D.newY];
  return { xArr, yArr };
};

export const geronSquare = (a, b, c) => {
  let p = (a + b + c) / 2;
  return Math.sqrt(p * (p - a) * (p - b) * (p - c));
};

export const segLength = (x1, y1, x2, y2) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

export const checkPoint = (offsetX, offsetY, object) => {
  let arr = vertexFinder(object);
  let squareBox = object.width * object.height;
  let triangleSquare1 = geronSquare(
    segLength(offsetX, offsetY, arr.xArr[0], arr.yArr[0]),
    segLength(offsetX, offsetY, arr.xArr[1], arr.yArr[1]),
    segLength(arr.xArr[0], arr.yArr[0], arr.xArr[1], arr.yArr[1])
  );
  let triangleSquare2 = geronSquare(
    segLength(offsetX, offsetY, arr.xArr[1], arr.yArr[1]),
    segLength(offsetX, offsetY, arr.xArr[2], arr.yArr[2]),
    segLength(arr.xArr[1], arr.yArr[1], arr.xArr[2], arr.yArr[2])
  );
  let triangleSquare3 = geronSquare(
    segLength(offsetX, offsetY, arr.xArr[2], arr.yArr[2]),
    segLength(offsetX, offsetY, arr.xArr[3], arr.yArr[3]),
    segLength(arr.xArr[2], arr.yArr[2], arr.xArr[3], arr.yArr[3])
  );
  let triangleSquare4 = geronSquare(
    segLength(offsetX, offsetY, arr.xArr[3], arr.yArr[3]),
    segLength(offsetX, offsetY, arr.xArr[0], arr.yArr[0]),
    segLength(arr.xArr[3], arr.yArr[3], arr.xArr[0], arr.yArr[0])
  );
  return (
    triangleSquare1 + triangleSquare2 + triangleSquare3 + triangleSquare4 <=
    squareBox + 1
  );
};

export const checkIntersection = (p1, p2, p3, p4) => {
  let x1 = p1.x;
  let x2 = p2.x;
  let x3 = p3.x;
  let x4 = p4.x;
  let y1 = p1.y;
  let y2 = p2.y;
  let y3 = p3.y;
  let y4 = p4.y;
  if (x2 < x1) {
    x2 = p1.x;
    y2 = p1.y;
    x1 = p2.x;
    y1 = p2.y;
  }
  if (x4 < x3) {
    x4 = p3.x;
    x3 = p4.x;
    y4 = p3.y;
    y3 = p4.y;
  }
  if (x2 < x3) {
    return false;
  }
  if (x1 - x2 === 0 && x3 - x4 === 0) {
    if (x1 === x3) {
      if (
        !(
          Math.max(y1, y2) < Math.min(y3, y4) ||
          Math.min(y1, y2) > Math.max(y3, y4)
        )
      ) {
        return true;
      }
    }

    return false;
  }
  if (x1 - x2 === 0) {
    let Xa = x1;

    let A2 = (y3 - y4) / (x3 - x4);

    let b2 = y3 - A2 * x3;

    let Ya = A2 * Xa + b2;

    if (
      x3 <= Xa &&
      x4 >= Xa &&
      Math.min(y1, y2) <= Ya &&
      Math.max(y1, y2) >= Ya
    ) {
      return true;
    }

    return false;
  }
  if (x3 - x4 === 0) {
    let Xa = x3;

    let A1 = (y1 - y2) / (x1 - x2);

    let b1 = y1 - A1 * x1;

    let Ya = A1 * Xa + b1;

    if (
      x1 <= Xa &&
      x2 >= Xa &&
      Math.min(y3, y4) <= Ya &&
      Math.max(y3, y4) >= Ya
    ) {
      return true;
    }

    return false;
  }
  let A1 = (y1 - y2) / (x1 - x2);

  let A2 = (y3 - y4) / (x3 - x4);

  let b1 = y1 - A1 * x1;

  let b2 = y3 - A2 * x3;

  if (A1 === A2) {
    return false; //отрезки параллельны
  }

  //Xa - абсцисса точки пересечения двух прямых

  let Xa = (b2 - b1) / (A1 - A2);

  if (Xa < Math.max(x1, x3) || Xa > Math.min(x2, x4)) {
    return false; //точка Xa находится вне пересечения проекций отрезков на ось X
  } else {
    return true;
  }
};

export const inPoly = (x, y, xp, yp) => {
  let npol = xp.length;
  let j = npol - 1;
  let c = 0;
  for (let i = 0; i < npol; i++) {
    if (
      ((yp[i] <= y && y < yp[j]) || (yp[j] <= y && y < yp[i])) &&
      x > ((xp[j] - xp[i]) * (y - yp[i])) / (yp[j] - yp[i]) + xp[i]
    ) {
      c = !c;
    }
    j = i;
  }
  return c;
};
