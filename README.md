
# Demo: Credit card validated input
*Demonstrating a React component: credit card number input*

## Contributors

* [Jeff Teng](mailto:j.teng@griffith.edu.au)

## Dependencies

* [Git](https://git-scm.com)
* [Node (v8)](https://nodejs.org)
* [Yarn (v1.10.1)](https://yarnpkg.com/en/)
* [EditorConfig](http://editorconfig.org)
* [React](https://reactjs.org/)
* [Styled-components](https://www.styled-components.com/)

## Getting Started

1\. Ensure all [Dependencies](#dependencies) have been resolved.

2\. Install application dependencies.

```bash
npm install
or
yarn install
```

3\. Start dev-server for demonstration

```bash
npm run hot
or
yarn hot
```


## Testing

Testing provided by [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/).

```bash
npm run test
or
yarn test
```

## CreditCardInput

*A simple component for React, allow user to input credit card number and validate the number*
*A react component is located at [./app/components/CreditCardInput](./app/components/CreditCardInput)*

### Props
| Props | type | optional |  |
|--- | :---: | :---: | --- |
|`getValidResult` | *function* | yes | Callback method for parent component to get validation result

### Usage
```
const getValidResult = (result) => { console.log(result) }

<CreditCardInput getValidResult={getValidResult}/>
```
*Parent component can use `props: getValidResult` to get the result of validation. The result will be `valid | invalid | matching`*

`valid`: the input number is a valid credit card number  
`invalid`: the input number is an invalid credit card number  
`matching`: the input number still under validating process


