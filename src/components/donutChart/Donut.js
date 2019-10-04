import React from 'react';
import './donut.scss';

let rotateAngle = 0;

const SIZE = 34;
const PREFIX = 'donut';

const halfSize = SIZE / 2;
const circleProps = {
	cx: halfSize,
	cy: halfSize,
	r: halfSize - 1
};

const getClassName = (p, c) => `${p}${c}`;

const Donut = ({
  remaining = 0,
  total = 0,
  prefix = PREFIX
  
}) => (
	<div className={getClassName(prefix, remaining < 0 ? ' is--negative' : '')}>
		<svg
			className={getClassName(prefix, '__canvas')}
			width={SIZE}
			height={SIZE}
			viewBox={`0 0 ${SIZE} ${SIZE}`}
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				className={getClassName(prefix, '__frame')}
				{...circleProps}
			/>

			<circle
				className={getClassName(prefix, '__circle')}
				strokeDasharray={`${Math.abs((remaining / total) * 100)} 100`}
				{...circleProps}
			/>
		</svg>

    <div className={getClassName(prefix, '__text')}>
      {`${remaining}/${total}`}
    </div>
	</div>
);

export default Donut;