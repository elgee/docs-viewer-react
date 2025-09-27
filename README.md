# Expo mobile app to display my documentation portfolio

Run this React Native mobile app to view my technical writing portfolio. This portfolio includes links to live documentation I authored while working as a Senior Technical Content Developer at CloudBees. 

I set up my portfolio using [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) so that you could view it on your phone, if desired.

The [Expo](https://expo.dev) Go app is a sandbox mobile application that enables you to preview React Native applications on a mobile device without the need for a full development environment.

NOTE: If you do not want to install the Expo Go app on your phone, you can still view my portfolio! 
Go to [https://storied-semifreddo-5b2900.netlify.app/](
   https://storied-semifreddo-5b2900.netlify.app/). Enjoy.

## Technical requirements for viewing on mobile

If you want to view my portfolio on your Apple or Android mobile phone:

1. Check that you have the following developer tools installed on your computer:

   - Node.js
   - npm
   - Git
   - Command line access in a terminal

2. Install the appropriate version of the Expo Go app for your phone.

   - For Apple: [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - For Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Run the portfolio app on your phone

1. Start the Expo development server: 
   ```bash
   git clone https://github.com/elgee/docs-viewer-react.git
   cd docs-viewer-react
   npm install
   npx expo start
   ```

2. Open the Expo Go app on your phone.

3. Use your phone camera to scan the QR code displayed in your terminal.

4. The app loads directly on your phone. 

![Home Screen](images/image0.png)
*Home screen of the portfolio app*

![Expanded Documentation](images/image1.png)
*Continuous Integration expanded view*

Select **View Live Documentation** to go to the documentation for that section. 

## Portfolio content

The app showcases real CloudBees platform documentation. 
Select **View Live Documentation** to display the introductory page to each documentation section authored by me.
Some sections contain more than 50 pages. 

- **Continuous Integration** 
- **GitHub Actions integration** 
- **Actions** 
- **Applications** 
- **Lexicon** 

## Built with

- React Native
- Expo
- TypeScript
- Professional technical writing content

## About

This app serves as a portfolio for both professional technical documentation work and React Native mobile app development. 
