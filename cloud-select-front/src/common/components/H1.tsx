import React, { FunctionComponent } from 'react';
import { Heading } from 'rebass';

type H1Props = {
    children: React.ReactNode;
};

const H1: FunctionComponent<H1Props> = (props) => {
    return (
        <Heading fontFamily={'Ubuntu'} as={'h1'} fontSize={7} mt={4}>
            {props.children}
        </Heading>
    );
};
export default H1;
