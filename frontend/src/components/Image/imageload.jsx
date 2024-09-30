import React, { useState, useEffect } from 'react';

const OptimizedImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImageSrc(src);
  }, [src]);

  return (
    <>
      {!imageSrc && <div className={`${className} bg-gray-200 animate-pulse`} />}
      {imageSrc && <img src={imageSrc} alt={alt} className={className} />}
    </>
  );
};

export default OptimizedImage;