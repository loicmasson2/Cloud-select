import React, { FunctionComponent } from 'react';
import { Button } from 'rebass';
type PrimaryButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
};
const PrimaryButton: FunctionComponent<PrimaryButtonProps> = (props) => {
    return (
        <Button backgroundColor="#093EFF" fontWeight="400" color="#53FF35" {...props}>
            {props.children}
        </Button>
    );
};

export default PrimaryButton;
