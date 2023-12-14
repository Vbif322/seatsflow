import React, { useEffect, useRef, useState } from "react";
import { createChair, createTable2, createTable4 } from "./figures/figures";
import logoTrash from "../../img/logo-trash.png";
import Image from "next/image";

import clearCanvas from "./features/clearCanvas";
import { checkPoint } from "./features/checkIntersection";

export const Constructor = () => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [context, setContext] = useState(null);
  const [objects, setObjects] = useState([]);
  const [figures, setFigures] = useState([]);
  const [deg, setDeg] = useState(0);
  const [selectedObject, setSelectedObject] = useState({});
  const [coords, setCoords] = useState({});
  const [rotateMode, setRotateMode] = useState(false);
  const [k, setK] = useState(0);
  const [changeScaleFlag, setChangeScaleFlag] = useState(false);
  const [coordsMouseDown, setCoordsMouseDown] = useState({});
  const [objectsMouseDown, setObjectMouseDown] = useState([]);
  const [scaleValue, setScaleValue] = useState(1);

  const paletteWidth = 300;

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setContext(ctx);

      // Очищаем поле
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // Рисуем рабочую область
      ctx.fillStyle = "rgba(128,128,128, 0.2)";
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // Рисуем мусорку
      // ctx.fillStyle = "rgb(128,128,128, 0.4)";
      // ctx.fillRect(
      //   canvasRef.current.width - paletteWidth,
      //   canvasRef.current.height - 150,
      //   paletteWidth,
      //   150
      // );
      // ctx.drawImage(imgRef.current, 900, 600, 100, 60);

      // Добавляем все фигуры в палетку
      // const arrayOfFigures = [createTable2, createTable4, createChair];
      // for (let i = 0; i < arrayOfFigures.length; i++) {
      //   let figure = arrayOfFigures[i](ctx, 950, i * 150 + 50, 0, 1);
      //   setFigures((prev) => [...prev, figure]);
      // }

      // Отрисовываем все объекты в рабочей области
      objects.map((item) => {
        if (item.createFunc !== undefined) {
          return item.createFunc(ctx, item.x, item.y, item.angle, item.scale);
        } else {
          ctx.fillStyle = "rgba(128,128,128, 0.5)";
          ctx.fillRect(item.x, item.y, item.width, item.height);
          return item;
        }
      });
      setChangeScaleFlag(false);

      ctx.setTransform(scaleValue, 0, 0, scaleValue, 0, 0);
    }
  }, [objects, changeScaleFlag]);

  let camera = {
    x: 0,
    y: 0,
    scale: 1,
  };

  function updateCamera(ctx) {
    ctx.setTransform(camera.scale, 0, 0, camera.scale, -camera.x, -camera.y);
  }

  const addFigure = (figure) => {
    const createdFigure = figure.createFunc(context, 300, 300, 0, 1);
    setObjects((prev) => [...prev, { ...createdFigure, id: prev.length }]);
  };

  const addObject = () => {
    const tmp = createTable4(context, 100, 100, (deg * Math.PI) / 180, 1);
    setObjects((prev) => [...prev, { ...tmp, id: prev.length }]);
  };

  const handleMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY, clientX, clientY } = nativeEvent;
    let clickedObject = objects.find((object) =>
      checkPoint(offsetX, offsetY, object)
    );
    setCoordsMouseDown({ clientX, clientY });
    setObjectMouseDown(objects);
    if (clickedObject !== undefined) {
      setK(
        (clickedObject.y -
          (clientY - canvasRef.current.getBoundingClientRect().y)) /
          (clickedObject.x -
            (clientX - canvasRef.current.getBoundingClientRect().x))
      );
      setSelectedObject(clickedObject);
      setCoords({ offsetX, offsetY });
    } else {
      let selectedFigure = figures.find((figure) =>
        checkPoint(offsetX, offsetY, figure)
      );
      if (selectedFigure !== undefined) {
        addFigure(selectedFigure);
        setSelectedObject(selectedFigure);
        setCoords({ offsetX, offsetY });
      } else {
        setCoords({ clientX, clientY });
        setSelectedObject(undefined);
      }
    }
  };

  const handleMouseUp = (e) => {
    // const { clientX } = e.nativeEvent;
    // if (
    //   clientX - canvasRef.current.getBoundingClientRect().x >
    //   canvasRef.current.width - paletteWidth
    // ) {
    //   setObjects((prev) =>
    //     prev.filter((object) => {
    //       return object.id !== selectedObject.id;
    //     })
    //   );
    // }
    setSelectedObject({});
    setCoords({});
    setK(0);
    setCoordsMouseDown({});
    setObjectMouseDown([]);
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e.nativeEvent;
    if (
      selectedObject !== undefined &&
      Object.keys(selectedObject).length > 0
    ) {
      let x =
        clientX -
        canvasRef.current.getBoundingClientRect().x -
        (coords.offsetX - selectedObject.x);
      let y =
        clientY -
        canvasRef.current.getBoundingClientRect().y -
        (coords.offsetY - selectedObject.y);
      if (rotateMode) {
        let k2 = (selectedObject.y - y) / (selectedObject.x - x);
        let tanAngle = Math.abs((k - k2) / 1 + k * k2);
        setObjects((prevObjects) => {
          const newArray = [...prevObjects];
          newArray[selectedObject.id] = {
            ...newArray[selectedObject.id],
            angle: (Math.atan(tanAngle) * 180) / Math.PI / 20,
          };
          return newArray;
        });
      } else {
        setObjects((prevObjects) => {
          const newArray = [...prevObjects];
          newArray[selectedObject.id] = {
            ...newArray[selectedObject.id],
            x,
            y,
          };
          return newArray;
        });
      }
    } else if (selectedObject === undefined) {
      setObjects(() => {
        let moveArr = objectsMouseDown.map((object) => {
          return {
            ...object,
            x: object.x + clientX - coordsMouseDown.clientX,
            y: object.y + clientY - coordsMouseDown.clientY,
          };
        });
        return moveArr;
      });
      setCoords({ clientX, clientY });
    }
  };
  const changeScale = (value) => {
    // console.log(value);
    // context.scale((1 * 0.1) ^ scaleValue, (1 * 0.1) ^ scaleValue);
    setScaleValue((prev) => prev + value);
    setChangeScaleFlag(true);
    // let delta = event.deltaY / 1000;
    // camera.scale += delta;

    // if (camera.scale < 0.1) {
    //   camera.scale = 0.1;
    // }

    // if (camera.scale > 2) {
    //   camera.scale = 2;
    // }

    // // Пересчитываем координаты точки относительно масштаба
    // camera.x =
    //   event.nativeEvent.offsetX -
    //   (event.nativeEvent.offsetX - camera.x) * camera.scale;
    // camera.y =
    //   event.nativeEvent.offsetY -
    //   (event.nativeEvent.offsetY - camera.y) * camera.scale;

    // console.log(camera.x);

    // event.preventDefault();
  };

  return (
    <div>
      <Image
        src={logoTrash}
        alt="logoTrash"
        style={{ display: "none" }}
        ref={imgRef}
      />
      <canvas
        ref={canvasRef}
        width="500"
        height="400"
        style={{ border: "2px solid black" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={changeScale}
      >
        Ваш браузер не поддерживает данную функцию
      </canvas>
      <button onClick={() => clearCanvas(setObjects)}>Очистить</button>
      <button onClick={addObject}>Добавить</button>
      <input value={deg} onChange={(e) => setDeg(e.target.value)}></input>
      <div></div>
      <input
        type="checkbox"
        value={rotateMode}
        onChange={(e) => setRotateMode(e.target.checked)}
      ></input>
      Rotation mode
      <button onClick={() => changeScale(-0.1)}>-</button>
      <button onClick={() => changeScale(+0.1)}>+</button>
    </div>
  );
};
