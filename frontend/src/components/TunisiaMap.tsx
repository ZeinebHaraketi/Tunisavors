'use client';

import React, { useState } from 'react';
import TunisiaMapSVG from '/mapT.svg';

const regions = [
  {
    name: 'Le Kef',
    description: 'Famous for its olive oil and traditional dishes.',
    imageUrl: '/images/le-kef.jpg', // Assure-toi que le chemin est correct
    pathId: 'le-kef',
  },
  {
    name: 'Djerba',
    description: 'Known for seafood and Mediterranean flavors.',
    imageUrl: '/images/djerba.jpg', // Assure-toi que le chemin est correct
    pathId: 'djerba',
  },
  {
    name: 'Sfax',
    description: 'A mix of coastal and inland flavors with a touch of spice.',
    imageUrl: '/images/sfax.jpg', // Assure-toi que le chemin est correct
    pathId: 'sfax',
  },
  {
    name: 'Autre Région', // Ajoute d'autres régions selon ton SVG
    description: 'Description de cette autre région.',
    imageUrl: '/images/autre-region.jpg', // Assure-toi que le chemin est correct
    pathId: 'autre-region',
  },
  // Ajoute ici d'autres régions...
];

const TunisiaMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const handleMouseEnter = (event: React.MouseEvent<SVGPathElement>) => {
    const regionId = event.currentTarget.id;
    const regionName = regions.find((region) => region.pathId === regionId)?.name;
    if (regionName) {
      setHoveredRegion(regionName);
    }
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
  };

  return (
    <section className="py-20 bg-white text-center px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-[#A12312] mb-10">
        Explore Tunisia’s Culinary Regions
      </h2>

      <div className="relative">
        {/* Carte de la Tunisie */}
        <div className="w-full max-w-[600px] mx-auto">
          <TunisiaMapSVG
            className="w-full h-auto"
            onMouseOver={(event: any) => {
              if (event.target instanceof SVGPathElement) {
                handleMouseEnter(event);
              }
            }}
            onMouseOut={handleMouseLeave}
          />
        </div>

        {/* Tooltip */}
        {hoveredRegion && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg max-w-xs">
            <img
              src={regions.find((region) => region.name === hoveredRegion)?.imageUrl || '/images/default.jpg'}
              alt={hoveredRegion}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold text-[#A12312]">{hoveredRegion}</h4>
            <p className="text-sm text-gray-600">
              {regions.find((region) => region.name === hoveredRegion)?.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TunisiaMap;