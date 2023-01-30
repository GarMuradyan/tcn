var controls = {
    select:'',
    privius:'',
    loading:{
        left: function () {
        },
        right: function () {
        },
        up: function () {
        },
        down: function () {

        },
        ok:function () {
        },
        back: function () {
        },
    },
    homeVideo: {
        name:'home-video',
        index:0,
        item:document.getElementsByClassName('main_top_logo-box'),
        position:0,
        left: function () {
            this.removeClass()
            controls.privius = controls.select
            controls.select = controls.menuList
            controls.select.firstActive()
            menuOpend()
        },
        right: function () {

        },
        up: function () {

        },
        down: function () {
            this.removeClass()
            controls.select = controls.movieList
            if (!controls.select.item[controls.select.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box')[controls.select.index]) {
                controls.select.index = 0
            }
            controls.select.addActive()
            controls.select.listTrans()
        },
        ok:function () {
            this.item[0].click()
        },
        back: function () {
            
        },
        removeClass: function () {
            for (let i = 0; i < this.item.length; i++) {
                this.item[this.index].classList.remove('active')
            }
        },
        addActive: function () {
            this.item[this.index].classList.add('active')
        },
    },
    movieList: {
        name:'movie-list',
        index:0,
        rowsIndex:0,
        item:document.getElementsByClassName('main_bottom_lists_rows-box'),
        position:0,
        ind:0,
        left: function () {
            if (this.index === 0 || this.index === '0') {
                controls.privius = controls.select
                this.removeClass()
                controls.select = controls.menuList
                controls.select.firstActive()
                menuOpend()
            }
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
                this.listTrans()
            }
        },
        right: function () {
            if (this.index === this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box').length-1 || this.index === this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box').length-1 +'') {
                this.index = -1
                this.listTrans()
            }
            if (this.index < this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box').length-1) {
                this.removeClass()
                this.index++
                this.addActive()
                this.listTrans()
            }
        },
        up: function () {
            if (this.rowsIndex === 0) {
                this.removeClass()
                controls.select = controls.homeVideo
                controls.select.addActive()
            }
            if (this.rowsIndex > 0) {
                this.removeClass()
                this.item[this.rowsIndex].setAttribute('position',this.index)
                this.rowsIndex--
                this.index = this.item[this.rowsIndex].getAttribute('position')
                this.listTransY()
                this.addActive()
                this.listTrans()
            }
        },
        down: function () {
            if (this.rowsIndex < this.item.length-1) {
                this.removeClass()
                this.item[this.rowsIndex].setAttribute('position',this.index)
                this.rowsIndex++
                this.index = this.item[this.rowsIndex].getAttribute('position')
                this.listTransY()
                this.addActive()
                this.listTrans()
            }
        },
        ok:function () {
            this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box')[this.index].click()
        },
        back: function () {
            
        },
        listTransY:function () {
            document.getElementsByClassName('main_bottom_lists_content-box')[0].style.transform = 'translateY(' + (this.rowsIndex * -317) + 'px)'
        },
        listTrans: function () {
            this.item[this.rowsIndex].style.transform = 'translate(' + (this.index * -347) + 'px)'
        },
        firstActive: function () {  
            this.index = 0
            this.rowsIndex = 0
            this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box')[this.index].classList.add('active-scale')
        },
        removeClass: function () {
            for (let i = 0; i < this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box').length; i++) {
                this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box')[i].classList.remove('active-scale')
            }
        },
        addActive: function () {
            if (!this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box')[this.index]) {
                this.rowsIndex = 0
                this.index = 0
                this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box')[this.index].classList.add('active-scale')
            }else {
                this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box')[this.index].classList.add('active-scale')
            }
        },
    },
    videoPlayer: {
        name:'video-player',
        ind:1,
        index:1,
        items: document.getElementsByClassName('main_bottom_lists_rows-box'),
        itemsSec: document.getElementsByClassName('main_categ-movies_tcn_lists'),
        left: function () {
        },
        right: function () {
        },
        up: function () {

        },
        down: function () {

        },
        ok:function () {
            categVideoClick()
        },
        back: function () {
            controls.similarChannels.index = 0
            document.querySelector('.parent').style.display = 'block',document.querySelector('.categ-videos-box').remove()
            controls.select = controls.privius
            if (continueNum) {
                for (let i = 0; i < mainBottomLIstsData.length; i++) {
                    if (mainBottomLIstsData[i].data.class === "continue-card") {
                        console.log('splicee');
                        mainBottomLIstsData.splice(i,1)
                    }
                }
                mainBottomLIstsData.unshift(continueVideoData)
            }
            if (!favoritesData.data.playlist.length) {
                for (let i = 0; i < mainBottomLIstsData.length; i++) {
                    if (mainBottomLIstsData[i].data.class === "favorit-card") {
                        mainBottomLIstsData.splice(i,1)
                    }
                }
            }
            renderMainBottomLists(mainBottomLIstsData)
            console.log(mainBottomLIstsData);
            localStorage.setItem('favorite',JSON.stringify(favoritesData))
            localStorage.setItem('continue',JSON.stringify(continueVideoData))
            localStorage.setItem( 'data',JSON.stringify(mainBottomLIstsData))
            controls.movieList.listTrans()
            if (controls.select === controls.movieList) {
                console.log(controls.select.index);
                console.log(controls.select.rowsIndex);
                controls.select.addActive()
                controls.select.listTrans()
                controls.select.listTransY()
            }else if (controls.select === controls.tcnTop) {
                document.querySelector('.main_categ-movies-box').append(renderCategMoviesCategoriesBox(gridData))
                document.querySelector('.main_categ-movies-tcn-top').append(el('div','active-div'))
                controls.select.transX()
                controls.select.transY()
            }
        },
        addActive:function () {
            this.item[0].classList.add('active')
        }
    },
    settingsPLay: {
        index:0,
        item:document.getElementsByClassName('content-continue-watching-box'),
        rowsIndex:0,
        left: function () {
            this.removeClass()
            controls.privius = controls.select
            controls.select = controls.settingsButtons
            controls.select.addActive()
            
        },
        right: function () {

        },
        up: function () {
            if (this.rowsIndex > 0) {
                this.removeClass()
                this.rowsIndex--
                this.addActive()
            }
        },
        down: function () {
            if (this.rowsIndex < this.item.length-1) {
                this.removeClass()
                this.rowsIndex++
                this.addActive()
            }
        },
        ok:function () {
            this.item[this.rowsIndex].click()
        },
        back: function () {

        },
        firstActive: function () {  
        },
        removeClass: function () {
            for (let i = 0; i < this.item.length; i++) {
                this.item[i].classList.remove('back-liner')
            }

        },
        addActive: function () {
            this.item[this.rowsIndex].classList.add('back-liner')
        }
    },
    settingsExit: {
        index:1,
        item:document.getElementsByClassName('buttons-item-box'),
        left: function () {
            if (this.index === 0) {
                this.removeClass()
                controls.privius = controls.select
                controls.select = controls.settingsButtons
                controls.select.addActive()
            }
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
            }
        },
        right: function () {
            if (this.index < this.item.length-1) {
                this.removeClass()
                this.index++
                this.addActive()
            }
        },
        up: function () {
        },
        down: function () {
        },
        ok:function () {
            this.item[this.index].click()
        },
        back: function () {

        },
        firstActive: function () {  
        },
        removeClass: function () {
            for (let i = 0; i < this.item.length; i++) {
                this.item[this.index].classList.remove('back-liner')
            }
        },
        addActive: function () {
            this.item[this.index].classList.add('back-liner')
        }
    },
    settingsButtons: {
        index:0,
        item:document.getElementsByClassName('settings-buttons-item-box'),
        rowsIndex:0,
        left: function () {
            this.removeClass()
            controls.privius = controls.select
            controls.select = controls.menuList
            menuOpend()
            controls.select.addActive()
        },
        right: function () {
            this.removeClass()
            if (controls.privius === controls.settingsExit || controls.privius === controls.settingsPLay) {
                console.log(8);
                controls.select = controls.privius
                controls.select.addActive()
            }else{
                if (document.querySelector('.play-settings-content-box')) {
                    controls.select = controls.settingsPLay
                    controls.select.addActive()
                }
                if (document.querySelector('.exit-content-box')) {
                    controls.select = controls.settingsExit
                    controls.select.addActive()
                }
            }
        },
        up: function () {
            if (this.rowsIndex > 0) {
                this.removeClass()
                this.rowsIndex--
                this.addActive()
            }
        },
        down: function () {
            if (this.rowsIndex < this.item.length-1) {
                this.removeClass()
                this.rowsIndex++
                this.addActive()
            }
        },
        ok:function () {
            this.removeClass()
            this.item[this.rowsIndex].click()
        },
        back: function () {

        },
        firstActive: function () {  
            this.rowsIndex = 0
            this.addActive()
        },
        removeClass: function () {
            for (let i = 0; i < this.item.length; i++) {
                this.item[i].classList.remove('active-scale')
            }
        },
        addActive: function () {
            this.item[this.rowsIndex].classList.add('active-scale')
        }
    },
    video: {
        items:document.getElementsByClassName('play-pause-duration-buttons'),
        item:document.getElementsByClassName('progres-line-button'),
        left: function () {
            replay()
        },
        right: function () {
            forward()
        },
        up: function () {
            this.removeClass()
            controls.select = controls.favorite
            controls.select.addActive()
        },
        down: function () {
            if (document.querySelector('.similiar-channels-box').getElementsByClassName('main_bottom_lits_rows_card-box').length) {
                this.removeClass()
                controls.select = controls.similarChannels
                controls.select.addActive()
            }
        },
        ok:function () {
            playPause()
        },
        back: function () {
            categVideoClick()

        },
        addActive:function () {
            this.item[0].classList.add('active-color')
        },
        removeClass:function () {
            this.item[0].classList.remove('active-color')
        }
    },
    similarChannels:{
        item:document.getElementsByClassName('similiar-channels-box'),
        index:0,
        left: function () {
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
                this.listTrans()
            }
        },
        right: function () {
            if (this.index < this.item[0].getElementsByClassName('main_bottom_lits_rows_card-box').length-1) {
                this.removeClass()
                this.index++
                this.addActive()
                this.listTrans()
            }
        },
        up: function () {
            this.removeClass()
            controls.select = controls.video
            controls.select.addActive()
        },
        down: function () {
        },
        ok:function () {
            this.item[0].getElementsByClassName('main_bottom_lits_rows_card-box')[this.index].click()
        },
        back: function () {
        },
        addActive:function () {
            this.item[0].getElementsByClassName('main_bottom_lits_rows_card-box')[this.index].classList.add('active-scale')
        },
        removeClass: function () {
            for (let i = 0; i < this.item[0].getElementsByClassName('main_bottom_lits_rows_card-box').length; i++) {
                this.item[0].getElementsByClassName('main_bottom_lits_rows_card-box')[i].classList.remove('active-scale')
            }
        },
        listTrans: function () {
            this.item[0].style.transform = 'translate(' + (this.index * -345) + 'px)'
        },
    },
    menuList: {
        index:0,
        item:document.getElementsByClassName('aside-box_menu_item'),
        left: function () {
            
        },
        right: function () {
            if (document.querySelector('.main-box').style.display !== 'none') {
                this.removeClass()
                controls.select = controls.privius
                if (controls.select === controls.homeVideo) {
                    controls.select.addActive()
                }else if (controls.select === controls.movieList) {
                    controls.select.index = -1
                    controls.select.right()
                }else if (controls.select === controls.favoriteChannels) {
                    controls.select.index = -1
                    controls.select.right()
                }
                menuClosed()
            }
            if (document.querySelector('.main_categ-movies-box')&&document.querySelector('.main_categ-movies-box').style.display !== 'none'){
                this.removeClass()
                controls.select = controls.privius
                if (controls.select === controls.moviesTop) {
                    controls.select.firstActive()
                }else if (controls.select === controls.tcnTop) {
                    if (document.querySelector('.active-div')) {
                        document.querySelector('.active-div').remove()
                    }
                    document.querySelector('.main_categ-movies-tcn-top').append(el('div','active-div'))
                    controls.select.transX()
                }
                menuClosed()
            }    
            if (document.querySelector('.main-search-system-box')) {
                this.removeClass()
                controls.select = controls.privius
                if (controls.select === controls.search) {
                    controls.select.addActive()
                }else if (controls.select === controls.searchLists) {
                    controls.select.addActive()
                }
                menuClosed()
            }
            if (document.querySelector('.main-settings-page-box')) {
                this.removeClass()
                controls.select = controls.privius
                controls.select.addActive()
                menuClosed()
            }
        },
        up: function () {
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
            }
        },
        down: function () {
            if (this.index < this.item.length -1) {
                this.removeClass()
                this.index++
                this.addActive()
            }
        },
        ok:function () {
            this.item[this.index].click()
            this.removeClass()
            menuClosed()
        },
        back: function () {

        },
        firstActive: function () {  
           this.item[this.index].classList.add('active')
        },
        removeClass: function () {
            for (let i = 0; i < this.item.length; i++) {
                this.item[i].classList.remove('active')
            }
        },
        addActive: function () {
            this.item[this.index].classList.add('active')
        }
    },
    moviesTop: {
        index:0,
        rowsIndex:0,
        item:document.getElementsByClassName('main_categ-movies_top_categories-box'),
        left: function () {
            if (this.index === 0) {
                controls.privius = controls.select
                this.removeClass()
                controls.select = controls.menuList
                controls.select.addActive()
                menuOpend()
            }
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
            }
        },
        right: function () {
            if (this.index < this.item.length-1) {
                this.removeClass()
                this.index++
                this.addActive()
            }
        },
        up: function () {
        },
        down: function () {
            this.removeClass()
            controls.select = controls.tcnTop
            if (document.querySelector('.active-div')) {
                document.querySelector('.active-div').remove()
            }
            document.querySelector('.main_categ-movies-tcn-top').append(el('div','active-div'))
            controls.select.ind = 0
            controls.select.index = 1
            controls.select.transX()
        },
        ok:function () {
            this.item[this.index].click()
        },
        back: function () {
            
        },
        removeClass: function () {
            for (let i = 0; i < this.item.length; i++) {
                this.item[i].classList.remove('active')                
            }
        },
        addActive: function () {
            this.item[this.index].classList.add('active')
        },
        firstActive: function () {
            this.index = 0
            this.item[this.index].classList.add('active')
        }
    },
    tcnTop: {
        index:1,
        ind:0,
        rowsIndex:1,
        item:document.getElementsByClassName('main_categ-movies_tcn_lists'),
        activeEl:document.getElementsByClassName('active-div'),
        items:document.getElementsByClassName('categories-card'),
        left: function () {
            if ((this.index-1) % 5 === 0) {
                controls.privius = controls.select
                this.activeEl[0].remove()
                controls.select = controls.menuList
                controls.select.addActive()
                menuOpend()
            }
            if (this.rowsIndex * 5 - 4 < this.index) {
                this.index--
                this.ind--
                this.transX()
            }
        },
        right: function () {
            if (this.rowsIndex * 5 > this.index) {
                if (!this.items[this.index]) {
                    return
                }
                this.index++
                this.ind++
                this.transX()
            }
        },
        up: function () {
            if (this.index < 6) {
                this.activeEl[0].remove()
                controls.select = controls.moviesTop
                controls.select.addActive()
            }
            else if (this.rowsIndex > 1) {
                this.index-=5
                this.rowsIndex--
                this.transY()
            }
        },
        down: function () {
            if (this.rowsIndex < Math.ceil(this.items.length / 5)) {
                this.index+=5
                this.rowsIndex++
                this.transY()

                if (!this.items[this.index-1]) {
                    this.index = this.items.length
                    this.ind = this.items.length % 5-1
                    this.transX()
                }
            }
        },
        ok:function () {
            this.items[this.index-1].click()
        },
        back: function () {
            
        },
        transX:function () {
            this.activeEl[0].style.transform = 'translateX(' + this.ind * 347 + 'px)'
        },
        transY:function () {
            this.item[0].style.transform = 'translateY(-' +( this.rowsIndex-1)* 245 + 'px)'
        },
        removeClass: function () {

        },
    },
    favorite: {
        index:1,
        item:document.getElementsByClassName('favorite-button-box'),
        left: function () {
        },
        right: function () {
        },
        up: function () {
        },
        down: function () {
            this.removeClass()
            controls.select = controls.video
            controls.select.addActive()

        },
        ok:function () {
            this.item[0].click()
        },
        back: function () {
        },
        addActive:function () {
            this.item[0].style.backgroundColor = 'rgb(36 45 179)'
            this.item[0].classList.add('active-border')
        },
        removeClass:function () {
            this.item[0].style.backgroundColor = '#242868c7'
            this.item[0].classList.remove('active-border')
        }
    },
    search: {
        item:document.getElementsByClassName('main-search-input-box'),
        left: function () {
            controls.privius = controls.select
            this.removeClass()
            this.item[0].blur()
            this.item[0].style.border = '0'
            controls.select = controls.menuList
            controls.select.addActive()
            menuOpend()
        },
        right: function () {
        },
        up: function () {
        },
        down: function () {
            if (document.getElementsByClassName('search-lists-box')[0] && document.getElementsByClassName('search-lists-box')[0].getElementsByClassName('main_bottom_lits_rows_card-box').length) {
                this.removeClass()
                controls.select = controls.searchLists
                controls.select.addActive()
                controls.select.listTrans()
            }
        },
        ok:function () {
            this.item[0].click()
        },
        back: function () {
        },
        addActive:function () {
            this.item[0].classList.add('active-inp')
        },
        removeClass:function () {
            this.item[0].classList.remove('active-inp')
        }
    },
    keyboard: {
        index:0,
        item:document.getElementsByClassName('keyboard-rows-box'),
        rowsIndex:0,

        left:function () {
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
            }
        },
        ok:function () {
            this.item[this.rowsIndex].getElementsByClassName('kyeboard-rows-box-item')[this.index].click()
        },
        right:function () {
            if (this.index < this.item[this.rowsIndex].getElementsByClassName('kyeboard-rows-box-item').length-1) {
                this.removeClass()
                this.index++
                this.addActive()
            } 
        },
        up:function () {
            if (this.rowsIndex === 0) {
                keyboardEnterClick()
            }
            if (this.rowsIndex === 3 && this.index > 0) {
                this.index++
            }
            if (this.rowsIndex === 3 && this.index === 10) {
                this.index++
            }
            if (this.rowsIndex === 1 && this.index === 12) {
                this.index--
            }
            if (this.rowsIndex > 0) {
                this.removeClass()
                this.rowsIndex--
                this.addActive()
            }
        },
        down:function () {
            if (this.rowsIndex === 2 && this.index > 0) {
                this.index--
            }
            if (this.rowsIndex === 1 && this.index === 12) {
                this.index--
            }
            if (this.rowsIndex === 2 && this.index === 11) {
                this.index--
            }
            if (this.rowsIndex < this.item.length-1) {
                this.removeClass()
                this.rowsIndex++
                this.addActive()
            } 
        },
        removeClass:function () {
            for (let i = 0; i < this.item[this.rowsIndex].getElementsByClassName('kyeboard-rows-box-item').length; i++) {
                this.item[this.rowsIndex].getElementsByClassName('kyeboard-rows-box-item')[i].classList.remove('active-inp')
            }
        },
        addActive:function () {
            this.item[this.rowsIndex].getElementsByClassName('kyeboard-rows-box-item')[this.index].classList.add('active-inp')
        },
        firstActive: function () {
            this.addActive()
        },
        back: function () {
            
        }
    },
    searchLists: {
        index:0,
        item:document.getElementsByClassName('search-lists-box'),
        rowsIndex:0,

        left:function () {
            if (this.index === 0) {
                this.removeClass()
                controls.privius = controls.select
                controls.select = controls.menuList
                controls.select.addActive()
                menuOpend()
            }
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
                this.listTrans()
            }
        },
        ok:function () {
            this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box')[this.index].click()
        },
        right:function () {
            if (this.index < this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box').length-1) {
                this.removeClass()
                this.index++
                this.addActive()
                this.listTrans()
            } 
        },
        up:function () {
            if (this.rowsIndex === 0) {
                this.removeClass()
                controls.select = controls.search
                controls.select.addActive()
            }
            if (this.rowsIndex > 0) {
                this.removeClass()
                this.rowsIndex--
                this.addActive()
            }
        },
        down:function () {
            if (this.rowsIndex < this.item.length-1) {
                this.removeClass()
                this.rowsIndex++
                this.addActive()
            } 
        },
        removeClass:function () {
            for (let i = 0; i < this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box').length; i++) {
                this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box')[i].classList.remove('active-scale')
            }
        },
        addActive:function () {
            this.item[this.rowsIndex].getElementsByClassName('main_bottom_lits_rows_card-box')[this.index].classList.add('active-scale')
        },
        listTrans: function () {
            this.item[this.rowsIndex].style.transform = 'translateX(' + (this.index * -347) + 'px)'
        },
        firstActive: function () {
            this.addActive()
        },
        back: function () {
            
        }
    }

}