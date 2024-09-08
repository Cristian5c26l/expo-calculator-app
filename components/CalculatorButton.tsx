import { Text, Pressable } from 'react-native'
import * as Haptics from 'expo-haptics';

import { globalStyles } from '@/styles/global-styles';
import { Colors } from '@/constants/Colors';


interface Props {
    label: string;
    color?: string;
    blackText?: boolean;
    onPress: () => void;
    doubleSize?: boolean;
}

const CalculatorButton = ({
    label,
    color = Colors.darkGray,
    blackText = false,// Propiedades con valores por defecto hace que se pueda expandir facilmente este codigo y se evita al mismo tiempo que se rompa
    onPress,
    doubleSize = false,
}: Props) => {
    return (
        <Pressable
            style={({ pressed }) => ({
                ...globalStyles.button,
                backgroundColor: color,
                opacity: pressed ? 0.8 : 1,
                width: (doubleSize) ? 140 : globalStyles.button.width, // 140 = (globalStyles.button.width*2) + (globalStyles.button.marginHorizontal*2)
            })}
            onPress={() => {
                Haptics.selectionAsync();
                onPress();
            }}

        >
            <Text
                style={{
                    ...globalStyles.buttonText,
                    color: blackText ? 'black' : 'white'
                }}
            >{label}</Text>
        </Pressable>
    )
}

export default CalculatorButton