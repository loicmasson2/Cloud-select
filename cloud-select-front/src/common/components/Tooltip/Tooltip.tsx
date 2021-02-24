import React, { FunctionComponent } from 'react';
import './Tooltip.css';

type TooltipProps = {
    children: React.ReactNode;
};

const Tooltip: FunctionComponent<TooltipProps> = (props) => {
    return (
        <div className="tooltip">
            <span className="tooltiptext">{props.children}</span>
        </div>
    );
};
export default Tooltip;
