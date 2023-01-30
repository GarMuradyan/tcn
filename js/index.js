window.onload = ()=> {
    main()
}

function main() {
    let parentBox = el('div','parent-box')
    let parent = el('div','parent')
    parent.append(parentBox)
    document.body.append(renderLoading())
    document.body.append(parent)
    renderAside()
    renderMain()
    getMainTopBoxData()
    getMainBottomListsData()
}