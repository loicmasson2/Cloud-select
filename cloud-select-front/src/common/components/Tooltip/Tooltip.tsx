import React, { FunctionComponent } from 'react';
import './Tooltip.css';

type TooltipProps = {
    children: React.ReactNode;
};

const Tooltip: FunctionComponent<TooltipProps> = (props) => {
    return <span className="tooltiptext">{props.children}</span>;
};
export default Tooltip;
