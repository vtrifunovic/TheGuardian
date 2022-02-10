# TheGuardian
SeniorDesignCPR app but in Javascript/React Native

# Setup
Init as react-native project, install expo and the accelerometer dependency, upload to phone with `expo run:android` then `npx react-native start` to debug with metro.

https://docs.expo.dev/bare/installing-expo-modules/

# Logging Accelerometer data:
`npx react-native log-android`

ctrl+c to kill

`adb logcat  > log.txt`

pop into folder with fileclean.py, run `python3 fileclean.py` to remove unwanted log data
