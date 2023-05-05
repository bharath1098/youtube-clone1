 const apikey1="AIzaSyBZHPtGorhQ7WY43bVIxblMHa8kEo6t-i0";
// c_ID=42
let shorts_video_array=[];
async function shorts_video_loading(searchString=""){
    const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${searchString}&type=video&videoCategoryId=${42}&key=${apikey1}`;
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


