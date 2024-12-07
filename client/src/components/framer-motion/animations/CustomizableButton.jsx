import { useEffect, useMemo, useState } from 'react';
import { Sparkle } from 'lucide-react'; // Default icon
import { loadFull } from 'tsparticles';
import Particles, { initParticlesEngine } from '@tsparticles/react';

const defaultOptions = {
  key: 'star',
  name: 'Star',
  particles: {
    number: { value: 20, density: { enable: false } },
    color: {
      value: [
        '#7c3aed',
        '#bae6fd',
        '#a78bfa',
        '#93c5fd',
        '#0284c7',
        '#fafafa',
        '#38bdf8',
      ],
    },
    shape: { type: 'star', options: { star: { sides: 4 } } },
    opacity: { value: 0.8 },
    size: { value: { min: 1, max: 4 } },
    rotate: {
      value: { min: 0, max: 360 },
      enable: true,
      direction: 'clockwise',
      animation: { enable: true, speed: 10, sync: false },
    },
    links: { enable: false },
    reduceDuplicates: true,
    move: { enable: true, center: { x: 120, y: 45 } },
  },
  interactivity: { events: {} },
  smooth: true,
  fpsLimit: 120,
  background: { color: 'transparent', size: 'cover' },
  fullScreen: { enable: false },
  detectRetina: true,
};

export default function CustomizableButton({
  buttonText = 'Generate thumbnails',
  colors = defaultOptions.particles.color.value,
  particleShape = 'star',
  particleSizeRange = { min: 1, max: 4 },
  animationSpeed = 10,
  emittersRate = { quantity: 5, delay: 0.5 },
  buttonStyles = 'group relative my-8 rounded-full bg-gradient-to-r from-blue-300/30 via-blue-500/30 via-40% to-purple-500/30 p-1 text-white transition-transform hover:scale-110 active:scale-105',
  textStyles = 'font-semibold',
  icon: IconComponent = Sparkle,
  iconProps = {},
  buttonContainerStyles = '',
  iconConfig = [
    {
      delay: '0s',
      size: 'size-6',
      positionClass: '-translate-y-0.5',
      animationClass: 'animate-sparkle',
    },
    {
      delay: '1s',
      size: 'size-2',
      positionClass: 'absolute bottom-2.5 left-3.5',
      animationClass: 'animate-sparkle',
    },
    {
      delay: '1.5s',
      size: 'size-1',
      positionClass: 'absolute left-5 top-2.5',
      animationClass: 'animate-sparkle',
    },
  ],
}) {
  const [particleState, setParticlesReady] = useState();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadFull(engine);
    }).then(() => {
      setParticlesReady('loaded');
    });
  }, []);

  const modifiedOptions = useMemo(() => {
    const options = { ...defaultOptions };
    options.particles.color.value = colors;
    options.particles.shape.type = particleShape;
    options.particles.size.value = particleSizeRange;
    options.particles.rotate.animation.speed = animationSpeed;
    options.emitters = [{ rate: emittersRate }];
    options.autoPlay = isHovering;
    return options;
  }, [
    colors,
    particleShape,
    particleSizeRange,
    animationSpeed,
    emittersRate,
    isHovering,
  ]);

  return (
    <button
      className={buttonStyles}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={`relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-300 via-blue-500 via-40% to-purple-500 px-4 py-2 text-white ${buttonContainerStyles}`}
      >
        {iconConfig.map((config, index) => (
          <IconComponent
            key={index}
            style={{ animationDelay: config.delay }}
            className={`${config.positionClass} ${config.size} ${config.animationClass} ${iconProps?.className || ''}`}
            {...iconProps}
          />
        ))}
        <span className={textStyles}>{buttonText}</span>
      </div>
      {!!particleState && (
        <Particles
          id="particles"
          className={`pointer-events-none absolute -bottom-4 -left-4 -right-4 -top-4 z-0 opacity-0 transition-opacity ${
            particleState === 'ready' ? 'group-hover:opacity-100' : ''
          }`}
          particlesLoaded={() => setParticlesReady('ready')}
          options={modifiedOptions}
        />
      )}
    </button>
  );
}
