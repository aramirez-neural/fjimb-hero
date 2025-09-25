"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

// Imágenes de ejemplo (puedes reemplazar con tus URLs reales)
const backgroundImages = [
  {
    id: 1,
    title: "Paisaje 1",
    src: "/image-1.webp",
    color: "from-red-400 to-pink-500",
    position: "top-[10%] left-[5%]",
  },
  {
    id: 2,
    title: "Paisaje 2",
    src: "/image-2.webp",
    color: "from-blue-400 to-cyan-500",
    position: "top-[20%] right-[10%]",
  },
  {
    id: 3,
    title: "Paisaje 3",
    src: "/image-3.webp",
    color: "from-green-400 to-emerald-500",
    position: "top-[60%] left-[8%]",
  },
  {
    id: 4,
    title: "Paisaje 4",
    src: "/image-4.webp",
    color: "from-yellow-400 to-orange-500",
    position: "top-[70%] right-[15%]",
  },
  {
    id: 5,
    title: "Paisaje 5",
    src: "/image-1.webp",
    color: "from-purple-400 to-pink-500",
    position: "top-[40%] left-[20%]",
  },
  {
    id: 6,
    title: "Paisaje 6",
    src: "/image-2.webp",
    color: "from-indigo-400 to-purple-500",
    position: "top-[30%] right-[30%]",
  },
  {
    id: 7,
    title: "Paisaje 7",
    src: "/image-3.webp",
    color: "from-teal-400 to-blue-500",
    position: "top-[80%] left-[40%]",
  },
  {
    id: 8,
    title: "Paisaje 8",
    src: "/image-4.webp",
    color: "from-amber-400 to-yellow-500",
    position: "top-[15%] left-[50%]",
  },
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
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
          <Image
            key={image.id}
            src={image.src}
            alt={image.title}
            width={300}
            height={400}
            className={`absolute rounded-2xl ${image.position ?? ""}`}
          />
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
