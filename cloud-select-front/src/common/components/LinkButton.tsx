import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import MyPrimaryButton from 'common/components/PrimaryButton';

type LinkButtonProps = {
    children: React.ReactNode;
    to: string;
};
const LinkButton: FunctionComponent<LinkButtonProps> = (props) => {
    const history = useHistory();

    return (
        <MyPrimaryButton
            onClick={() => {
                history.push(props.to);
            }}
            {...props}
        >
            {props.children}
        </MyPrimaryButton>
    );
};

export default LinkButton;
