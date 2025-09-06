import React, { useEffect, useRef } from 'react';
import { ImpulseEmbed } from '@impulse/embed-js';
import { ImpulsePopupEmbedProps } from '../types';

export const ImpulsePopupEmbed: React.FC<ImpulsePopupEmbedProps> = ({
  children,
  className = '',
  style = {},
  triggerAs: TriggerElement = 'button',
  triggerProps = {},
  url,
  width,
  height,
  customCSS,
  onLoad,
  onClose,
  onSubmit,
  params,
  ...props
}) => {
  const triggerRef = useRef<HTMLElement>(null);
  const embedRef = useRef<InstanceType<typeof ImpulseEmbed> | null>(null);

  useEffect(() => {
    if (triggerRef.current) {
      // Clean up existing embed
      if (embedRef.current) {
        embedRef.current.destroy();
      }

      // Create new embed
      embedRef.current = new ImpulseEmbed({
        url,
        mode: 'popup',
        trigger: triggerRef.current,
        width,
        height,
        customCSS,
        onLoad,
        onClose,
        onSubmit,
        params,
      });
    }

    // Cleanup on unmount
    return () => {
      if (embedRef.current) {
        embedRef.current.destroy();
      }
    };
  }, [url, width, height, customCSS, onLoad, onClose, onSubmit, params]);

  const handleClick = (event: React.MouseEvent) => {
    // Don't prevent default - let the vanilla JS embed handle it
    // Just call custom onClick if provided
    if (triggerProps.onClick) {
      triggerProps.onClick(event);
    }
  };

  return React.createElement(
    TriggerElement,
    {
      ref: triggerRef,
      className: `impulse-embed-trigger ${className}`,
      style,
      onClick: handleClick,
      ...triggerProps,
      ...props,
    },
    children
  );
};

ImpulsePopupEmbed.displayName = 'ImpulsePopupEmbed';
