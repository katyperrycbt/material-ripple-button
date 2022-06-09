import React, { useEffect, useRef, useState } from 'react';

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

function rippleEffect(event) {
    event.stopPropagation();
    const btn = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
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
        // lightenColor = `rgba(${Math.min(r * 1.5, 255)}, ${Math.min(g * 1.5, 255)}, ${Math.min(b * 1.5, 255)}, 0.5)`;
    } else {
        lightenColor = rippleColor(r, g, b, true, source);
        // lightenColor = `rgba(${r * 0.5}, ${g * 0.5}, ${b * 0.5}, 0.5)`;
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

const addEventToButtons = (btn) => {
    let isTouchDevice = false;
    // check if is touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
        isTouchDevice = true;
    }

    // check if this Button has data-noripple attribute
    const noRipple = btn.getAttribute("data-noripple");

    if (noRipple) {
        return;
    }

    // remove old event
    btn.removeEventListener("touchstart", rippleEffect, { passive: true });
    btn.removeEventListener("mousedown", rippleEffect, { passive: true });

    isTouchDevice
        ? btn.addEventListener("touchstart", rippleEffect, { passive: true })
        : btn.addEventListener("mousedown", rippleEffect, { passive: true });

}

const RippleButton = ({ children, ...props }) => {
    const btnRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const btn = btnRef?.current;
        if (window !== undefined && mounted && btn) {
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
        animation: tallisripple 1s ease-out;
        background-color: rgba(255, 255, 255, 0.7);
    }
    @keyframes tallisripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    button.tallisripple {
        overflow: hidden;
	    position: relative;
	    -webkit-tap-highlight-color: transparent;
    }
`

export default RippleButton;