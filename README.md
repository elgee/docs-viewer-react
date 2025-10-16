# Technical writing portfolio

Start here: [View portfolio](https://technical-writer-portfolio.netlify.app/). 
This portfolio is fully responsive and works on mobile browsers.

## Portfolio highlights

- **CloudBees actions reference**: 50+ pages of workflow automation actions with YAML examples (AsciiDoc)
- **SAML SSO configuration**: Enterprise authentication guide (AsciiDoc)
- **GitHub Actions integration**: 14-page guide to using GitHub Actions with CloudBees platform (AsciiDoc)
- **Stripe API testing using cURL**: Command-line testing guide (Markdown)
- **Stripe API testing using Postman**: API testing guide (DITA XML published as PDF)
- **CloudBees CI and Jenkins integration**: 6-page step-by-step setup and usage guide (AsciiDoc)
- **Platform lexicon**: 80+ term technical glossary (AsciiDoc)

## Development tools

This portfolio app is built with React Native and [Expo](https://expo.dev) to explore cross-platform development:

- Single codebase for web and mobile
- Responsive design principles
- Deployed to Netlify for web hosting
- Available via Expo Go for native mobile experience

## Run locally on a mobile phone with Expo Go

This portfolio is deployable as both a web app and a native mobile app.

To run as a native mobile app:

1. Confirm that you have Node.js, npm, and Git installed on your computer.

2. Install the appropriate version of the Expo Go app for your phone.

   - For Apple: [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - For Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

    >NOTE: Instructions have been verified on iOS only.

3. Start the Expo development server on your computer:
   ```bash
   git clone https://github.com/elgee/docs-viewer-react.git
   cd docs-viewer-react
   npm install
   npx expo start
   ```

4. Open the Expo Go app on your phone.

5. Use your phone camera to scan the QR code displayed in your terminal.

6. The app loads directly on your phone.
