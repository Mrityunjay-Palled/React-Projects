import { Error, Loader, Searchbar, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useDispatch,useSelector } from "react-redux";
import { useGetSongsByGenreQuery} from "../redux/services/shazamCore";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useState } from "react";

const Discover = () => {
  const dispatch=useDispatch();
  const [genreId,setgenreId]=useState("POP")
  const {activeSong,isPlaying,genereListId}=useSelector((state)=>state.player);
  const {data,isFetching,error}=useGetSongsByGenreQuery(genreId || 'POP')
  if(isFetching) return <Loader title="Loading songs...."/>
  if(error) return <Error/>
  console.log(data)
  const genereTitle = genres.find(({value})=>value===genreId)?.title
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genereTitle}
        </h2>
        <select
          onChange={(e) =>{
            dispatch(selectGenreListId(e.target.value))
            setgenreId(e.target.value)
          }}
          value={genreId|| 'POP'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre)=><option key={genre.value} value={genre.value}>{genre.title}</option>)}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song,i)=>(
            <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
            />
        ))}
      </div>
    </div>
  );
};

export default Discover;
