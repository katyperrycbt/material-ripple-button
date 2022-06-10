import React, { useEffect, useRef, useState } from 'react';

function onBlurDeleteSpan(event) {
    const btn = event.currentTarget;
    // select all span with class "ripple" or "focusripple" 
    const spans = btn.querySelectorAll("span.tallisripple, span.tallisfocusripple");

    // delete all span
    for (let i = 0; i < spans.length; i++) {
        spans[i].remove();
    }
}

function rippleColor(r = 0, g = 0, b = 0, isDark = 0, source = 0) {
    const isBG = source === 0;
    let lightenColor;

    if (isDark) {
        if (!isBG) {
            lightenColor = `rgba(${r * 0.5}, ${g * 0.5}, ${b * 0.5}, 0.5)`;
        } else {
            lightenColor = `rgba(${Math.min(r * 1.5, 255)}, ${Math.min(g * 1.5, 255)}, ${Math.min(b * 1.5, 255)}, 0.5)`;
        }
    } else {
        if (isBG) {
            lightenColor = `rgba(${Math.min(r * 1.5, 255)}, ${Math.min(g * 1.5, 255)}, ${Math.min(b * 1.5, 255)}, 0.5)`;
        } else {
            lightenColor = `rgba(${r * 0.5}, ${g * 0.5}, ${b * 0.5}, 0.5)`;
        }
    }
    return lightenColor;
}

function focusRippleEffect(event) {
    event.stopPropagation();
    const btn = event.currentTarget;

    // clear focus ripple span if it exists
    const focusRipple = btn.querySelector("span.ripple");
    if (focusRipple) {
        return;
    }

    const circle = document.createElement("span");
    const radius = Math.sqrt(btn.clientWidth * btn.clientWidth, btn.clientHeight * btn.clientHeight);
    const diameter = radius * 2;
    const position = btn.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `-${position.width / 2}px`;
    circle.style.top = `-${radius - position.height / 2}px`;

    // get the background color of the button, then lighten that color and set it as the ripple color background
    let source = 0;
    let pickedColor = window.getComputedStyle(btn).getPropertyValue("background-color");

    // if there is no background color, use the text or border color if border color width is greater than 0

    if (Number(window.getComputedStyle(btn).getPropertyValue("border-width").replace("px", '')) > 0 &&
        (!pickedColor || ["transparent", "rgba(0, 0, 0, 0)", "rgb(0, 0, 0)"].includes(pickedColor))) {
        pickedColor = window.getComputedStyle(btn).getPropertyValue("border-color");
        source = 1;
    }


    if (!pickedColor || ["transparent", "rgba(0, 0, 0, 0)", "rgb(0, 0, 0)"].includes(pickedColor)) {
        pickedColor = window.getComputedStyle(btn).getPropertyValue("color");
        source = 2;
    }

    // if not, default is lightblue
    if (!pickedColor || ["transparent"].includes(pickedColor)) {
        pickedColor = "rgb(33, 150, 243)";
        source = 3;
    }


    // lighten rgb color by 50%
    const rgb = pickedColor.match(/\d+/g);

    const r = Number(rgb[0]);
    const g = Number(rgb[1]);
    const b = Number(rgb[2]);

    let lightenColor;
    // if the color is nearly black, make it lighter and vice versa
    if ((r + g + b) > 382.5) {
        lightenColor = rippleColor(r, g, b, false, source);
    } else {
        lightenColor = rippleColor(r, g, b, true, source);
    }

    circle.style.backgroundColor = `${lightenColor}`;
    circle.style.filter = `brightness(1.5)`;

    circle.classList.add("tallisfocusripple");

    btn.appendChild(circle);

    // delete this from the dom after 6s (3 loops of ripple animation)
    setTimeout(() => {
        circle.remove();
    }, 6000);
}

function rippleEffect(event) {
    event.stopPropagation();

    const btn = event.currentTarget;

    // clear focus ripple span if it exists
    const focusRipple = btn.querySelector("span.focusripple");
    if (focusRipple) {
        focusRipple.remove();
    }

    const circle = document.createElement("span");
    const radius = Math.sqrt(btn.clientWidth * btn.clientWidth, btn.clientHeight * btn.clientHeight);
    const diameter = radius * 2;
    const position = btn.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${(event.clientX || event.touches[0].clientX) - (position.left + radius)}px`;
    circle.style.top = `${(event.clientY || event.touches[0].clientY) - (position.top + radius)}px`;

    // get the background color of the button, then lighten that color and set it as the ripple color background
    let source = 0;
    let pickedColor = window.getComputedStyle(btn).getPropertyValue("background-color");

    // if there is no background color, use the text or border color if border color width is greater than 0

    if (Number(window.getComputedStyle(btn).getPropertyValue("border-width").replace("px", '')) > 0 &&
        (!pickedColor || ["transparent", "rgba(0, 0, 0, 0)", "rgb(0, 0, 0)"].includes(pickedColor))) {
        pickedColor = window.getComputedStyle(btn).getPropertyValue("border-color");
        source = 1;
    }


    if (!pickedColor || ["transparent", "rgba(0, 0, 0, 0)", "rgb(0, 0, 0)"].includes(pickedColor)) {
        pickedColor = window.getComputedStyle(btn).getPropertyValue("color");
        source = 2;
    }

    // if not, default is lightblue
    if (!pickedColor || ["transparent"].includes(pickedColor)) {
        pickedColor = "rgb(33, 150, 243)";
        source = 3;
    }


    // lighten rgb color by 50%
    const rgb = pickedColor.match(/\d+/g);

    const r = Number(rgb[0]);
    const g = Number(rgb[1]);
    const b = Number(rgb[2]);

    let lightenColor;
    // if the color is nearly black, make it lighter and vice versa
    if ((r + g + b) > 382.5) {
        lightenColor = rippleColor(r, g, b, false, source);
    } else {
        lightenColor = rippleColor(r, g, b, true, source);
    }

    circle.style.backgroundColor = `${lightenColor}`;
    circle.style.filter = `brightness(1.5)`;

    circle.classList.add("tallisripple");

    btn.appendChild(circle);

    // delete this from the dom after 1s
    setTimeout(() => {
        circle.remove();
    }, 1000);
}

const addEventToButtons = () => {
    let isTouchDevice = false;
    // check if is touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
        isTouchDevice = true;
    }

    // add event to all buttons that not has disableRipple attribute
    const buttons = document.querySelectorAll("button:not([data-noripple])");

    for (let i = 0; i < buttons.length; i++) {

        // remove old event
        buttons[i].removeEventListener("touchstart", rippleEffect, { passive: true });
        buttons[i].removeEventListener("mousedown", rippleEffect, { passive: true });
        buttons[i].removeEventListener("focus", focusRippleEffect, { passive: true });
        buttons[i].removeEventListener("blur", onBlurDeleteSpan, { passive: true });

        isTouchDevice
            ? buttons[i].addEventListener("touchstart", rippleEffect, { passive: true })
            : buttons[i].addEventListener("mousedown", rippleEffect, { passive: true });

        buttons[i].addEventListener("focus", focusRippleEffect, { passive: true });
        buttons[i].addEventListener("blur", onBlurDeleteSpan, { passive: true });
    }
}

const RippleButton = ({ children, ...props }) => {
    const btnRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const btn = btnRef?.current;
        if (window !== undefined && mounted && btn) {

            btn.classList.add('tallisbutton');

            addEventToButtons(btn);

            // on resize check if is touch device
            window.addEventListener("resize", () => addEventToButtons(btn), { passive: true });
            
            // check if is there any style tag with id "style-tallisripple"
            const styleTag = document.getElementById("style-tallisripple");

            if (!styleTag) {
                const style = document.createElement("style");
                style.id = "style-tallisripple";
                // add some styles
                style.innerHTML = css;
                document.head.appendChild(style);
            }

        }
    }, [mounted])

    useEffect(() => {
        window && setMounted(true);
    }, [])

    if (mounted) {
        return (
            <button ref={btnRef} {...props}>
                {children}
            </button>
        );
    } else {
        return <div></div>
    }
};

const css = `
    span.tallisripple {
        position: absolute;
	    border-radius: 50%;
	    transform: scale(0);
	    animation: tallisripple 1s ease;
	    background-color: rgba(255, 255, 255, 0.7);
    }
    @keyframes tallisripple {
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
    span.tallisfocusripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: tallisfocusripple 2s ease-in-out;
        animation-iteration-count: 3;
        background-color: rgba(255, 255, 255, 0.7);
    }
    
    @keyframes tallisfocusripple {
        0%,
        100% {
            transform: scale(40%);
            opacity: 0.5;
        }
        50% {
            transform: scale(45%);
            opacity: 0.5;
        }
    }
    button.tallisbutton {
        overflow: hidden;
	    position: relative;
	    -webkit-tap-highlight-color: transparent;
    }
`

export default RippleButton;