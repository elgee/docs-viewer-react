# Expo mobile app to display my documentation portfolio

Run this React Native mobile app to view my technical writing portfolio. This portfolio includes links to live documentation I authored while working as a Senior Technical Content Developer at CloudBees. 

The [Expo](https://expo.dev) Go app is a sandbox mobile application that enables you to preview React Native applications on a mobile device without the need for a full development environment.

I set up this portfolio app using [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) so that you could view my portfolio on your phone, if desired.

## Technical recommendations

To view the portfolio, check that you have the following developer tools installed on your computer:

- Node.js
- npm
- Git
- Command line access in a terminal

NOTE: If you do not have these tools installed, you still can view the portfolio. 
Go to 

## How to use

You can run the portfolio app either on your phone or in a web browser.

### Run the app on your mobile phone

1. Download and install the appropriate version of the Expo Go app for your phone.

   - For Apple: [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - For Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. To start the development server, run in a terminal: 
   ```bash
   git clone https://github.com/elgee/docs-viewer-react.git
   cd docs-viewer-react
   npm install
   npx expo start
   ```

3. Open Expo Go on your phone.

4. Use the camera on your phone to scan the QR code displayed in your terminal.

5. The app loads directly on your phone. 

### Run the app in a web browser

1. To start the development server, run in a terminal: 
```bash
npm run web
```
2. The portfolio app opens at `http://localhost:8081`.

## Documentation Content

The app showcases real CloudBees platform documentation including:

- **Continuous Integration** - Pipeline configuration and build automation
- **GitHub Actions Integration** - Hybrid workflow capabilities  
- **Actions** - Reusable automation components
- **Applications** - Lifecycle management and deployment
- **Platform Lexicon** - Comprehensive terminology reference

Each section includes links to the live published documentation.

## Built With

- React Native
- Expo
- TypeScript
- Professional technical writing content

## About

This app serves as both a mobile development portfolio piece and a showcase of professional technical documentation work. Created to demonstrate React Native capabilities while highlighting real-world technical writing experience with enterprise software platforms.





## Resources from Expo

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
