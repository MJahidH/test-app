import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Animated, Pressable } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler";
import * as Speech from "expo-speech";
import Icon from "react-native-vector-icons/FontAwesome";
import {AppCenterReactNative} from 'appcenter-react-native';
import {AppCenterReactNativeAnalytics} from 'appcenter-analytics';
import {AppCenterReactNativeCrashes} from 'appcenter-crashes';

AppCenterReactNative.setLogLevel(AppCenterReactNative.LogLevel.VERBOSE);
AppCenterReactNativeAnalytics.setEnabled(true);
AppCenterReactNativeCrashes.setEnabled(true);

const App = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [backgroundColor, setBackgroundColor] = useState("black");

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const onHandleStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      // Determine swipe direction and set color accordingly
      setBackgroundColor(translationX > 0 ? "green" : "red");

      // Reset the translation and color more quickly
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        stiffness: 500, // Increased stiffness
        damping: 490, // Decreased damping
        // Optional: adjust speed and bounciness for more effect tuning
      }).start(() => {
        // Optionally, add a short delay before resetting color
        setTimeout(() => {
          setBackgroundColor("black");
        }, 500); // Delay in milliseconds before going back to black
      });
    }
  };

  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("Button has been double tapped");
    }
  };

  const speakText = () => {
    console.log(`hello this is the text function`);
    Speech.stop();
    Speech.speak(`hello world`, {
      language: `en-US`,
      rate: 0.5,
      pitch: 1.2,
    });
  };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <TapGestureHandler onHandlerStateChange={onDoubleTap} numberOfTaps={2}>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandleStateChange}
          >
            <Animated.View
              style={[
                styles.subContainer,
                { backgroundColor, transform: [{ translateX }] },
              ]}
            >
              <Text style={styles.text}>Hello World</Text>
            </Animated.View>
          </PanGestureHandler>
        </TapGestureHandler>
      </GestureHandlerRootView>
      <Pressable onPress={speakText}>
        <Text style={[styles.text, { marginBottom: 300 }]}>Hello World</Text>
      </Pressable>
      <Icon name="rotate-right" 
      size={100}
      color="yellow" 
      style={{marginBottom : 100}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  subContainer: {
    padding: 30,
    borderColor: "#FFF",
    borderWidth: 1,
  },
  text: {
    color: "#FFF",
    fontSize: 36,
  },
});

export default App;
