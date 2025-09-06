import React from 'react';
import { ImpulseInlineEmbed } from './impulse-inline-embed';
import { ImpulsePopupEmbed } from './impulse-popup-embed';
import { ImpulseEmbedProps } from '../types';

/**
 * universal Impulse Embed component that can render either inline or popup mode
 * based on the presence of children prop
 */
export const ImpulseEmbed: React.FC<ImpulseEmbedProps> = (props) => {
  const { children, mode, ...restProps } = props;

  // auto-detect mode based on children
  const embedMode = mode || (children ? 'popup' : 'inline');

  if (embedMode === 'popup') {
    if (!children) {
      throw new Error('ImpulseEmbed: children are required for popup mode');
    }
    
    return (
      <ImpulsePopupEmbed {...restProps}>
        {children}
      </ImpulsePopupEmbed>
    );
  }

  if (children) {
    console.warn('ImpulseEmbed: children prop is ignored in inline mode');
  }

  return <ImpulseInlineEmbed {...restProps} />;
};

ImpulseEmbed.displayName = 'ImpulseEmbed';
