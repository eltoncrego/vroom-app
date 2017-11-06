<p align="center">
	<img src="https://github.com/eltoncrego/vroom-app/assets/companylogofullv2.png?raw=true" width="500">
</p>

# Building the Application for the First Time
## On Mac
1. Make sure you have node (6.11.4), npm and Xcode installed
2. Clone the repository into your desired location
3. Navigate to the vroom directory
4. run './init'

Thats it! Whenever you want to run the application run 'react-native run-ios'

## On Windows
1. Make sure you have node (6.11.4), npm and Android Studio installed
2. Clone the repository into your desired location
3. Navigate to the vroom directory
4. Use npm to install watchman globally
5. Use npm to install yarn globally
6. Use npm to install react-native-cli globally
7. Run 'npm install'

Thats it! Whenever you want to run the application run 'react-native run-android'

## Lessons Learned from using Android Studio to Emulate
### Written by Will Coates

* Follow this tutorial VERY CLOSELY! (Click on the Building Projects with Native Code tab) 
  If you skip a step it will cause you lots of problems that are difficult to unwind!
  https://facebook.github.io/react-native/docs/getting-started.html

* When setting up the environment variable ANDROID_HOME and adding tools and platform-tools to your PATH: 
	+ I did this (except for Windows), and it still didn't work. When I tried to build the app, 
    + I got an error that said it could not find the sdk. This persisted even though I tried a few different things (e.g. creating a file called local.properties in the root directory of the project, containing the line "sdk.dir = PATH_TO_SDK")
	+ I eventually had to re-install Android Studio. When I reinstalled it and opened a sample project, it prompted me to set the path to the SDK

* IMPORTANT: Once Android Studio is installed, you should create a sample project with it and open that! This will do a few things:
	+ It will give you access to the Android Virtual Device Manager, which is how you run the Android emulator that needs to be running before you build the react-native project
	+ It will give you some popups that are very useful:
		- Ex: a popup told me that I forgot to install the build-tools
		- KEY: a popup prompted me to set the path for the sdk folder

* Install yarn, as per Connick's directions (if you want to see those, search "directions" in the GitHub repository)	