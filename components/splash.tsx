import Icon from "@react-native-vector-icons/fontawesome";
import LottieView from "lottie-react-native";
import React from "react";

import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

const Splash = () => {

    return (
        <ImageBackground
            source={require("../assets/ready1.jpg")}
            style={styles.background}
            blurRadius={5}
        >
            <View style={{ alignItems: "center", justifyContent: "center", width: width * .87, height: height * .7, backgroundColor: "#ffffff7d", borderRadius: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='pencil' size={height * .07} />
                    <Text style={{ fontSize: height * .05, fontWeight: "bold" }}> ToDo's</Text>
                </View>
                <View style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: height * .15,
                    marginLeft: 15,
                    marginRight: 15
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: height * .025,
                        fontWeight: "700"
                    }}>The most effective way to do a thing is to DO it.
                    </Text>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: height * .025,
                        fontWeight: "600"
                    }}>~ Amelia Earhant
                    </Text>
                </View>
            </View>


        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    open: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: "contain",
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        flex: 1,

    },
    text: {
        fontSize: 24,
        color: "black",
        fontWeight: "bold",
    },
});

export default Splash;