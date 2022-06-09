"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function() {
        return cache;
    };
    return cache;
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function rippleColor() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, b = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, isDark = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, source = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
    var isBG = source === 0;
    var lightenColor;
    if (isDark) {
        if (!isBG) {
            lightenColor = "rgba(".concat(r * 0.5, ", ").concat(g * 0.5, ", ").concat(b * 0.5, ", 0.5)");
        } else {
            lightenColor = "rgba(".concat(Math.min(r * 1.5, 255), ", ").concat(Math.min(g * 1.5, 255), ", ").concat(Math.min(b * 1.5, 255), ", 0.5)");
        }
    } else {
        if (isBG) {
            lightenColor = "rgba(".concat(Math.min(r * 1.5, 255), ", ").concat(Math.min(g * 1.5, 255), ", ").concat(Math.min(b * 1.5, 255), ", 0.5)");
        } else {
            lightenColor = "rgba(".concat(r * 0.5, ", ").concat(g * 0.5, ", ").concat(b * 0.5, ", 0.5)");
        }
    }
    return lightenColor;
}
function rippleEffect(event) {
    event.stopPropagation();
    var btn = event.currentTarget;
    var circle = document.createElement("span");
    var diameter = Math.max(btn.clientWidth, btn.clientHeight);
    var radius = diameter / 2;
    var position = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = "".concat(diameter, "px");
    circle.style.left = "".concat((event.clientX || event.touches[0].clientX) - (position.left + radius), "px");
    circle.style.top = "".concat((event.clientY || event.touches[0].clientY) - (position.top + radius), "px");
    // get the background color of the button, then lighten that color and set it as the ripple color background
    var source = 0;
    var pickedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    // if there is no background color, use the text or border color if border color width is greater than 0
    if (Number(window.getComputedStyle(btn).getPropertyValue("border-width").replace("px", "")) > 0 && (!pickedColor || [
        "transparent",
        "rgba(0, 0, 0, 0)",
        "rgb(0, 0, 0)"
    ].includes(pickedColor))) {
        pickedColor = window.getComputedStyle(btn).getPropertyValue("border-color");
        source = 1;
    }
    if (!pickedColor || [
        "transparent",
        "rgba(0, 0, 0, 0)",
        "rgb(0, 0, 0)"
    ].includes(pickedColor)) {
        pickedColor = window.getComputedStyle(btn).getPropertyValue("color");
        source = 2;
    }
    // if not, default is lightblue
    if (!pickedColor || [
        "transparent"
    ].includes(pickedColor)) {
        pickedColor = "rgb(33, 150, 243)";
        source = 3;
    }
    // lighten rgb color by 50%
    var rgb = pickedColor.match(/\d+/g);
    var r = Number(rgb[0]);
    var g = Number(rgb[1]);
    var b = Number(rgb[2]);
    var lightenColor;
    // if the color is nearly black, make it lighter and vice versa
    if (r + g + b > 382.5) {
        lightenColor = rippleColor(r, g, b, false, source);
    // lightenColor = `rgba(${Math.min(r * 1.5, 255)}, ${Math.min(g * 1.5, 255)}, ${Math.min(b * 1.5, 255)}, 0.5)`;
    } else {
        lightenColor = rippleColor(r, g, b, true, source);
    // lightenColor = `rgba(${r * 0.5}, ${g * 0.5}, ${b * 0.5}, 0.5)`;
    }
    circle.style.backgroundColor = "".concat(lightenColor);
    circle.style.filter = "brightness(1.5)";
    circle.classList.add("tallisripple");
    btn.appendChild(circle);
    // delete this from the dom after 1s
    setTimeout(function() {
        circle.remove();
    }, 1000);
}
var addEventToButtons = function(btn) {
    var isTouchDevice = false;
    // check if is touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
        isTouchDevice = true;
    }
    // check if this Button has data-noripple attribute
    var noRipple = btn.getAttribute("data-noripple");
    if (noRipple) {
        return;
    }
    // remove old event
    btn.removeEventListener("touchstart", rippleEffect, {
        passive: true
    });
    btn.removeEventListener("mousedown", rippleEffect, {
        passive: true
    });
    isTouchDevice ? btn.addEventListener("touchstart", rippleEffect, {
        passive: true
    }) : btn.addEventListener("mousedown", rippleEffect, {
        passive: true
    });
};
var RippleButton = function(_param) {
    var children = _param.children, props = _objectWithoutProperties(_param, [
        "children"
    ]);
    var btnRef = (0, _react).useRef(null);
    var ref = _slicedToArray((0, _react).useState(false), 2), mounted = ref[0], setMounted = ref[1];
    (0, _react).useEffect(function() {
        var btn = btnRef === null || btnRef === void 0 ? void 0 : btnRef.current;
        if (window !== undefined && mounted && btn) {
            addEventToButtons(btn);
            // on resize check if is touch device
            window.addEventListener("resize", function() {
                return addEventToButtons(btn);
            }, {
                passive: true
            });
            // check if is there any style tag with id "style-tallisripple"
            var styleTag = document.getElementById("style-tallisripple");
            if (!styleTag) {
                var style = document.createElement("style");
                style.id = "style-tallisripple";
                // add some styles
                style.innerHTML = css;
                document.head.appendChild(style);
            }
        }
    }, [
        mounted
    ]);
    (0, _react).useEffect(function() {
        window && setMounted(true);
    }, []);
    if (mounted) {
        return /*#__PURE__*/ _react.default.createElement("button", _extends({
            ref: btnRef
        }, props), children);
    } else {
        return /*#__PURE__*/ _react.default.createElement("div", null);
    }
};
var css = "\n    span.tallisripple {\n        position: absolute;\n        border-radius: 50%;\n        transform: scale(0);\n        animation: tallisripple 1s ease-out;\n        background-color: rgba(255, 255, 255, 0.7);\n    }\n    @keyframes tallisripple {\n        to {\n            transform: scale(4);\n            opacity: 0;\n        }\n    }\n    button.tallisripple {\n        overflow: hidden;\n	    position: relative;\n	    -webkit-tap-highlight-color: transparent;\n    }\n";
var _default = RippleButton;
exports.default = _default;
