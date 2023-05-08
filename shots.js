
const apikey="AIzaSyA1jgpDqn2xUAP8aF6hV59n7R_2OBZKa7o";
const shots_btn=document.getElementById("shots");
let shorts_video_array=[];



const searchInput=document.getElementById("search");


    async function loadData(searchString){
      const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&channelType=any&type=video&q=${searchString}&key=${apikey}`;
      const response=await fetch(url);
      const data=await response.json();
      shorts_video_array=data.items;
    } 


     searchInput.addEventListener("change",(e)=>{
      const searchString=e.target.value;
      loadData(searchString); });



// c_ID=42

async function shorts_video_loading(e,searchString=""){
    //  e.preventDefault();
    const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${searchString}&type=video&videoCategoryId=${42}&key=${apikey}`;
    const response=await fetch(url);
    const data=await response.json();
    shorts_video_array=data.items;
}


  shorts_video_loading();


    let currentIndex = 0;

    // Function to update the current item on the page
    function updateCurrentItem() {
      document.getElementById('iframe').src = "https://www.youtube.com/embed/"+shorts_video_array[currentIndex].id.videoId+"?autoplay=1&mute=1";
    }

    // Event listener for the "Next" button
    document.getElementById('next').addEventListener('click', function() {
      currentIndex++;
      if (currentIndex >= shorts_video_array.length) {
        currentIndex = 0;
      }
      updateCurrentItem();
    });

    // Event listener for the "Previous" button
    document.getElementById('prev').addEventListener('click', function() {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = shorts_video_array.length - 1;
      }
      updateCurrentItem();
    });

