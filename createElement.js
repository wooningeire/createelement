/**
 * Creates an element and specifies various properties regarding it in a single function call.
 * @param {string|function|Element} [elementSource="div"] If `string`, the tag name of the new element. If `function`, the constructor that creates it. If `Element`, the element to add properties to.
 * @param {object} [options={}] Properties pertaining to the object.
 * @param {Document} [options.context=document] The document within which to create the element.
 * @param {string} [options.namespace=""] The namespace within which to create the element.
 * @param {string} [options.textContent=""] The text to append to the element.
 * @param {Iterable<string>} [options.classes=[]] The classes in the element's class list.
 * @param {object} [options.properties={}] Additional properties that will be set on the element.
 * @param {Iterable<string[]>} [options.attributes] A collection of argument lists to be passed to `setAttribute` (or `setAttributeNS` if a namespace is present).
 * @param {Iterable<Node>} [options.children] The child nodes to be appeneded immediately to the element.
 * @param {Node} [options.parent=null] The node to which the element should be appended immediately. Leave nullish if no parent.
 * @param {object} [options.listeners={}] Key-value pairs that map an event type to a collection of argument lists that will be passed to `addEventListener`.
 * @param {function} [options.callback=null] A function to which the element will be passed, following the element's creation. Leave nullish if no callback.
 * @returns {Element} The new element.
 */
export function createElement(elementSource="div", {
	context=document,
	namespace="",
	textContent="",
	classes=[],
	properties={},
	attributes=[],
	children=[],
	parent=null,
	listeners={},
	callback=null,
}={}) {
	let element;

	if (typeof elementSource === "string") { // tag name
		const tagName = elementSource;
		element = !namespace ? context.createElement(tagName) : context.createElementNS(namespace, tagName);

	} else if (typeof elementSource === "function") { // constructor
		element = new elementSource();
	
	} else if (elementSource instanceof HTMLElement) {
		element = elementSource;

	} else {
		throw new TypeError("Unsupported type");
	}

	if (textContent) {
		element.textContent = textContent;
	}

	for (const className of classes) {
		element.classList.add(className);
	}

	Object.assign(element, properties);

	for (const [key, value, namespace] of attributes) {
		if (!namespace) {
			element.setAttribute(key, value);
		} else {
			element.setAttributeNS(namespace, key, value);
		}
	}

	for (const child of children) {
		element.append(child);
	}

	parent?.append(element);

	for (const [eventType, handlers] of Object.entries(listeners)) {
		for (const [handler, options] of handlers) {
			element.addEventListener(eventType, handler, options);
		}
	}

	callback?.call(element);

	return element;
}
