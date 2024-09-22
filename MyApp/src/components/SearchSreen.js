import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import React from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import AntDesign from "@expo/vector-icons/AntDesign"
import DataComponent from "./DataComponent"
import Feather from "@expo/vector-icons/Feather"
const data = [
    {
        msv: "31020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề hiện đại của Kỹ thuật máy tính",
        nhom: "CL",
    },
    {
        msv: "21020278",
        hvt: "Nguyễn Việt Anh",
        mmh: "INT3507 50",
        tmh: "LT hướng đối tượng",
        nhom: "CL",
    },
    {
        msv: "21020275",
        hvt: "Nguyễn Việt Anh",
        mmh: "INT3507 50",
        tmh: "LT căn bản",
        nhom: "CL",
    },
    {
        msv: "21020276",
        hvt: "Nguyễn Việt Việt",
        mmh: "INT3507 50",
        tmh: "Các vấn đề hiện đại của Kỹ thuật máy tính",
        nhom: "CL",
    },
    {
        msv: "21020275",
        hvt: "Nguyễn Việt Anh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề hiện đại của Kỹ thuật máy tính",
        nhom: "CL",
    },
    {
        msv: "21020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "21020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "21020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "21020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
    {
        msv: "22020277",
        hvt: "Nguyễn Việt Ánh",
        mmh: "INT3507 50",
        tmh: "Các vấn đề abcxycdu",
        nhom: "CL",
    },
]
export default function SearchScreen({navigation}) {
    const [selectedhocky, setSelectedhocky] = useState() //lay value
    const [selectedColumn, setSelectedColumn] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(data.length / selectedColumn)
    // Tổng số trang

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePagePress = (page) => {
        setCurrentPage(page)
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View>
                <Image
                    resizeMode="stretch"
                    style={{ width: "100%", height: 200 }}
                    source={require("../../assets/logo2.png")}
                ></Image>
            </View>
            <View style={{ flex: 1, margin: 12 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{ fontSize: 18, color: "black", marginRight: 8 }}
                    >
                        Học kỳ:
                    </Text>
                    <View style={{ flex: 1, borderWidth: 1, borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedhocky}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedhocky(itemValue)
                            }
                        >
                            <Picker.Item label="Lựa chọn học kỳ" value="none" />
                            <Picker.Item
                                label="Học kỳ 1 năm 2024-2025"
                                value="hk12024-2025"
                            />
                            <Picker.Item
                                label="Học kỳ 2 năm 2024-2025"
                                value="hk22024-2025"
                            />
                        </Picker>
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: "#ccc", 
                            borderRadius: 5, 
                            overflow: "hidden", // Đảm bảo các góc bo tròn hiển thị chính xác
                            width: 100,
                            height: 50,
                        }}
                    >
                        <Picker
                            style={styles.picker}
                            selectedValue={selectedColumn}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedColumn(itemValue)
                            }
                        >
                            <Picker.Item label="10" value="10" />
                            <Picker.Item label="20" value="20" />
                            <Picker.Item label="50" value="50" />
                            <Picker.Item label="100" value="100" />
                        </Picker>
                    </View>
                    <View style={styles.container}>
                        {/* Nút "Trước" chỉ hiển thị khi currentPage > 1 và không hiển thị số "1" ở nút này*/}
                        {currentPage > 1 && (
                            <TouchableOpacity
                                onPress={handlePrev}
                                style={styles.button}
                            >
                                <AntDesign
                                    name="leftcircle"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        )}

                        {/* Hiển thị các trang, bắt đầu từ 1 */}
                        {Array.from({ length: 5 }, (_, i) => {
                            let page = currentPage - 2 + i // Tính trang hiển thị

                            // Điều chỉnh hiển thị trang
                            if (currentPage <= 3) {
                                page = i + 1 // Hiển thị từ 1 đến 5 khi currentPage nhỏ hơn hoặc bằng 3
                            } else if (currentPage >= totalPages - 2) {
                                page = totalPages - 4 + i // Hiển thị 5 trang cuối khi currentPage gần cuối
                            }

                            return page > 0 && page <= totalPages ? page : null // Trả về trang hợp lệ hoặc null
                        })
                            .filter((page) => page !== null) // Lọc bỏ các giá trị null
                            .map((page) => (
                                <TouchableOpacity
                                    key={page}
                                    onPress={() => handlePagePress(page)}
                                    style={[
                                        styles.button,
                                        currentPage === page &&
                                            styles.activeButton,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.text,
                                            currentPage === page &&
                                                styles.activeText,
                                        ]}
                                    >
                                        {page}
                                    </Text>
                                </TouchableOpacity>
                            ))}

                        {/* Nút "Sau" chỉ hiển thị khi currentPage < totalPages */}
                        {currentPage < totalPages && (
                            <TouchableOpacity
                                onPress={handleNext}
                                style={styles.button}
                            >
                                <AntDesign
                                    name="rightcircle"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <DataComponent
                    data={data}
                    currentPage={currentPage}
                    selectedColumn={selectedColumn}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    picker: {
        height: 50, 
        width: 100, 
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        flex: 1,
    },
    button: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        margin: 2,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
    },
    activeButton: {
        backgroundColor: "blue",
    },
    activeText: {
        color: "white",
    },
})
