import React from "react";
import { Keyboard, TouchableWithoutFeedback ,View,Text, TouchableOpacity} from "react-native";

const SignUpScreen = ({navigation}) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Text>hello</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SignUpScreen