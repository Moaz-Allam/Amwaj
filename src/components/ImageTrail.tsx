import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ImageTrail.css';

type PointerLikeEvent = MouseEvent | TouchEvent;

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

const getLocalPointerPos = (event: PointerLikeEvent, rect: DOMRect) => {
  let clientX = 0;
  let clientY = 0;

  if ('touches' in event && event.touches.length > 0) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  } else if ('clientX' in event) {
    clientX = event.clientX;
    clientY = event.clientY;
  }

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
};

const getMouseDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
};

class ImageItem {
  el: HTMLDivElement;
  inner: HTMLDivElement | null;
  rect: DOMRect;
  private resizeHandler: () => void;

  constructor(element: HTMLDivElement) {
    this.el = element;
    this.inner = this.el.querySelector('.image-trail-img-inner');
    this.rect = this.el.getBoundingClientRect();

    this.resizeHandler = () => {
      gsap.set(this.el, { scale: 1, x: 0, y: 0, opacity: 0 });
      this.getRect();
    };

    window.addEventListener('resize', this.resizeHandler);
  }

  getRect() {
    this.rect = this.el.getBoundingClientRect();
  }

  destroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }
}

class ImageTrailVariant1 {
  private container: HTMLDivElement;
  private images: ImageItem[];
  private imagesTotal: number;
  private imgPosition: number;
  private zIndexVal: number;
  private activeImagesCount: number;
  private isIdle: boolean;
  private threshold: number;
  private frameId: number | null;

  private mousePos: { x: number; y: number };
  private lastMousePos: { x: number; y: number };
  private cacheMousePos: { x: number; y: number };

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.images = [...container.querySelectorAll<HTMLDivElement>('.image-trail-img')].map((img) => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 34;
    this.frameId = null;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.container.addEventListener('mousemove', this.handlePointerMove);
    this.container.addEventListener('touchmove', this.handlePointerMove, { passive: true });
    this.container.addEventListener('mousemove', this.initRender, { once: true });
    this.container.addEventListener('touchmove', this.initRender, { once: true, passive: true });
  }

  private handlePointerMove = (event: PointerLikeEvent) => {
    const rect = this.container.getBoundingClientRect();
    this.mousePos = getLocalPointerPos(event, rect);
  };

  private initRender = (event: PointerLikeEvent) => {
    const rect = this.container.getBoundingClientRect();
    this.mousePos = getLocalPointerPos(event, rect);
    this.cacheMousePos = { ...this.mousePos };

    this.frameId = window.requestAnimationFrame(this.render);
  };

  private render = () => {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }

    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }

    this.frameId = window.requestAnimationFrame(this.render);
  };

  private showNextImage() {
    if (!this.imagesTotal) {
      return;
    }

    this.zIndexVal += 1;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const image = this.images[this.imgPosition];

    gsap.killTweensOf(image.el);
    gsap
      .timeline({
        onStart: this.onImageActivated,
        onComplete: this.onImageDeactivated,
      })
      .fromTo(
        image.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - image.rect.width / 2,
          y: this.cacheMousePos.y - image.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: 'power1.out',
          x: this.mousePos.x - image.rect.width / 2,
          y: this.mousePos.y - image.rect.height / 2,
        },
        0,
      )
      .to(
        image.el,
        {
          duration: 0.45,
          ease: 'power3.out',
          opacity: 0,
          scale: 0.2,
        },
        0.4,
      );
  }

  private onImageActivated = () => {
    this.activeImagesCount += 1;
    this.isIdle = false;
  };

  private onImageDeactivated = () => {
    this.activeImagesCount -= 1;
    if (this.activeImagesCount === 0) {
      this.isIdle = true;
    }
  };

  destroy() {
    this.container.removeEventListener('mousemove', this.handlePointerMove);
    this.container.removeEventListener('touchmove', this.handlePointerMove);
    this.container.removeEventListener('mousemove', this.initRender);
    this.container.removeEventListener('touchmove', this.initRender);

    if (this.frameId !== null) {
      window.cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }

    this.images.forEach((image) => image.destroy());
  }
}

type ImageTrailProps = {
  items: string[];
  variant?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  className?: string;
};

const ImageTrail = ({ items, className, variant = 1 }: ImageTrailProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) {
      return;
    }

    const imageTrail = new ImageTrailVariant1(container);
    return () => imageTrail.destroy();
  }, [items, variant]);

  return (
    <div ref={containerRef} className={`image-trail-content ${className ?? ''}`}>
      {items.map((url, index) => (
        <div className="image-trail-img" key={`${url}-${index}`}>
          <div className="image-trail-img-inner" style={{ backgroundImage: `url(${url})` }} />
        </div>
      ))}
    </div>
  );
};

export default ImageTrail;
