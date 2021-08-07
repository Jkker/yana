import React from 'react';
import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  return <ul className="OptionsContainer">{title.toUpperCase()} PAGE</ul>;
};

export default Options;
