import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import MyPrimaryButton from 'common/components/PrimaryButton';

type LinkButtonProps = {
    children: React.ReactNode;
    to: string;
};
const LinkButton: FunctionComponent<LinkButtonProps> = (props) => {
    return (
        <Link to={props.to}>
            <MyPrimaryButton {...props}>{props.children}</MyPrimaryButton>
        </Link>
    );
};

export default LinkButton;
