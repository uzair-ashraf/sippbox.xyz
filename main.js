const getSippyVideos = async () => {
  try {
    const youtubeURL = new URL("https://www.youtube.com/feeds/videos.xml");
    youtubeURL.searchParams.append("channel_id", "UCsQ86hFQ6wxX_CsWMp8DJVw");
    window.youtubeURL = youtubeURL;
    const requestURL = new URL("https://api.rss2json.com/v1/api.json");
    requestURL.searchParams.append("rss_url", youtubeURL.toString());
    const res = await fetch(requestURL.toString());
    if (!res.ok) throw new Error("Request failed");
    const { items } = await res.json();
    const iframes = items.map((video) => {
      const id = new URL(video.link).searchParams.get("v");
      const iframe = document.createElement("iframe");
      iframe.innerHTML =
        '<iframe width="600" height="340" frameborder="0" allowfullscreen></iframe>';
      iframe.src =
        "https://youtube.com/embed/" + id + "?controls=0&showinfo=0&rel=0";
        return iframe
    });
    return iframes
  } catch (_) {
    return [];
  }
};

const init = async () => {
    const iframes = await getSippyVideos()
    
}
getSippyVideos();
