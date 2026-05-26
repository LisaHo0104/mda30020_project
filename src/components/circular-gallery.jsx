"use client";

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { XIcon } from "lucide-react";
import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./circular-gallery.module.css";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createTextTexture(
  gl,
  text,
  font = "bold 30px monospace",
  color = "black",
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  constructor({
    gl,
    plane,
    text,
    textColor = "#545050",
    font = "30px sans-serif",
  }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor,
    );
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true,
    });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          float planeAspect = uPlaneSizes.x / uPlaneSizes.y;
          float imageAspect = uImageSizes.x / uImageSizes.y;
          vec2 imageUv = vUv;
          float insideImage = 1.0;

          if (planeAspect > imageAspect) {
            float imageWidth = imageAspect / planeAspect;
            float gutter = (1.0 - imageWidth) * 0.5;
            insideImage *= step(gutter, vUv.x) * step(vUv.x, 1.0 - gutter);
            imageUv.x = (vUv.x - gutter) / imageWidth;
          } else {
            float imageHeight = planeAspect / imageAspect;
            float gutter = (1.0 - imageHeight) * 0.5;
            insideImage *= step(gutter, vUv.y) * step(vUv.y, 1.0 - gutter);
            imageUv.y = (vUv.y - gutter) / imageHeight;
          }

          vec4 color = texture2D(tMap, imageUv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float roundedAlpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);

          gl_FragColor = vec4(color.rgb, color.a * roundedAlpha * insideImage);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [1, 1] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [
        img.naturalWidth,
        img.naturalHeight,
      ];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    });
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const halfViewport = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const bendAbs = Math.abs(this.bend);
      const radius =
        (halfViewport * halfViewport + bendAbs * bendAbs) / (2 * bendAbs);
      const effectiveX = Math.min(Math.abs(x), halfViewport);
      const arc = radius - Math.sqrt(radius * radius - effectiveX * effectiveX);

      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / radius);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / radius);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
    }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y =
      (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x =
      (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(
    container,
    {
      items,
      bend,
      textColor = "#ffffff",
      borderRadius = 0,
      font = "bold 30px sans-serif",
      scrollSpeed = 2,
      scrollEase = 0.05,
      onActiveIndexChange,
    } = {},
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onActiveIndexChange =
      typeof onActiveIndexChange === "function" ? onActiveIndexChange : null;
    this.activeIndex = 0;
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.notifyActiveIndex(true);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  createMedias(items, bend = 1, textColor, borderRadius, font) {
    const galleryItems = items && items.length ? items : [];
    this.itemCount = galleryItems.length;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
      });
    });
  }

  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target +=
      (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
    this.notifyActiveIndex();
  }

  goToOffset(offset) {
    if (!this.medias || !this.medias[0]) return;
    this.scroll.target += this.medias[0].width * offset;
    this.onCheck();
  }

  getActiveIndex() {
    if (!this.itemCount || !this.medias || !this.medias[0]) return 0;
    const rawIndex = Math.round(this.scroll.target / this.medias[0].width);
    return ((rawIndex % this.itemCount) + this.itemCount) % this.itemCount;
  }

  notifyActiveIndex(force = false) {
    if (!this.onActiveIndexChange) return;
    const nextIndex = this.getActiveIndex();
    if (!force && nextIndex === this.activeIndex) return;
    this.activeIndex = nextIndex;
    this.onActiveIndexChange(this.itemCount ? nextIndex + 1 : 0);
  }

  next() {
    this.goToOffset(1);
  }

  previous() {
    this.goToOffset(-1);
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport }),
      );
    }
  }

  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease,
    );
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener("resize", this.boundOnResize);
    window.addEventListener("mousewheel", this.boundOnWheel);
    window.addEventListener("wheel", this.boundOnWheel);
    window.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    window.addEventListener("touchstart", this.boundOnTouchDown);
    window.addEventListener("touchmove", this.boundOnTouchMove);
    window.addEventListener("touchend", this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    window.removeEventListener("mousewheel", this.boundOnWheel);
    window.removeEventListener("wheel", this.boundOnWheel);
    window.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    window.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px sans-serif",
  scrollSpeed = 2,
  scrollEase = 0.05,
  showControls = false,
}) {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const pointerRef = useRef({ down: false, moved: false, x: 0, y: 0 });
  const totalPages = items?.length ?? 0;
  const [currentPage, setCurrentPage] = useState(totalPages ? 1 : 0);
  const [zoomedItem, setZoomedItem] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return undefined;
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      onActiveIndexChange: setCurrentPage,
    });
    appRef.current = app;
    return () => {
      app.destroy();
      appRef.current = null;
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  const stopControlGesture = (event) => {
    event.stopPropagation();
  };

  const activeItem =
    totalPages && currentPage
      ? items[((currentPage - 1) % totalPages + totalPages) % totalPages]
      : null;

  const openActiveItem = () => {
    const image = activeItem?.image ?? activeItem?.src;
    if (!image) return;
    setZoomedItem({
      image,
      label: activeItem.text ?? activeItem.alt ?? `Gallery image ${currentPage}`,
    });
  };

  const closeZoomedItem = () => {
    setZoomedItem(null);
  };

  const handleGalleryPointerDown = (event) => {
    if (event.button && event.button !== 0) return;
    pointerRef.current = {
      down: true,
      moved: false,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleGalleryPointerMove = (event) => {
    if (!pointerRef.current.down) return;
    const distanceX = event.clientX - pointerRef.current.x;
    const distanceY = event.clientY - pointerRef.current.y;
    if (distanceX * distanceX + distanceY * distanceY > 36) {
      pointerRef.current.moved = true;
    }
  };

  const handleGalleryPointerUp = () => {
    pointerRef.current.down = false;
  };

  const handleGalleryClick = () => {
    if (pointerRef.current.moved) return;
    openActiveItem();
  };

  const handleGalleryKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openActiveItem();
  };

  useEffect(() => {
    if (!zoomedItem) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeZoomedItem();
      }
    };

    document.body.classList.add("dg-scroll-lock");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("dg-scroll-lock");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoomedItem]);

  return (
    <div className={styles.galleryShell}>
      <div
        aria-label="Open current gallery image"
        className={styles.circularGallery}
        onClick={handleGalleryClick}
        onKeyDown={handleGalleryKeyDown}
        onPointerDown={handleGalleryPointerDown}
        onPointerMove={handleGalleryPointerMove}
        onPointerUp={handleGalleryPointerUp}
        ref={containerRef}
        role="button"
        tabIndex={0}
      />
      {showControls ? (
        <div
          className={styles.controls}
          onMouseDown={stopControlGesture}
          onTouchStart={stopControlGesture}
        >
          <button
            aria-label="Previous gallery item"
            className={styles.controlButton}
            onClick={() => appRef.current?.previous()}
            type="button"
          >
            Prev
          </button>
          {totalPages ? (
            <span
              aria-label={`Gallery item ${currentPage} of ${totalPages}`}
              aria-live="polite"
              className={styles.pageIndicator}
            >
              {currentPage}/{totalPages}
            </span>
          ) : null}
          <button
            aria-label="Next gallery item"
            className={styles.controlButton}
            onClick={() => appRef.current?.next()}
            type="button"
          >
            Next
          </button>
        </div>
      ) : null}
      {zoomedItem ? (
        <div className={styles.lightbox} onClick={closeZoomedItem}>
          <div
            aria-label={zoomedItem.label}
            aria-modal="true"
            className={styles.lightboxPanel}
            onClick={stopControlGesture}
            role="dialog"
          >
            <div className={styles.lightboxImageFrame}>
              <NextImage
                alt={zoomedItem.label}
                className={styles.lightboxImage}
                fill
                sizes="min(92vw, 54rem)"
                src={zoomedItem.image}
              />
            </div>
            <button
              aria-label="Close enlarged image"
              className={styles.lightboxClose}
              onClick={closeZoomedItem}
              type="button"
            >
              <XIcon aria-hidden="true" size={20} strokeWidth={2.25} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
