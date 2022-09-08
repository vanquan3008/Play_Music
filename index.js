const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER';

const MusicLists = $('.Music__lists');
const Progress = $('#progress');
const MusicList = $('.Music__list');
const MusicImg = $('.Music__header-img');
const PlayBtn = $('.Music__btn-play-pause');
const audio = $('#audio');
const iconMusicmain = $('.Music__header-list-icon');
const Btnclose = $('.btn-close');
const timecurrent = $('.Music__process-current-time');
const totaltime = $('.Music__process-total-time');
const volume = $('#Volume');
const volume_slider = $('.volume-slide');

const repeatbtn = $('.Music__btn-repeat');
const prevbtn  = $('.Music__btn-prev');
const nextbtn = $('.Music__btn-next');
const randombtn = $('.Music__btn-random');




const app = {
    _this:this,
    currentIndex :0 ,
    isRandom : false,
    isRepeat : false,
    isPlaying : false,
    randomlist : [],
    config : JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs:[
        {
            name : '- Mang Chủng -',
            singer : 'Âm Khuyết Thi Thính',
            path:'./assets/music/song0-1.mp3',
            image:'./assets/img/img-0-1.jpg'
        },
        {
            name : '- Tada Koe Hitotsu -',
            singer : 'Rokudenashi',
            path:'./assets/music/song0-2.mp3',
            image:'./assets/img/img-0-2.jpg'
        },
        {
            name : '- Zen Zen Zense -',
            singer : 'Your Name OST',
            path:'./assets/music/song0-3.mp3',
            image:'./assets/img/img-0-3.jpg'
        },
        {
            name : '- Nandemonaiya -',
            singer : ' Kamishiraishi Mone',
            path:'./assets/music/song0-4.mp3',
            image:'./assets/img/img-0-4.jpg'
        },
        {
            name : '- Don\'t You Now Me -',
            singer : 'Ofenbach',
            path:'./assets/music/song5.mp3',
            image:'./assets/img/img-5.jpg'
        },
        {
            name : '- Anh Đứng Từ Chiều - ',
            singer : 'Huy Vạc',
            path:'./assets/music/song6.mp3',
            image:'./assets/img/img-6.jpg'
        },
        {
            name : '- Haru Haru(Piano) -',
            singer : 'An Coong',
            path:'./assets/music/song7.mp3',
            image:'./assets/img/img-7.jpg'
        },
        {
            name : '- Bình Yên Từng Phút Giây -',
            singer : 'Sơn Tùng',
            path:'./assets/music/song8.mp3',
            image:'./assets/img/img-8.jpg'
        },
        {
            name : '- Cưới Thôi -',
            singer : 'Masew',
            path:'./assets/music/song9.mp3',
            image:'./assets/img/img-9.jpg'
        },
        {
            name : '- Mộng Tàn Hoa -',
            singer : 'Thiên Tú x Dino',
            path:'./assets/music/song10.mp3',
            image:'./assets/img/img-10.jpg'
        },
        {
            name : '- Rendezvous -',
            singer : 'Deamn',
            path:'./assets/music/song11.mp3',
            image:'./assets/img/img-11.jpg'
        },
        {
            name : '- Something Just Like This -',
            singer : 'The Chainsmokers & Coldplay',
            path:'./assets/music/song12.mp3',
            image:'./assets/img/img-12.jpg'
        },
        {
            name : '- Never Be Alone -',
            singer : 'TheFatRat',
            path:'./assets/music/song13.mp3',
            image:'./assets/img/img-13.jpg'
        },
        {
            name : '- Try -',
            singer : 'Pink',
            path:'./assets/music/song14.mp3',
            image:'./assets/img/img-14.jpg'
        },
        {
            name : '- The Night -',
            singer : 'Avicii',
            path:'./assets/music/song15.mp3',
            image:'./assets/img/img-15.jpg'
        },
        {
            name : '- All Falls Down -',
            singer : 'Alan Walker',
            path:'./assets/music/song16.mp3',
            image:'./assets/img/img-12.jpg'
        },
        
    ],
    setconfig:function(key,value){
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config));
    },

    render: function(){
        const html =this.songs.map((song,index) =>{
            return `
            <div class="Music__list-member" data-index = ${index}>
                    <div class="Music__list-member-wrap">
                        <div class="Music__list-member-img" style="background-image: url(${song.image})"></div>
                        <div class="Music__list-member-info">
                            <h3 class="Music__list-member-info-song">${song.name}</h3>
                            <h3 class="Music__list-member-info-name">${song.singer}</h3>
                        </div>
                    </div>
                    <div id="wave">
                       <div class="stroke"></div>
                       <div class="stroke"></div>
                       <div class="stroke"></div>
                       <div class="stroke"></div>
                       <div class="stroke"></div>
                   </div>
                    <div class="Music__list-option">
                         <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>`
        })
        MusicList.innerHTML =html.join('');
    },

    defineProperties: function(){
        Object.defineProperty(this,"currentSong",{
          get:function(){
            return this.songs[this.currentIndex];
          }
        })
    },

    handlEvent: function(){
        const _this = this;
        // Quay đĩa bài hát
        const MusicimgAnimation = MusicImg.animate([
        {
            transform: 'rotate(360deg)'
        }
        ],
        {
            duration : 10000,
            iterations : Infinity,
        })
        MusicimgAnimation.pause();        
        // Khi kick vào nút play
        PlayBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause();
            }
            else{
                audio.play();
            }
        }
        // Khi nhạc chạy
        audio.onplay = function(){
            _this.isPlaying = true;
            PlayBtn.classList.add('playing');
            MusicimgAnimation.play();
        }
        // Khi dừng nhạc
        audio.onpause = function(){
            _this.isPlaying = false;
            PlayBtn.classList.remove('playing');
            MusicimgAnimation.pause();
        }
        // Nhấn để hiện list danh sách
        iconMusicmain.onclick = function(){
            MusicLists.style.display =`block`;
        }
        // Tắt list danh sách
        Btnclose.onclick= function(){
            MusicLists.style.display=`none`;
        }
        // Chạy
        audio.ontimeupdate= function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime/audio.duration *  100);
                Progress.value = progressPercent;
                timecurrent.textContent = _this.timeFormatter(audio.currentTime);
            }
            if(audio.duration){
                 totaltime.textContent = _this.timeFormatter(audio.duration);
            }
        }
        // Xử lý khi tua 
        Progress.oninput = function(e){
            const seekTime = audio.duration*e.target.value/100;
            audio.currentTime = seekTime;
            timecurrent.textContent = _this.timeFormatter(seekTime);
        }   

        // Xử lý loa
        volume.oninput = function(e){
            audio.volume = e.target.value /100;
        }
        // Next song
        nextbtn.onclick = function(){
            if(_this.isRandom){
                _this.RandomSong();
            }
            else{
                  _this.nextSong();
            }
          
            audio.play();
            _this.HighlightSong();
        }
        // Prev song
        prevbtn.onclick = function(){
            if(_this.isRandom){
                _this.RandomSong();
            }
            else{
                _this.prevSong();
            }         
            audio.play();
            _this.HighlightSong();
        }
        // Random song
        randombtn.onclick = function(){
            _this.isRandom = !_this.isRandom;
            randombtn.classList.toggle('active',_this.isRandom);
            _this.setconfig('isRandom', _this.isRandom);
        }
        // Xử lý phát lại bài hát
        repeatbtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            repeatbtn.classList.toggle('active',_this.isRepeat);
            _this.setconfig('isRepeat',_this.isRepeat);
        }
        // Khi chuyển bài thì nhạc vẫn chạy
        audio.onended = function(){
            if(_this.isRepeat){
              audio.play();
            }
            else{
              nextbtn.click();
            }
          }
        //highline theo bài hát
       MusicList.onclick = function(e){
        const songNode = e.target.closest('.Music__list-member:not(.Music__list-member-play)')
        // Xử lý khi click vào bài đó
         if(e.target.closest('.Music__list-member:not(.Music__list-member-play)')|| e.target.closest('.Music__list-option')){
            // Khi click vào bài hát
             if(e.target.closest('.Music__list-member:not(.Music__list-member-play)')){
               _this.currentIndex =  Number(songNode.dataset.index);
               _this.loadcurrentSong();
               audio.play();
               _this.HighlightSong();
               Btnclose.click();
             }
            //  Khi click vào option
         }
       }

       
    }, 
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex>= this.songs.length){
            this.currentIndex =0;
        }
        this.loadcurrentSong();
    },
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex<0){
            this.currentIndex = this.songs.length -1;
        }
        this.loadcurrentSong();
    },
    // Kiểm tra random có bị trùng hay không
    RandomList : function(index){
        let count =0;
        for(let i= 0 ;i<this.randomlist.length;i++){
            if(this.randomlist[i]===index){
                return false;
            }
            count++;
        }
        if(count === this.randomlist.length){
            return true;
        }

    },
    RandomSong:function(){
        let newIndex;
        if(this.randomlist.length === this.songs.length){
            this.randomlist = [];
        }
        do{
            newIndex = Math.floor(Math.random()*this.songs.length);
        }while(this.RandomList(newIndex)===false);
        this.currentIndex = newIndex;
        this.randomlist.push(newIndex);
        this.loadcurrentSong();
        this.HighlightSong();
    },
    
    timeFormatter: function (timeElement) {
        const timeFloored = Math.floor(timeElement);
        const min = Math.floor(timeFloored / 60);
        const sec = timeFloored % 60;
        return `${min >= 10 ? min + "" : "0" + min}:${sec >= 10 ? sec + "" : "0" + sec} `;
    },
    loadcurrentSong: function(){
        const imgthumb = $('.Music__header-img');
        const audio =$('#audio');
        const NameSinger =$('.Music__info-nameSinger');
        const NameSong = $('.Music__info-nameSong');
        NameSinger.textContent = this.currentSong.singer;
        imgthumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        NameSong.textContent = this.currentSong.name;
        audio.src = this.currentSong.path;
    },
    // Load config
    loadConfig:function(){
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    // Add class cho song đang chạy
    HighlightSong: function(){
        const PlayListMusic = $$('.Music__list-member');
        const wave = $$('#wave');
        for(let i=0;i<PlayListMusic.length ; i++){
            PlayListMusic[i].classList.remove('Music__list-member-play');
            wave[i].classList.remove('loader');

        }
        PlayListMusic[this.currentIndex].classList.add('Music__list-member-play');
        wave[this.currentIndex].classList.add('loader');
        this.scrollToActiveSong();
    },
    scrollToActiveSong : function(){
        setTimeout(()=>{
          $('.Music__list-member-play').scrollIntoView({
            behavior: "smooth",
            block: "center", 
            inline: "nearest"
        });
        },500);
    },
    start: function(){
        // Load config
        this.loadConfig();
        // Render bài hát
        this.render();
        // Định nghĩa
        this.defineProperties();
        // Load bài hát
        this.loadcurrentSong();
        // Event 
        this.handlEvent(); 
        // Highline bài hát
        this.HighlightSong();
        this.scrollToActiveSong();
        
    },
   
    
}
app.start();
