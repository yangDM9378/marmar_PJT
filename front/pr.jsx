import React from 'react';
import styled from 'styled-components';

export default function pr() {
    return (
        <S.Content>
            <S.Flexbox>
                <S.Item>item</S.Item>
                <S.Item>item</S.Item>
                <S.Item>item</S.Item>
                <S.Item>item</S.Item>
            </S.Flexbox>
        </S.Content>
    );
}

const S = {
    Content: styled.section`
        border: 4px solid;
    `,
    Flexbox: styled.div`
        border: 4px solid;
    `,
    Item: styled.div`
        border: 4px solid;
    `,
}