function el(tagName,className,) {
    let tag = document.createElement(tagName)
    if (className) {
        tag.className = className
    }
    return tag
}