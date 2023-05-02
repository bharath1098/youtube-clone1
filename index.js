const apikey="AIzaSyBN-gkyIhhD0K89Jlw90WlKkDyaBpEpjQM";
const categories_container=document.getElementById("chips-container");
const video_container=document.getElementById("video-container");


const searchInput=document.getElementById("search");

    async function loadData(searchString){
      const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchString}&key=${apikey}
      `;
      const response=await fetch(url);
      const data=await response.json();
      loadVideoBasedOnVideosList(data);
    } 


     searchInput.addEventListener("change",(e)=>{
      const searchString=e.target.value;
      loadData(searchString); });


// //chips container and video container



    async function loadvideoCatogeries(){
      let str="10,17,20,15,1,18,19,2,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44";
      const url = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&key=${apikey}&id=${str}`;
      
      const response= await fetch(url);
      const data= await response.json();
       appendChips(data.items);
      loadVideoBasedOnCatogeriesId("23");
      }
       

     async function appendChips(chips){

      for(let i=0;i<chips.length;i++){
            const  id=chips[i].id;
            const title=chips[i].snippet.title;
            const chip=document.createElement("div");
            chip.setAttribute("id",id);
            chip.className="chips";
            chip.innerText=title;
            categories_container.appendChild(chip);
            // console.log(chip);
            chip.addEventListener("click",(e)=>{
                  const catogery_id=e.target.id;
                  loadVideoBasedOnCatogeriesId(catogery_id);
            });
      }
      }


     async function loadVideoBasedOnVideosList(data){
      //remove previous data 
      video_container.innerHTML="";
      for(let i=0;i<data.items.length;i++){
            //we are looking for single video item inside this loop
            const videoItem=data.items[i];
            const videoId=videoItem.id.videoId;
            const channelId=videoItem.snippet.channelId;
            const title=videoItem.snippet.title;
            // const description=videoItem.snippet.description;
            const thumbnail=videoItem.snippet.thumbnails.medium.url;
            const channelName=videoItem.snippet.channelTitle;
            const videoUploadedTime=videoItem.snippet.publishTime;
            const video_url = `https://www.youtube.com/embed/${videoId}?autoplay&enablejsapi=1&origin=${`https://www.google.com`}`;
            const channelLogo=await loadChannelLogo(channelId);
            const viewCount=await loadViewCount(videoId);
            
            

       //video card creating
       
      const videoCard=document.createElement("div");
      videoCard.className="video";

      // <video controls poster="tumbnile-url" src="video-url" type="video/mp4" class="tumbnile"></video>
      const thumbnailElement=document.createElement("iframe");
      thumbnailElement.className="tumbnile";
      thumbnailElement.setAttribute("id","clip");
      // thumbnailElement.poster=thumbnail;
      thumbnailElement.src=video_url;
      thumbnailElement.controls=true;
      thumbnailElement.allowFullscreen=true;
      videoCard.appendChild(thumbnailElement);
      

      const info_container=document.createElement("div");
           info_container.className="info-container";
       
      const logo_container=document.createElement("div"); 
            logo_container.className="logo-container";

      const logo=document.createElement("img");
            logo.className="logo";
            logo.src=channelLogo;
            logo_container.appendChild(logo);

            info_container.appendChild(logo_container);

        
      const detail_container=document.createElement("div");
            detail_container.className="detail-container";     
           
      const video_title=document.createElement("p");
            video_title.className="video-title";
            video_title.innerText=title;
            detail_container.appendChild(video_title);

       const channel_Name=document.createElement("p");
            channel_Name.className="channel-name";
            channel_Name.innerText=channelName;
            detail_container.appendChild(channel_Name);  

           
      const stats=document.createElement("div");
            stats.className="stats";

      const view_count=document.createElement("span");
            view_count.className="view-count";
            view_count.innerText=viewCountInStandardForm(viewCount);
            stats.appendChild(view_count);      
      
      const dot=document.createElement("div");
            dot.className="dot";
            stats.appendChild(dot);

      const time=document.createElement("div");
            time.className="time";
            time.innerText=videoUploadedTimeToCurrentTime(videoUploadedTime);
            stats.appendChild(time);

            detail_container.appendChild(stats);

            info_container.appendChild(detail_container);

            videoCard.appendChild(info_container);
            video_container.appendChild(videoCard);

      }
      }
 
      async function loadVideoBasedOnCatogeriesId(id,searchString=""){
      const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchString}&type=video&videoCategoryId=${id}&key=${apikey}`;

      const response=await fetch(url);
      const data=await response.json();
      loadVideoBasedOnVideosList(data);
      
      }

      function viewCountInStandardForm(viewCount){
            if(viewCount>1000000){
                  return Math.floor(viewCount/1000000)+"M views"
            }
            else if(viewCount>100000){
                  return Math.floor(viewCount/100000)+"L views"
            }
            else if(viewCount>1000){
                  return Math.floor(viewCount/1000)+"K views" 
            }
            else{
                  return viewCount+" views";
            }
      }

      function  videoUploadedTimeToCurrentTime(videoUploadedTime){
         var otherDate = new Date(videoUploadedTime);

            // Get the current date
         var currentDate = new Date();

         // Calculate the time difference in milliseconds
         var timeDiff = currentDate.getTime()-otherDate.getTime();
        // Calculate the day difference
         var daysDiff = Math.floor(timeDiff / (1000*60 * 60 * 24));

         if(daysDiff>365){
            return (Math.floor(daysDiff/365)+" years ago");
         }
         else if(daysDiff>30){
            return (Math.floor(daysDiff/30)+" months ago");
         }
         else{
            return (daysDiff+" days ago");
         }
      }

      async function loadChannelLogo(channelId){
      const url=`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apikey}`;

      const response=await fetch(url);
      const data=await response.json();
     
      return data.items[0].snippet.thumbnails.default.url;

      }

      async function loadViewCount(videoId){
      // const url=`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apikey}`;
      const url=`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apikey}
      `;
      const response=await fetch(url);
      const data=await response.json();
      // console.log(data);
      return data.items[0].statistics.viewCount;
      }


      // const clip=document.getElementById("clip");
      // clip.addEventListener("mouseover",()=>{clip.play();console.log("play");});
      // clip.addEventListener("mouseout",()=>{clip.pause();console.log("pause");});
      // clip.addEventListener("click",()=>{clip.requestFullscreen();console.log("fullscreen");});
      // clip.addEventListener("dblclick",()=>{clip.exitFullScreen();console.log("out");});

      
      // chip.addEventListener("click",()=>{loadVideoBasedOnCatogeriesId("chip_id");});

      loadvideoCatogeries();

      