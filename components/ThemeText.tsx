import { Text, type TextProps } from 'react-native'
import React from 'react'
import { globalStyles } from '@/styles/global-styles';

interface Props extends TextProps {
    variant?: 'h1' | 'h2';
}

const ThemeText = ({ children, variant = 'h1', ...rest }: Props) => {
    return (
        <Text
            style={[
                { color: 'white', fontFamily: 'SpaceMono' },// Estilos 1
                variant === 'h1' && globalStyles.mainResult,// Estilos 2
                variant === 'h2' && globalStyles.subResult,// Estilos 3
            ]}

            {...rest}
            numberOfLines={1}
            adjustsFontSizeToFit
        >
            {children}
        </Text>
    )
}

export default ThemeText