# TheGuardian
The CPR Guardian, was created as part of Saint Louis University's Senior Design projects. The app was created to provide a CPR guide geared toward a layperson with no training by offering tempo guidance, voice commands directing the user through CPR, and an audio compression depth feedback system all contained within the user’s phone, ensuring it will always be with them. The app was first developed using python & kivy, but after seeing the poor performance of the app, it was switched to be built using Javascript and the React Native & Expo frameworks.

# Build of App
Libraries:
- React Native
- Expo (av, sensors, splash-screen, status-bar)
- Mathjs (for filters used in working with accelerometer data)

Compiled with:
- Expo build:android

# Rundown of the App
<div align="left">
    <img src="/screenshots/Screenshot_20220524-144825_SDCPR.jpg" width="300px"</img> 
    <img src="/screenshots/Screenshot_20220524-144832_SDCPR.jpg" width="300px"</img> 
</div>

Home Screen & pop up for emergency calling feature

<div align="left">
    <img src="/screenshots/Screenshot_20220524-144837_SDCPR.jpg" width="300px"</img> 
    <img src="/screenshots/Screenshot_20220524-144843_SDCPR.jpg" width="300px"</img> 
</div>

When training mode is pressed the screen on the left is shown. If "how to use app" is selected, screen on the right is shown.

<div align="left">
    <img src="/screenshots/Screenshot_20220524-144857_SDCPR.jpg" width="300px"</img> 
    <img src="/screenshots/Screenshot_20220524-144903_SDCPR.jpg" width="300px"</img> 
</div>

Screen on the left is the CPR manual, and the screen on the right is shown when a user either selects to go through emergency mode on main menu screen, or practice mode on training mode screen.

<div align="left">
    <img src="/screenshots/Screenshot_20220524-144909_SDCPR.jpg" width="300px"</img>
    <img src="/screenshots/homescreen.jpg" width="300px"</img>
</div>

Once the green start button is pressed, the phone goes into the data collection mode seen on the image above. This mode will collect data for 3.2 seconds, rest for 0.7 seconds, and then process the data to give users audio feedback (if selected) every 4 seconds. The extra time given is to minimize the accelerometer values being backlogged due to the differences between JavaScript and the native modules pulling the accelerometer data. 
Last photo is the app sitting on the home screen of Galaxy S9.
