import React, { useEffect, useRef } from 'react';
import { ImpulseEmbed } from '@impulse/embed-js';
import { ImpulseInlineEmbedProps } from '../types';

export const ImpulseInlineEmbed: React.FC<ImpulseInlineEmbedProps> = ({
  className = '',
  style = {},
  url,
  width,
  height,
  customCSS,
  onLoad,
  onSubmit,
  params,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const embedRef = useRef<InstanceType<typeof ImpulseEmbed> | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // clean up existing embed
      if (embedRef.current) {
        embedRef.current.destroy();
      }

      // create new embed
      embedRef.current = new ImpulseEmbed({
        url,
        mode: 'inline',
        container: containerRef.current,
        width,
        height,
        customCSS,
        onLoad,
        onSubmit,
        params,
      });
    }

    // cleanup on unmount
    return () => {
      if (embedRef.current) {
        embedRef.current.destroy();
      }
    };
  }, [url, width, height, customCSS, onLoad, onSubmit, params]);

  return (
    <div
      ref={containerRef}
      className={`impulse-embed-container ${className}`}
      style={style}
      {...props}
    />
  );
};

ImpulseInlineEmbed.displayName = 'ImpulseInlineEmbed';
