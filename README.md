# Mortgage Calculator Challange

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
You can see the [live demo](https://ebuyuran.github.io/mortgage-calculator/) here.

## Running in local environment

Simply install dependencies the with `npm install` and run the project with `npm start`.

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## 3rd party dependencies

This demo is dependent on following 3rd party packages.

* [Axios](https://www.npmjs.com/package/axios)
For the initial API request.
* [React Cookie](https://www.npmjs.com/package/react-cookie)
For setting and reading cookies with save button.
* [React Input Slider](https://www.npmjs.com/package/react-input-slider)
For changing down payment percentage in the form.
* [React Number Format](https://www.npmjs.com/package/react-number-format)
To input and display formatted numeric data.
* [Styled Components](https://styled-components.com/)
To write component based CSS and theming.

## Basic Structure

|-- __App.tsx__\
|-- _Entry point that sets initial form values from a cookie_\
|-- _or end-point with the theme-switcher._\
|-- |-- __MortgageCalculator.tsx__\
|-- |-- _Contains all the state handling logic in the form._\
|-- |-- |-- __PaymentDetails.tsx__\
|-- |-- |-- _Renders form elements._\
|-- |-- |-- __MonthlyPayment.tsx__\
|-- |-- |-- _Calculates and renders monthly payments._\
|-- |-- |-- __SaveButton.tsx__\
|-- |-- |-- _Renders the Save Button and sets the cookies._
