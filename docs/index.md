# material-ripple-button 
### React Ripple Button

## Description

React Ripple Button is similar to Material Design Button and may be used in standalone React applications or in conjunction with a CSS framework such as TailwindCSS.

![Material Ripple Button!](https://img.upxi.me/PB4mrAmu3 "Illustration")

## Installation

```terminal
pnpm add material-ripple-button
```

or

```terminal
yarn add material-ripple-button
```

or

```
npm install material-ripple-button
```

## Usage

```jsx
import RippleButton from 'material-ripple-button';

const MyComponent = () => {
    return <>
        {/* ... */}
        <RippleButton>This is a ripple button</RippleButton>
    </>
}
```

### Properties

| Propery                                                                                | Supported |
| -------------------------------------------------------------------------------------- | --------- |
| [Default attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) | YES       |

*Note*: Disable ripple and turn it into normal button by adding attribute `data-noripple`

You can use any attribute, these will be completely passed directly into the `<button>` tag

### Example

```jsx
import RippleButton from "material-ripple-button";

export default function Home() {
	return (
		<>
			{/* Other code */}
			<RippleButton className="mt-5 p-2 text-red-500">Hello</RippleButton>
		</>
	);
}
```

![Ripple Button!](https://img.upxi.me/sRAZdKHqtZ "Result of Ripple Button usage")

### On Focus
When the button is focused, the ripple effect also appears but has a different behavior, and either disappears after a few seconds or disappears immediately when it is pressed/touched (mousedown/touchstart).

![On Focus](https://img.upxi.me/i1Ak5P "On focus ripple effect")

## Ripple Color

The color of ripple is based on the color of the button's attribute in the order of precedence as follows:

|Order | Attribute      | Color Level (r+g+b) | Behavior |
|:------| :-----------: | :-----------: | ----------:|
|1 | background-color | > 385.5       | darker |
|| background-color | <= 385.5       | lighter |
|2| border-color | > 385.5       | lighter |
|| border-color | <= 385.5       | darker |
|3| color | > 385.5       | lighter |
|| color | <= 385.5       | darker |
|4| default |        | lighter of rgb(33, 150, 243) |
