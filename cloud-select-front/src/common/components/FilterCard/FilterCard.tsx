import React, { FunctionComponent } from 'react';
import { Card } from 'rebass';
import './FilterCard.css';

type CardProps = {
    children: React.ReactNode;
};

const FilterCard: FunctionComponent<CardProps> = (props) => {
    return (
        <div className="card">
            <Card
                sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.125) 0px 0px 4px',
                }}
                width={256}
                height={200}
                m={4}
            >
                {props.children}
            </Card>
        </div>
    );
};
export default FilterCard;
