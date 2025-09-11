import React, { useEffect, useRef } from 'react';
import { useImpulseEmbed } from '../hooks/use-impulse-embed';
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

  const { embedInstance, createPopupEmbed, destroyEmbed } = useImpulseEmbed({
    url,
    mode: 'popup',
    width,
    height,
    customCSS,
    onLoad,
    onClose,
    onSubmit,
    params,
  });

  useEffect(() => {
    if (triggerRef.current) {
      createPopupEmbed();
    }
    return () => {
      destroyEmbed();
    };
  }, [url, width, height, customCSS, onLoad, onClose, onSubmit, params, createPopupEmbed, destroyEmbed]);

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
