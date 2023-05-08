const apikey="AIzaSyA1jgpDqn2xUAP8aF6hV59n7R_2OBZKa7o";
const liked_video_container=document.getElementById("right-liked-video-container");
 const left_liked_image_video=document.getElementById("l_liked_image-video");
 const liked_video_btn=document.getElementById("liked-videos");


const searchInput=document.getElementById("search");


    async function loadData(searchString){
      const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&channelType=any&type=video&q=${searchString}&key=${apikey}`;
      const response=await fetch(url);
      const data=await response.json();
      loadLikedVideoBasedOnVideosList(data);
    } 


     searchInput.addEventListener("change",(e)=>{
      const searchString=e.target.value;
      loadData(searchString); });


 async function loadLikedVideoData(e){
      
  const searchString="kannada new released songs and triller videos";
  const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&channelType=any&type=video&q=${searchString}&key=${apikey}
  `;
  const response=await fetch(url);
  const data=await response.json();
  loadLikedVideoBasedOnVideosList(data);
 }
 

 async function loadLikedVideoBasedOnVideosList(data){
        //remove previous data
       
        liked_video_container.innerHTML="";

        for(let i=0;i<data.items.length;i++){
              //we are looking for single video item inside this loop
              const videoItem=data.items[i];
              const videoId=videoItem.id.videoId;
              const channelId=videoItem.snippet.channelId;
              const title=videoItem.snippet.title;
               const description=videoItem.snippet.description;
              const thumbnail=videoItem.snippet.thumbnails.medium.url; 
              const channelName=videoItem.snippet.channelTitle;
              const videoUploadedTime=videoItem.snippet.publishTime;
              const video_url = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&origin=${`https://www.google.com`}`;
              const channelLogo=await loadChannelLogo(channelId);
              const viewCount=await loadViewCount(videoId);
              
              
  
         //video card creating
         
        const videoCard=document.createElement("div");
        videoCard.className="w-video";
           
          const video_img_container=document.createElement("div");
           video_img_container.className="w-video_image_container";
           const thumbnailElement=document.createElement("img");
           thumbnailElement.className="w-thumbnail";
           thumbnailElement.setAttribute("id","clip");
           thumbnailElement.src=thumbnail;
           video_img_container.appendChild(thumbnailElement);
  
           
        videoCard.appendChild(video_img_container);
  
       await videoCard.addEventListener("mouseenter",()=>{
            video_img_container.innerHTML="";
            const iframe=document.createElement("iframe");
            iframe.className="w-thumbnail";
            iframe.src=video_url;
            iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen=true;
            iframe.controls=true;
            video_img_container.appendChild(iframe);
            
         });
  
      await  videoCard.addEventListener("mouseleave",()=>{
             video_img_container.innerHTML="";
           const img=document.createElement("img");
             img.className="w-thumbnail";
             img.src=thumbnail;
             img.ariaPlaceholder="thumbnail";
             video_img_container.appendChild(img);
        });
  
  
        
  
        const info_container=document.createElement("div");
             info_container.className="hs-info-container";
               
        const video_title=document.createElement("p");
              video_title.className="video-title";
              video_title.innerText=title;
              info_container.appendChild(video_title);
   
        const stats=document.createElement("div");
              stats.className="channel-name-views";

       const channel_Name=document.createElement("span");
              channel_Name.className="l-channel-name";
              channel_Name.innerText=channelName;
              stats.appendChild(channel_Name);
              

        const view_count=document.createElement("span");
              view_count.className="view-count";
              view_count.innerText=viewCountInStandardForm(viewCount);
              stats.appendChild(view_count);      
        
        const dot=document.createElement("div");
              dot.className="sub-dot";
              stats.appendChild(dot);
  
        const time=document.createElement("div");
              time.className="sub-time";
              time.innerText=videoUploadedTimeToCurrentTime(videoUploadedTime);
              stats.appendChild(time);
  
              info_container.appendChild(stats);

        const video_description=document.createElement("p");
         video_description.className="hs-video-desc";
         video_description.innerText=description;
         info_container.appendChild(video_description);  
  
        videoCard.appendChild(info_container);
        liked_video_container.appendChild(videoCard);

        if(i==0){
            left_liked_image_video.innerHTML="";  

              const iframe=document.createElement("iframe");
              iframe.className="l-w-thumbnail";
              iframe.src=video_url;
              iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
              iframe.allowFullscreen=true;
              iframe.controls=true;
             left_liked_image_video.appendChild(iframe);
        }
  
        }
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

const url=`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apikey}
`;
const response=await fetch(url);
const data=await response.json();
// console.log(data);
return data.items[0].statistics.viewCount;
}



loadLikedVideoData();

