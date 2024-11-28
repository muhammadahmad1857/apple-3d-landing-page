// "use client";
// import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";

// import * as THREE from "three";
// import Lights from "./lights";
// import ModelLoader from "./modelLoader";
// import Model from "./iphone";
// import { Suspense } from "react";

// const ModelView = ({
//   index,
//   groupRef,
//   gsapType,
//   controlRef,
//   setRotationState,
//   size,
//   item,
// }) => {
//   return (
//     <View
//       index={index}
//       id={gsapType}
//       className={`absolute size-full ${index === 2 ? "-right-full" : ""}`}
//     >
//       {/* Ambient Light */}
//       <ambientLight intensity={0.3} />

//       <PerspectiveCamera makeDefault position={[0, 0, 4]} />

//       <Lights />

//       <OrbitControls
//         makeDefault
//         ref={controlRef}
//         enableZoom={false}
//         enablePan={false}
//         rotateSpeed={0.4}
//         target={new THREE.Vector3(0, 0, 0)}
//         onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
//       />

//       <group
//         ref={groupRef}
//         name={`${index === 1} ? 'small' : 'large`}
//         position={[0, 0, 0]}
//       >
//         <Suspense fallback={<ModelLoader />}>
//           <Model
//             scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
//             item={item}
//             size={size}
//           />
//         </Suspense>
//       </group>
//     </View>
//   );
// };

// export default ModelView;


"use client";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./lights";
import ModelLoader from "./modelLoader";
import Model from "./iphone";
import React,{ Suspense, useEffect, useRef } from "react";

interface ModelViewProps {
  index: number;
  groupRef: React.RefObject<THREE.Group>;
  gsapType: string;
  controlRef: React.RefObject<OrbitControls>;
  setRotationState: (angle: number) => void;
  size: string;
  item: {
    img: string; // Assuming 'item' has 'img' property, adjust if necessary
    color: string[]; // Assuming 'color' is an array of strings (adjust as needed)
  };
}

const ModelView: React.FC<ModelViewProps> = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
}) => {
  const controlsReady = useRef(false);

  useEffect(() => {
    if (controlRef.current && !controlsReady.current) {
      // Delay the control update until after the initial render
      setTimeout(() => {
        controlRef.current?.update(); // Manually trigger the update
        controlsReady.current = true; // Mark controls as ready
      }, 0);
    }
  }, [controlRef]); // Run once on mount`
  return (
    <View
      index={index}
      id={gsapType}
      className={`absolute size-full ${index === 2 ? "-right-full" : ""}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current?.getAzimuthalAngle() ?? 0)}
        enabled={true}  // Ensuring that the controls are active right from the start

      />

      <group
        ref={groupRef}
        name={`${index === 1 ? 'small' : 'large'}`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<ModelLoader />}>
          <Model
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
