import React from 'react';
import * as FaIcons from 'react-icons/fa';

export type IconComponentProps = {
  icon: keyof typeof FaIcons;
};

const IconComponent: React.FC<IconComponentProps> = ({ icon }) => {
  const Icon = FaIcons[icon];
  return <Icon className='mx-auto block' size='100' />;
};

export default IconComponent;
