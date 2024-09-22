import { FlatList, StyleSheet, Text, TextInput, View } from "react-native"
import LoginScreen from "./LoginScreen"
import DataItem from "./DataItem"
import Feather from "@expo/vector-icons/Feather"
import { useState } from "react"
const DataComponent = (props) => {
    const { data, currentPage, selectedColumn } = props
    const [searchMsv, setSearchMsv] = useState("")
    const startIndex = (currentPage - 1) * selectedColumn
    const endIndex = startIndex + selectedColumn

    // Cắt mảng data dựa trên số trang hiện tại
    const paginatedData = data.slice(startIndex, endIndex)
    const filteredData = data.filter((item) =>
        item.msv.trim().includes(searchMsv.trim())
    )
    const displayedData = searchMsv
        ? filteredData
        : filteredData.slice(startIndex, endIndex)
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    padding: 6,
                    margin: 10,
                    flexDirection: "row",
                }}
            >
                <TextInput
                    style={{ flex: 1, marginLeft: 10, height: 40 }}
                    value={searchMsv}
                    onChangeText={(val) => setSearchMsv(val)}
                    placeholder="Tìm kiếm theo MSV..."
                    placeholderTextColor="gray"
                />
                <Feather name="search" size={24} color="black" />
            </View>
            <View style={styles.container}>
                <View
                    style={[
                        styles.column,
                        { width: "20%", borderRightWidth: 1 },
                    ]}
                >
                    <Text>MSV</Text>
                </View>
                <View
                    style={[
                        styles.column,
                        { width: "25%", borderRightWidth: 1 },
                    ]}
                >
                    <Text>Họ Và Tên</Text>
                </View>
                <View
                    style={[
                        styles.column,
                        { width: "20%", borderRightWidth: 1 },
                    ]}
                >
                    <Text>MMH</Text>
                </View>
                <View
                    style={[
                        styles.column,
                        { width: "25%", borderRightWidth: 1 },
                    ]}
                >
                    <Text>Tên MH</Text>
                </View>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "10%",
                    }}
                >
                    <Text>Nhóm</Text>
                </View>
            </View>
            {displayedData.map((item, index) => (
                <DataItem key={index} data={item} />
            ))}
        </View>
    )
}
export default DataComponent
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderWidth: 1,
        backgroundColor: "#afdede",
        justifyContent: "center",
        alignItems: "center",
    },
    column: {
        justifyContent: "center",
        alignItems: "center",
        height: 28,
    },
})
