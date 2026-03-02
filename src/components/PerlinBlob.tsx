import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

type PerlinBlobProps = {
  className?: string;
  modelPath?: string;
};

const disposeMaterial = (material: THREE.Material | THREE.Material[]) => {
  if (Array.isArray(material)) {
    material.forEach((entry) => entry.dispose());
    return;
  }

  material.dispose();
};

const disposeObjectResources = (object: THREE.Object3D) => {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    child.geometry.dispose();
    disposeMaterial(child.material);
  });
};

const PerlinBlob = ({ className, modelPath }: PerlinBlobProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    const getPixelRatio = () => Math.max(1.5, Math.min(window.devicePixelRatio || 1, 3));
    renderer.setPixelRatio(getPixelRatio());
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 1000);
    camera.position.set(0, 0.25, 8.8);
    camera.lookAt(0, 0, 0);

    const cursorGroup = new THREE.Group();
    scene.add(cursorGroup);

    const floatGroup = new THREE.Group();
    cursorGroup.add(floatGroup);

    const scrollGroup = new THREE.Group();
    floatGroup.add(scrollGroup);

    const spinGroup = new THREE.Group();
    scrollGroup.add(spinGroup);

    const generatedObject = new THREE.Group();
    spinGroup.add(generatedObject);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    let loadedModel: THREE.Object3D | null = null;
    let modelMixer: THREE.AnimationMixer | null = null;

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#6ccfff'),
      emissive: new THREE.Color('#0a5f9f'),
      emissiveIntensity: 0.34,
      metalness: 0.4,
      roughness: 0.2,
      clearcoat: 0.75,
      clearcoatRoughness: 0.18,
    });

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1395d8'),
      emissive: new THREE.Color('#0a629b'),
      emissiveIntensity: 0.48,
      metalness: 0.7,
      roughness: 0.24,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#a6e8ff'),
      emissive: new THREE.Color('#43b9f5'),
      emissiveIntensity: 0.55,
      metalness: 0.25,
      roughness: 0.16,
    });

    materials.push(coreMaterial, ringMaterial, accentMaterial);

    const coreGeometry = new THREE.OctahedronGeometry(1.06, 2);
    geometries.push(coreGeometry);
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    generatedObject.add(core);

    const innerCoreGeometry = new THREE.OctahedronGeometry(0.5, 1);
    geometries.push(innerCoreGeometry);
    const innerCore = new THREE.Mesh(innerCoreGeometry, accentMaterial);
    innerCore.rotation.set(0.34, 0.28, 0.1);
    generatedObject.add(innerCore);

    const ringOneGeometry = new THREE.TorusGeometry(2.2, 0.08, 18, 120);
    geometries.push(ringOneGeometry);
    const ringOne = new THREE.Mesh(ringOneGeometry, ringMaterial);
    ringOne.rotation.set(1.06, 0.42, 0.1);
    generatedObject.add(ringOne);

    const ringTwoGeometry = new THREE.TorusGeometry(1.72, 0.065, 18, 120);
    geometries.push(ringTwoGeometry);
    const ringTwo = new THREE.Mesh(ringTwoGeometry, ringMaterial);
    ringTwo.rotation.set(0.3, 0.88, 0.64);
    generatedObject.add(ringTwo);

    const ringThreeGeometry = new THREE.TorusGeometry(1.35, 0.045, 16, 100);
    geometries.push(ringThreeGeometry);
    const ringThree = new THREE.Mesh(ringThreeGeometry, accentMaterial);
    ringThree.rotation.set(-0.56, 0.14, 0.42);
    generatedObject.add(ringThree);

    const beaconBaseGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.72, 20);
    geometries.push(beaconBaseGeometry);
    const beaconBase = new THREE.Mesh(beaconBaseGeometry, ringMaterial);
    beaconBase.position.set(0, 1.5, 0);
    generatedObject.add(beaconBase);

    const beaconTipGeometry = new THREE.ConeGeometry(0.22, 0.62, 24);
    geometries.push(beaconTipGeometry);
    const beaconTip = new THREE.Mesh(beaconTipGeometry, accentMaterial);
    beaconTip.position.set(0, 2.2, 0);
    generatedObject.add(beaconTip);

    const satellitesGroup = new THREE.Group();
    generatedObject.add(satellitesGroup);

    const satelliteGeometry = new THREE.SphereGeometry(0.15, 20, 20);
    geometries.push(satelliteGeometry);
    const satellites = Array.from({ length: 3 }, () => {
      const satellite = new THREE.Mesh(satelliteGeometry, accentMaterial);
      satellitesGroup.add(satellite);
      return satellite;
    });

    if (modelPath) {
      const loader = new GLTFLoader();

      loader.load(
        modelPath,
        (gltf) => {
          const model = gltf.scene;
          model.updateMatrixWorld(true);

          const box = new THREE.Box3().setFromObject(model);
          if (!box.isEmpty()) {
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            const size = box.getSize(new THREE.Vector3());
            const maxDimension = Math.max(size.x, size.y, size.z);
            if (maxDimension > 0) {
              const targetSize = 3.4;
              const scale = targetSize / maxDimension;
              model.scale.setScalar(scale);
            }
          }

          model.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) {
              return;
            }

            child.castShadow = false;
            child.receiveShadow = false;
          });

          generatedObject.visible = false;
          loadedModel = model;
          spinGroup.add(model);

          if (gltf.animations.length) {
            modelMixer = new THREE.AnimationMixer(model);

            gltf.animations.forEach((clip) => {
              const action = modelMixer?.clipAction(clip);
              action?.reset();
              action?.play();
            });
          }
        },
        undefined,
        () => {
          generatedObject.visible = true;
        }
      );
    }

    const ambientLight = new THREE.AmbientLight(0x8cd2ff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xa8dfff, 1.05);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x1789c4, 0.72);
    rimLight.position.set(-5, 2, 4);
    scene.add(rimLight);

    const glowLight = new THREE.PointLight(0x54c8ff, 0.62, 18);
    glowLight.position.set(0, 0.2, 2.6);
    scene.add(glowLight);

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let targetScrollRotation = 0;
    let currentScrollRotation = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;

      targetTiltY = THREE.MathUtils.clamp(normalizedX * 0.42, -0.24, 0.24);
      targetTiltX = THREE.MathUtils.clamp(-normalizedY * 0.34, -0.2, 0.2);
    };

    const resetTilt = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    const handleScroll = () => {
      targetScrollRotation = window.scrollY * 0.0022;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);

      renderer.setPixelRatio(getPixelRatio());
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();
    handleScroll();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', resetTilt);
    window.addEventListener('scroll', handleScroll, { passive: true });

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = (timestamp: number) => {
      frameId = window.requestAnimationFrame(animate);

      const elapsed = timestamp * 0.001;
      const delta = clock.getDelta();

      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;
      currentScrollRotation += (targetScrollRotation - currentScrollRotation) * 0.08;

      cursorGroup.rotation.x = 0.1 + currentTiltX;
      cursorGroup.rotation.y = -0.14 + currentTiltY;
      cursorGroup.rotation.z = 0.03;

      floatGroup.position.y = Math.sin(elapsed * 1.3) * 0.2;

      scrollGroup.rotation.y = currentScrollRotation;
      scrollGroup.rotation.z = Math.sin(elapsed * 0.5) * 0.08;

      spinGroup.rotation.x = Math.sin(elapsed * 0.92) * 0.08;
      spinGroup.rotation.z = Math.cos(elapsed * 0.76) * 0.06;

      if (loadedModel) {
        loadedModel.rotation.y += 0.004;
      }

      satellites.forEach((satellite, index) => {
        const angle = elapsed * 0.95 + index * ((Math.PI * 2) / satellites.length);
        const radius = 2.26;
        satellite.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.3) * 0.3,
          Math.sin(angle) * radius
        );
      });

      if (generatedObject.visible) {
        innerCore.rotation.y += 0.018;
        ringOne.rotation.z += 0.004;
        ringTwo.rotation.y -= 0.0035;
        ringThree.rotation.x += 0.0032;
      }

      modelMixer?.update(delta);

      renderer.render(scene, camera);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', resetTilt);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();

      if (loadedModel) {
        spinGroup.remove(loadedModel);
        disposeObjectResources(loadedModel);
      }

      if (modelMixer) {
        modelMixer.stopAllAction();
      }

      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();

      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    };
  }, [modelPath]);

  return <div ref={containerRef} className={className} />;
};

export default PerlinBlob;
