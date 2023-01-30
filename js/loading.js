function renderLoading() {
    let loadingBox = el('div','loading-box')
    let loadingPoster = el('img','loading-poster')

    controls.select = controls.loading
    loadingPoster.src = 'logo 2.png'
    
    loadingBox.append(loadingPoster)

    return loadingBox
}

function videoLoading() {
    let videoLoadBox = el('div','video-load-box')
    let videoLoadIcon = el('div','video-load-icon')

    videoLoadBox.append(videoLoadIcon)

    return videoLoadBox
}