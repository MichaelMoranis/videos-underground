import { useState } from "react";
import "./App.css";
import { FiSearch } from "react-icons/fi";

interface VideoSnippet {
  title: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
    };
  };
}

interface Video {
  id: {
    videoId: string;
  };
  snippet: VideoSnippet;
}

interface YTResponse {
  items: Video[];
}

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [query, setQuery] = useState<string>("");

  async function handleSeachYT() {
    const API_KEY = "AIzaSyCudhMF0RlcPeYHyuRyDqrBF3Ap6UY3458";
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${API_KEY}`,
    );
    const dataYT: YTResponse = await response.json();
    setVideos(dataYT.items);
    console.log(dataYT);
    setQuery("");
  }

  return (
    <div className="flex justify-center w-full mt-4 px-2">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Videos Underground</h3>
        <div className="flex items-center bg-gray-100 rounded-md px-2 w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Encontre sua banda"
            className="flex-grow bg-transparent outline-none px-4 text-gray-700 text-sm w-[90%] sm:text-base"
          />
          <FiSearch
            className="text-gray-500 ml-2 flex-shrink-0"
            onClick={handleSeachYT}
          />
        </div>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <h4>{video.snippet.title}</h4>
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
            />
            <p>{video.snippet.description}</p>
            {}
            <div></div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
