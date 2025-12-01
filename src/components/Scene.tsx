import { Float, Sparkles, Stars } from '@react-three/drei';

export default function Scene() {
  return (
    <group>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sparkles 
          count={200} 
          scale={12} 
          size={4} 
          speed={0.4} 
          opacity={0.5}
          color="#d4af37"
        />
      </Float>
      <AmbientLight />
    </group>
  );
}

function AmbientLight() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#d4af37" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c0392b" />
    </>
  );
}
