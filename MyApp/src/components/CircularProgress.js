import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Svg, { Circle } from "react-native-svg"

const CircularProgress = ({
    size = 100,
    strokeWidth = 10,
    progress = 75,
    color = "#3498db",
    backgroundColor = "#e6e6e6",
}) => {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </Svg>
            <Text style={styles.text}>{`${progress}%`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { justifyContent: "center", alignItems: "center" },
    text: { position: "absolute", fontSize: 18, fontWeight: "bold" },
})

export default CircularProgress
