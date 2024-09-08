import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";



export const globalStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    calculatorContainer: {
        flex: 1,// ocupar todo el espacio (flex con flex-col)
        justifyContent: 'flex-end', // colocar todos los componentes interiores al final
        // padding: 20, // aplicar un margen interior de 20 (asi, dentro de ese margen, estará ubicado todo lo que se agregue dentro de View)
        paddingBottom: 20,// Para marcar una separacion de 20 entre la linea de abajo y lo ultimo que esté dentro de componente que use calculatorApp
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    mainResult: {
        color: Colors.textPrimary,
        fontSize: 70,
        textAlign: 'right',
        fontWeight: '400',
    },
    subResult: {
        color: Colors.textSecondary,
        fontSize: 40,
        textAlign: 'right',
        fontWeight: '300',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 18,
        paddingHorizontal: 10,
    },
    button: {
        height: 60,
        width: 60,
        backgroundColor: Colors.darkGray,
        borderRadius: 100,
        justifyContent: 'center', // para que los elementos estén centrados
        marginHorizontal: 10, // separacion (margen) de 10 tanto a la izquierda como a la derecha
    },
    buttonText: {
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        color: Colors.textPrimary,
        fontWeight: '300',
        fontFamily: 'SpaceMono',
    }
});