"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

// Imágenes de ejemplo (puedes reemplazar con tus URLs reales)
const backgroundImages = [
  {
    id: 1,
    title: "Paisaje 1",
    color: "from-red-400 to-pink-500",
    position: "top-[10%] left-[5%]",
  },
  {
    id: 2,
    title: "Paisaje 2",
    color: "from-blue-400 to-cyan-500",
    position: "top-[20%] right-[10%]",
  },
  {
    id: 3,
    title: "Paisaje 3",
    color: "from-green-400 to-emerald-500",
    position: "top-[60%] left-[8%]",
  },
  {
    id: 4,
    title: "Paisaje 4",
    color: "from-yellow-400 to-orange-500",
    position: "top-[70%] right-[15%]",
  },
  {
    id: 5,
    title: "Paisaje 5",
    color: "from-purple-400 to-pink-500",
    position: "top-[40%] left-[20%]",
  },
  {
    id: 6,
    title: "Paisaje 6",
    color: "from-indigo-400 to-purple-500",
    position: "top-[30%] right-[30%]",
  },
  {
    id: 7,
    title: "Paisaje 7",
    color: "from-teal-400 to-blue-500",
    position: "top-[80%] left-[40%]",
  },
  {
    id: 8,
    title: "Paisaje 8",
    color: "from-amber-400 to-yellow-500",
    position: "top-[15%] left-[50%]",
  },
  {
    id: 9,
    title: "Paisaje 1",
    color: "from-red-400 to-pink-500",
    position: "top-[10%] left-[5%]",
  },
  {
    id: 10,
    title: "Paisaje 2",
    color: "from-blue-400 to-cyan-500",
    position: "top-[20%] right-[10%]",
  },
  {
    id: 11,
    title: "Paisaje 3",
    color: "from-green-400 to-emerald-500",
    position: "top-[60%] left-[8%]",
  },
  {
    id: 12,
    title: "Paisaje 4",
    color: "from-yellow-400 to-orange-500",
    position: "top-[70%] right-[15%]",
  },
  {
    id: 13,
    title: "Paisaje 5",
    color: "from-purple-400 to-pink-500",
    position: "top-[40%] left-[20%]",
  },
  {
    id: 14,
    title: "Paisaje 6",
    color: "from-indigo-400 to-purple-500",
    position: "top-[30%] right-[30%]",
  },
  {
    id: 15,
    title: "Paisaje 7",
    color: "from-teal-400 to-blue-500",
    position: "top-[80%] left-[40%]",
  },
  {
    id: 16,
    title: "Paisaje 8",
    color: "from-amber-400 to-yellow-500",
    position: "top-[15%] left-[50%]",
  },
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  // Manejar movimiento del mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Calcular transformación del fondo basada en la posición del mouse
  const getBackgroundTransform = () => {
    const moveX = mousePosition.x * 6;
    const moveY = mousePosition.y * 6;
    return `translate(${-moveX}px, ${-moveY}px)`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-[#144e2a]"
    >
      {/* Capa de fondo con imágenes */}
      <div
        className="absolute inset-0 w-[150%] h-[150%] transition-transform duration-100 ease-out z-0"
        style={{
          transform: getBackgroundTransform(),
        }}
      >
        {backgroundImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute w-72 h-48 bg-gradient-to-br ${image.color} rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-3xl ${image.position}`}
            style={{
              opacity: 0.7 + mousePosition.x / 500, // Cambiar opacidad basada en posición del mouse
            }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-8 h-8 bg-white/40 rounded-full" />
              </div>
              {image.title}
            </div>
          </div>
        ))}
      </div>

      {/* Contenido principal del hero */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="bg-white/50 rounded-2xl p-6">
          <Image
            src="/logo-fundacion.png"
            alt="Logo"
            width={600}
            height={600}
            className="mb-4"
          />
        </div>
      </div>

      {/* Efecto de gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none z-10" />
    </div>
  );
}
