// Get an HTML element by its identifier
function $id(elementId) {
    return document.getElementById(elementId);
}

// Create an HTML element by its tag name
function $el(tagName) {
    return document.createElement(tagName);
}

// Append a child HTML element to a parent HTML element
function $add(parentElement, childElement) {
    parentElement.appendChild(childElement);
}

// Set the text content of an HTML element
function $text(element, text) {
    element.textContent = text;
}

// Set the value of an HTML element's attribute
function $attr(element, attributeName, attributeValue) {
    element.setAttribute(attributeName, attributeValue)
}

// Create an HTML link element with text and URL
function $link(url, text) {
    const link = $el('a');
    $attr(link, 'href', url);
    $text(link, text);
    return link;
}

