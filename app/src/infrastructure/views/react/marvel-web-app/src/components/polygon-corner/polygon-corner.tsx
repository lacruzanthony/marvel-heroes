import { FC, PropsWithChildren } from 'react';
import { DEFAULT_POLYGON } from '../constants';

export const PolygonCorner: FC<
  PropsWithChildren<{
    polygon?: string;
  }>
> = ({ children, polygon = DEFAULT_POLYGON }) => {
  const polygonStyle: React.CSSProperties = {
    clipPath: polygon,
  };

  return (
    <div style={polygonStyle}>{children}</div>
  );
};
