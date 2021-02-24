import React, { FunctionComponent } from 'react';
import { Card, Flex } from 'rebass';
import './App.css';

type ContainerProps = {
    children: React.ReactNode;
};

const Container: FunctionComponent<ContainerProps> = (props) => {
    return (
        <div className="container">
            <Flex
                sx={{
                    color: 'white',
                    minHeight: '100vh',
                    backgroundImage: 'linear-gradient(12.96deg, #093EFF 0%, #53FF35 75.96%)',
                    zIndex: 0,
                    position: 'relative',
                }}
                justifyContent="center"
            >
                <Flex alignItems="center" justifyContent="center">
                    <Card
                        width={1080}
                        height={960}
                        bg="white"
                        color="black"
                        sx={{
                            borderRadius: 20,
                        }}
                    >
                        {props.children}
                    </Card>
                </Flex>
            </Flex>
        </div>
    );
};

export default Container;
