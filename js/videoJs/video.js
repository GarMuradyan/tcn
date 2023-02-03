var videoDuration = null
var videoCurrentTime = null
var progresLIneWidth

function renderCategVideos(message,elem) {
    var videoSrc
    console.log(message);
    let categVideosBox = el('div','categ-videos-box')
    let categVideo = el('video','categ-video')
    let videoPlayerBox = el('div','video-player-box')

    categVideo.onplaying = ()=> {
        videoOnPlaying()
    }

    if (elem.classList.contains('continue-card')) {
        if (message.videoCurrentTimeSecond) {
            categVideo.currentTime = message.videoCurrentTimeSecond
        }
    }

    if (controls.privius !== controls.homeVideo) {
        if (!elem.classList.contains('continue-card')) {
            for (let i = 0; i < continueVideoData.data.playlist.length; i++) {
                if (continueVideoData.data.playlist[i].title === message.title) {
                    continueVideoData.data.playlist.splice(i,1)
                }
            }
            continueVideoData.data.playlist.push(message)
        }
    }

    if (controls.privius === controls.homeVideo) {
        videoSrc = message.playlist[0].sources[0].file
    }else {
        videoSrc = message.sources[0].file
        videoPlayerBox.insertBefore(renderFavoriteBox(message),videoPlayerBox.children[1])
    }

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(categVideo);
    } else if (categVideo.canPlayType('application/vnd.apple.mpegurl')) {
        categVideo.src = videoSrc;
    }

    categVideo.onclick = categVideoClick

    categVideo.ontimeupdate = ()=> {
        videoTimeUpdate(categVideo,message)
    }

    categVideo.onloadeddata = () => {
        videoLoadedData(categVideo,message)
    } 
    categVideo.setAttribute('autoplay',true)

    videoPlayerBox.prepend(renderVideoPlayPauseAndDurationButtons())
    videoPlayerBox.append(renderVideoProgres())

    categVideosBox.append(categVideo)
    categVideosBox.append(videoPlayerBox)

    return categVideosBox
    
}

function videoOnPlaying() {
    console.log('play');
    if (document.querySelector('.video-load-box')) {
        document.querySelector('.video-load-box').remove()
        controls.select = controls.videoPlayer
        document.querySelector('.categ-video').style.display = 'block'
    }
}

function renderSimilarChanselss(data,mainBottomListsRowsCardBox) {
    let similiarChannelsParentBox = el('div','similiar-channels-parent-box')
    let similiarChannelsBox = el('div','similiar-channels-box')
    if (mainBottomListsRowsCardBox.classList.contains('home-card')) {
        cardClassHome(data,similiarChannelsParentBox,similiarChannelsBox)
    }else if (mainBottomListsRowsCardBox.classList.contains('similar-card')) {
        cardClassSimiliar(data,similiarChannelsParentBox,similiarChannelsBox)
    }else if (mainBottomListsRowsCardBox.classList.contains('categories-card')) {
        cardClassCategories(data,similiarChannelsParentBox,similiarChannelsBox)
    }else if (mainBottomListsRowsCardBox.classList.contains('search-card')) {
        cardClassSearch(data,similiarChannelsParentBox,similiarChannelsBox)
    }else if (mainBottomListsRowsCardBox.classList.contains('home-slider')) {
        cardClassSlider(similiarChannelsParentBox,similiarChannelsBox)
    }
}

function cardClassSlider(similiarChannelsParentBox,similiarChannelsBox) {

    similiarChannelsParentBox.append(similiarChannelsBox)

    document.querySelector('.video-player-box').append(similiarChannelsParentBox)
    
}

function cardClassSearch(data,similiarChannelsParentBox,similiarChannelsBox) {
    for (let i = 0; i < data[0].data.playlist.length; i++) {
        if (i === controls.select.index + 1) {
            false
        }else {
            similiarChannelsBox.append(renderBottomListsCard(data[0].data.playlist[i],'similar-card',data[0].data))
        }
    }
        
    similiarChannelsParentBox.append(similiarChannelsBox)

    document.querySelector('.video-player-box').append(similiarChannelsParentBox)
    
}

function cardClassHome(data,similiarChannelsParentBox,similiarChannelsBox) {
    let similiarChannels = data.filter((val,i)=> {
        if (i === controls.select.rowsIndex) {
            return val.data
        }
    }).map((val)=> {
        return val.data
    })
    for (let i = 0; i < similiarChannels[0].playlist.length; i++) {
        if (i === controls.select.index) {
            false
        }else {
            similiarChannelsBox.append(renderBottomListsCard(similiarChannels[0].playlist[i],'similar-card',similiarChannels[0]))
        }
    }

    similiarChannelsParentBox.append(similiarChannelsBox)

    document.querySelector('.video-player-box').append(similiarChannelsParentBox)
}

function cardClassSimiliar(data,similiarChannelsParentBox,similiarChannelsBox) {
    for (let i = 0; i < data.playlist.length; i++) {
        if (i === controls.select.index + 1) {
            false
        }else {
            similiarChannelsBox.append(renderBottomListsCard(data.playlist[i],'similar-card',data))
        }
    }
        
    similiarChannelsParentBox.append(similiarChannelsBox)

    document.querySelector('.video-player-box').append(similiarChannelsParentBox)
}

function cardClassCategories(data,similiarChannelsParentBox,similiarChannelsBox) {
    for (let i = 0; i < data.playlist.length; i++) {
        if (i === controls.select.index + 1) {
            false
        }else {
            similiarChannelsBox.append(renderBottomListsCard(data.playlist[i],'similar-card',data))
        }
    }
        
    similiarChannelsParentBox.append(similiarChannelsBox)

    document.querySelector('.video-player-box').append(similiarChannelsParentBox)
}

function categVideoClick() {
    let videoPlayerBox = document.querySelector('.video-player-box')
    if (videoPlayerBox.classList.contains('transformY')) {
        videoPlayerBox.classList.remove('transformY')
        controls.select = controls.videoPlayer
    }else {
        videoPlayerBox.classList.add('transformY')
        controls.select = controls.video
        controls.select.addActive()
    }
}

function videoTimeUpdate(categVideo,message) {
    if (document.querySelector('.progres-line-box')) {
        message.videoCurrentTimeSecond = categVideo.currentTime
        message.progresDuration = (message.videoCurrentTimeSecond / categVideo.duration) * 100 + '%'
        document.querySelector('.progres-line-box').style.width = (categVideo.currentTime / categVideo.duration) * 100 + '%'
        videoCurrentTime = new Date(categVideo.currentTime * 1000).toISOString().slice(14, 19)
        document.querySelector('.video-current-time').textContent = videoCurrentTime
        if (videoCurrentTime === videoDuration) {
            let pause = document.querySelector('.pause')
            pause.textContent = 'play_arrow'
        }
    }
}

function videoLoadedData(categVideo,message) {
    if (document.querySelector('.progres-line-box')) {
        videoDuration = new Date(categVideo.duration * 1000).toISOString().slice(14, 19)
        console.log(videoDuration);
        document.querySelector('.video-duration-time').textContent = '/'+videoDuration
    }
}

function renderVideoPlayPauseAndDurationButtons() {
    const PLAYPAUSEDURATIONCLASSES = ['replay_10','pause','forward_10']

    let videoPlayPauseAndDurationBox = el('div','video-play-pause-and-duration-box')

    PLAYPAUSEDURATIONCLASSES.forEach(val => {
        let playPauseDurationButtons = el('button','play-pause-duration-buttons')
        let playPauseDurationIcons = el('span','material-symbols-outlined')
        playPauseDurationIcons.textContent = val
        playPauseDurationButtons.setAttribute('type',val)
        playPauseDurationIcons.classList.add(val)

        playPauseDurationButtons.onclick = function () {
            playPauseDurationClicks(this.getAttribute('type'))
        }

        playPauseDurationButtons.append(playPauseDurationIcons)

        videoPlayPauseAndDurationBox.append(playPauseDurationButtons)

    });

    return videoPlayPauseAndDurationBox

}

function playPauseDurationClicks(type) {
    switch (type) {
        case 'replay_10':
            replay()
            break;
        case 'pause':
            playPause()
            break;
        case 'forward_10':
            forward()
            break;
        default:
            break;
    }
}

function forward() {
    categVideo = document.querySelector('.categ-video')
    let pause = document.querySelector('.pause')
    categVideo.currentTime+=10
    document.querySelector('.progres-line-box').style.width = (categVideo.currentTime / categVideo.duration) * 100 + '%'
    categVideo.pause()
    pause.textContent = 'play_arrow'
}

function replay() {
    categVideo = document.querySelector('.categ-video')
    let pause = document.querySelector('.pause')
    categVideo.currentTime-=10
    document.querySelector('.progres-line-box').style.width = (categVideo.currentTime / categVideo.duration) * 100 + '%'
    categVideo.pause()
    pause.textContent = 'play_arrow'
}

function playPause() {
    let video = document.querySelector('.categ-video')
    let pause = document.querySelector('.pause')

    if (video.paused) {
        video.play(); 
        pause.textContent = 'pause'
    }
    else {
        video.pause(); 
        pause.textContent = 'play_arrow'
    }
}

function renderVideoProgres() {
    let videoProgresBox = el('div','video-progres-box')

    videoProgresBox.append(renderVideoProgresLine())
    videoProgresBox.append(renderVideoProgresTime())

    return videoProgresBox
    
}

function renderVideoProgresTime() {
    let videoTimeBox = el('div','video-time-box')
    let videoCurrentTime = el('span','video-current-time')
    let videoDurationTime = el('span','video-duration-time')

    videoTimeBox.append(videoCurrentTime)
    videoTimeBox.append(videoDurationTime)

    return videoTimeBox
}

function renderVideoProgresLine() {
    let videoProgresLineBox = el('div','video-progres-line-box')
    let progresLineBox = el('div','progres-line-box')
    let progresLineButton = el('div','progres-line-button')

    videoProgresLineBox.append(progresLineBox)
    videoProgresLineBox.append(progresLineButton)

    return videoProgresLineBox
}

function renderFavoriteBox(message) {
    let favoriteBox = el('div','favorite-box')
    let favoriteButtonBox = el('button','favorite-button-box')
    let favoriteButtonIcon = el('span','material-symbols-outlined')

    favoriteButtonIcon.textContent = 'favorite'
    if (message.favorite) {
        favoriteButtonBox.style.color = 'red'
    }else {
        favoriteButtonBox.style.color = 'white'
    }

    favoriteButtonBox.onclick = ()=> {
        favoriteButtonClick(message,favoriteButtonBox)
    }

    favoriteButtonBox.append(favoriteButtonIcon)

    favoriteBox.append(favoriteButtonBox)

    return favoriteBox
}

function favoriteButtonClick(message,favoriteButtonBox) {
    if (message.favorite) {
        message.favorite = false
        let index
        for (let i = 0; i < favoritesData.data.playlist.length; i++) {
            if (favoritesData.data.playlist[i].title === message.title) {
                index = i
            }
        }
        favoritesData.data.playlist.splice(index,1)

        if (controls.privius === controls.homeVideo) {
            if (favoritesData.data.playlist.length) {
                if (controls.movieList.item[controls.movieList.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box').length-1 !== 0) {
                    controls.movieList.index -=1
                }
            }
        }
        if (controls.privius === controls.movieList) {
            if (favoritesData.data.playlist.length) {
                if (controls.privius.rowsIndex === 0 || controls.privius.rowsIndex === '0' || controls.privius.rowsIndex === 1 || controls.privius.rowsIndex === '1') {
                    if (controls.privius.index === controls.privius.item[controls.privius.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box').length-1 ) {
                        if (controls.privius.item[controls.privius.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box').length-1 !== 0) {
                            controls.privius.index-=1
                        }
                    }
                }
            }
        }

        favoriteButtonBox.style.color = 'white'
    }else {
        message.favorite = true 
        favoritesData.data.playlist.push(message)
        if (favoriteNUm) {
            for (let i = 0; i < mainBottomLIstsData.length; i++) {
                if (mainBottomLIstsData[i].data.class === "favorit-card") {
                    mainBottomLIstsData.splice(i,1)
                }

            }
            if (favoritesData.data.playlist.length) {
                mainBottomLIstsData.unshift(favoritesData)
                localStorage.setItem('favorite',JSON.stringify(favoritesData))
            }
        }
        favoriteButtonBox.style.color = 'red'
    }
}
