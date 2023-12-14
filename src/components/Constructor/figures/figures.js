export const createTable2 = (ctx, x, y, angle, scale) => {
  const width = 100;
  const height = 100;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#B62F2F";
  ctx.fill(roundedRect(-width / 2, -height / 2, width, height, 6));
  ctx.fillStyle = "#D9D9D9";
  ctx.fillRect(-width / 2 + 10, -height / 2 + 10, 80, 80);
  ctx.restore();
  return { x, y, width, height, angle, scale, createFunc: createTable2 };
};

export const createTable4 = (ctx, x, y, angle, scale) => {
  const width = 200;
  const height = 100;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#53855B";
  ctx.fill(roundedRect(-width / 2, -height / 2, width, height, 6));
  ctx.fillStyle = "#D9D9D9";
  ctx.fillRect(-width / 2 + 10, -height / 2 + 10, 180, 80);
  ctx.restore();
  return {
    x,
    y,
    width,
    height,
    angle,
    scale,
    createFunc: createTable4,
  };
};

export const createChair = (ctx, x, y, angle) => {
  const width = 86;
  const height = 86;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "#53855B";
  ctx.fill(chair(-width / 2, -height / 2));
  ctx.stroke(chair(-width / 2, -height / 2));
  ctx.restore();
  return {
    x,
    y,
    width,
    height,
    angle,
    createFunc: createChair,
  };
};

// export const createChair180 = (ctx, x, y) => {
//   ctx.fillStyle = "#6DC27B";
//   ctx.beginPath();
//   ctx.ellipse(x + 16, y + 21, 16, 21, Math.PI / 2, 0, 2 * Math.PI);
//   ctx.fillRect(x - 5, y + 5, 42, 16);
//   ctx.fill();

//   ctx.beginPath();
//   ctx.moveTo(x + 5, y + 5);
//   ctx.lineTo(x + 5, y + 20);
//   ctx.arc(x + 11, y + 21, 6, Math.PI, Math.PI / 2, true);
//   ctx.lineTo(x + 21, y + 27);
//   ctx.arc(x + 21, y + 21, 6, Math.PI / 2, 2 * Math.PI, true);
//   ctx.lineTo(x + 27, y + 5);
//   ctx.stroke();
//   ctx.fillStyle = "#53855B";
//   ctx.fill();
//   return {
//     x,
//     y,
//     width: 86,
//     height: 66,
//     createFunc: createChair180,
//   };
// };

export const test = (ctx, x, y) => {
  let testPath = new Path2D();
  testPath.rect(x, y, 100, 100);

  let testPath2 = new Path2D(testPath);
  testPath2.moveTo(x + 10, y + 10);
  testPath2.arc(x, y, 50, 0, 2 * Math.PI);
  ctx.stroke(testPath2);
  return {
    x,
    y,
    width: 100,
    height: 100,
    createFunc: test,
  };
};

function roundedRect(x, y, width, height, radius) {
  let roundedRectPath = new Path2D();
  roundedRectPath.moveTo(x, y + radius);
  roundedRectPath.arcTo(x, y + height, x + radius, y + height, radius);
  roundedRectPath.arcTo(
    x + width,
    y + height,
    x + width,
    y + height - radius,
    radius
  );
  roundedRectPath.arcTo(x + width, y, x + width - radius, y, radius);
  roundedRectPath.arcTo(x, y, x, y + radius, radius);
  return roundedRectPath;
}

function chair(x, y, offsetX = 0, offsetY = 0) {
  let chairPath = new Path2D();
  chairPath.ellipse(
    x + offsetX + 16,
    y + offsetY + 21,
    16,
    21,
    Math.PI / 2,
    Math.PI / 2,
    (3 * Math.PI) / 2
  );
  chairPath.rect(x + offsetX - 5, y + offsetY + 21, 42, 16);
  chairPath.moveTo(x + offsetX + 5, y + offsetY + 37);
  chairPath.lineTo(x + offsetX + 5, y + offsetY + 21);
  chairPath.arc(
    x + offsetX + 11,
    y + offsetY + 21,
    6,
    Math.PI,
    (3 * Math.PI) / 2
  );
  chairPath.lineTo(x + offsetX + 21, y + offsetY + 15);
  chairPath.arc(
    x + offsetX + 21,
    y + offsetY + 21,
    6,
    (3 * Math.PI) / 2,
    2 * Math.PI
  );
  chairPath.lineTo(x + offsetX + 27, y + offsetY + 37);
  return chairPath;
}

// function table(x, y, offsetX = 0, offsetY = 0) {
//   let path = new Path2D();
// }
