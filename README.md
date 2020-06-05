# `createElement`

JS helper function that bundles element creation into a single call.

```js
import createElement from "./createElement.js";

{
    // Create an empty element
    const container = createElement("section");
}

{
    // Create an element with some text
    const container = createElement("span", {
        textContent: "Wow",
    });
}

{
    // Create an element with some children, and append it to the document
    const container = createElement("div", {
        parent: document.body,
        children: [
            createElement("span", {textContent: "A"}),
            createElement("span", {textContent: "B"}),
            createElement("span", {textContent: "C"}),
        ],
    });
}

{
    // Create an element with some attributes and properties
    const input = createElement("input", {
        attributes: [
            ["title", "Type in me!!"],
        ],

        properties: {
            type: "number",
            value: "5",
            placeholder: "0",
        },
    });
}

{
    // Create an element with some event listeners
    const image = createElement(Image, {
        properties: {
            src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        },

        listeners: {
            load: [
                [console.log, {once: true}],
            ],
        },
    });
}

{
    // Create an element in a namespace
    const svgNs = "http://www.w3.org/2000/svg";
    const svg = createElement("svg", {
        namespace: svgNs,
        parent: document.body,

        attributes: [
            ["width", "150"],
            ["height", "150"],
        ],

        children: [
            createElement("rect", {
                namespace: svgNs,

                attributes: [
                    ["width", "150"],
                    ["height", "150"],
                    ["fill", "#aad"],
                ],
            }),

            createElement("circle", {
                namespace: svgNs,

                attributes: [
                    ["cx", "75"],
                    ["cy", "75"],
                    ["r", "30"],
                    ["fill", "#fffa"],
                ],
            }),
        ],
    });
}

```
