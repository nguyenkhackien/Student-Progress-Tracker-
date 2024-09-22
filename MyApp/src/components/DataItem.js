import { StyleSheet, Text, View ,TouchableOpacity} from "react-native"
import LoginScreen from "./LoginScreen"
const DataItem = (props) => {
    const { data } = props
    return (
        <TouchableOpacity style={styles.container}>
            <View
                style={[styles.column, { width: "20%", borderRightWidth: 1 }]}
            >
                <Text>{data.msv}</Text>
            </View>
            <View
                style={[styles.column, { width: "25%", borderRightWidth: 1 }]}
            >
                <Text>{data.hvt}</Text>
            </View>
            <View
                style={[styles.column, { width: "20%", borderRightWidth: 1 }]}
            >
                <Text>{data.mmh}</Text>
            </View>
            <View
                style={[styles.column, { width: "25%", borderRightWidth: 1 }]}
            >
                <Text>{data.tmh}</Text>
            </View>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "10%",
                }}
            >
                <Text>{data.nhom}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default DataItem
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    column: {
        // justifyContent: 'center', alignItems: 'center',
        paddingLeft: 4,
        height: 56,
    },
})
