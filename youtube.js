//https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=kgf%202&key=[YOUR_API_KEY
//key = AIzaSyC5Eh5BvX-3G0DZCaUgoJ8rDTT3pq7TBjY
//https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=IN&key=[your key]

document.querySelector(".logo>img").addEventListener("click", () => {
  window.location.href = "index.html";
});

//for input field

let youtubefun = () => {
  const q = document.querySelector("#search").value;

  let query = { q };
  localStorage.setItem("inputValue", JSON.stringify(query));
  q.value = null;
  window.location.href = "video.html";
};

// =============================================================================

//for trending videos

//key = AIzaSyC5Eh5BvX-3G0DZCaUgoJ8rDTT3pq7TBjY
// by jsirohi chnnel
//key 2 = AIzaSyDRCDWxlJBQ6077to0K0nBTYLEoEJ4nSSI
//https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=IN&key=[your key]

let trending = async () => {
  try {
    const mykey = `AIzaSyDRCDWxlJBQ6077to0K0nBTYLEoEJ4nSSI`;
    const trending_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=28&regionCode=IN&key=${mykey}`;
    let res = await fetch(trending_url);
    let data = await res.json();
    // console.log(data);
    trendVideos(data.items);
  } catch (err) {
    console.log("err:", err);
  }
};

trending();

let box = document.querySelector(".videos");

let trendVideos = (data) => {
  box.innerHTML = null;

  data.map(
    ({
      id,
      snippet: { title },
      snippet: { channelTitle },
      statistics: { viewCount },
    }) => {
      let div = document.createElement("div");
      div.setAttribute("class", "videodiv");

      let frame = document.createElement("iframe");
      frame.src = `https://www.youtube.com/embed/${id}`;
      // frame.width = "300";
      frame.height = "170";
      frame.allow = "fullscreen";

      let name = document.createElement("h5");
      name.innerText = title;

      let channel = document.createElement("p");
      channel.innerText = channelTitle;

      let view = document.createElement("p");
      if (viewCount <= 999999) {
        let n = (viewCount / 1000).toFixed();
        view.innerText = `${n}K views`;
      } else if (viewCount <= 100000000) {
        let num = (viewCount / 1000000).toFixed(1);
        view.innerText = `${num}M views`;
      }

      div.append(frame, name, channel, view);
      box.append(div);
    }
  );
};
