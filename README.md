# Appetite: Sample app.

## About

This sample app is built in Ionic Framework, to test it, just clone this repository and install the app on your android device (Only optimized for that platform right now). The app is located at:

```
$ dist/android-debug.apk
```

## Dev enviroment installation

Once cloned and located at the index of the folder, run the following commands to install the development environment:  

```
$ npm install
$ bower install
$ ionic state restore
$ ionic config build
```

## Recompile the app

Run the following command from the index of the Ionic project to build a new apk, make sure your device is connected via usb to auto install it (Usb debugging is required).

```
$ ionic run android
```

For web testing run the following command and test at your favorite browser at: localhost:8100.


```
$ ionic serve -b --livereload
```

A sample app by **Vasily Crespo  |  Jul 2016.**