console.log("Let's write javascript");





let currentSong = new Audio();
let songs;

function formatTime(seconds) {
    if(isNaN(seconds)||seconds<0){
        return "Invalid input";
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    // Add leading zero if needed
    const formattedMins = mins < 10 ? "0" + mins : mins;
    const formattedSecs = secs < 10 ? "0" + secs : secs;

    return `${formattedMins}:${formattedSecs}`;
}

async function getSongs() {
    let a = await fetch("songs")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML=response;
    let as=div.getElementsByTagName("a")

    // Step 1: list all songs manually OR generate dynamically
    let songs = [
        "Apna Bana Le.mp3",
        "Gharaj Gharaj.mp3",
        "Nee Parichaya.mp3",
        "Ninnindale.mp3",
        "Sathiya.mp3",
        "Vacchindamma.mp3",
        "Vachinde.mp3",
        "Pillangoviya Cheluva.mp3",
        "Rangapura vihara.mp3",
        "Eno Eno Agide.mp3",
        "Kanna Nidurinchara.mp3",
        "He's So Sweet.mp3"
    ];
    for(let index=0;index<as.length;index++){
        const element =as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split[1])
        }
    }
    

    return songs
}

async function main(){
    let songs = await getSongs();
    console.log(songs);

    let audio = new Audio(songs[0]);
    audio.play();
}
const playMusic = (track, pause = false) => {
    //let audio=new Audio("/songs/"+track)
    currentSong.src = "/songs/" + track
    if (!pause) {
        currentSong.play()
        play.src = "pause.svg"
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}
async function displayAlbums(){
    let a = await fetch("songs")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML=response;
    let anchors=div.getElementsByTagName("a")
    Array.from(anchors).forEach(e=>{
        if(e.href.includes("songs")){
            console.log(e.href.split("/").slice(-2)[0])
        }
    })
}

async function main() {


    let songs = await getSongs();
    playMusic(songs[0], true)

    displayAlbums()

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song}</div>
                                <div>Mrudula</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>
                            
                        </li>`;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientReact().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100

    })
    document.querySelector(".hambuger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0"
    })

    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-120%"
    })
    previous.addEventListener("click",()=>{
        currentSong.pause()
        console.log("Previous clicked")
        let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if((index-1) >= 0){
            playMusic(songs[index-1])
        }
    })
    next.addEventListener("click",()=>{
        currentSong.pause()
        console.log("Next clicked")

        let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if((index+1) < songs.length-1){
            playMusic(songs[index+1])
        }
        
    })


    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        console.log("Setting volume to",e.target.value," 100")
        currentSong.volume=parseInt(e.target.value)/100
    })
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        console.log(e)
        e.addEventListener("click",async item=>{
            songs = await getSongs();
        })
    })
}
main()