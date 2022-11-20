import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
// const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'e4f67d9070msh64f001b190bb5ddp10e0e5jsn7780e49f2841',
//       'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
//     }
//   };
  
//   fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

export const shazamCoreApi= createApi({
    reducerPath:'shazamCoreApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders:(headers)=>{
            headers.set('X-RapidAPI-Key','e4f67d9070msh64f001b190bb5ddp10e0e5jsn7780e49f2841')
            return headers
        }
    }),
    endpoints:(builder)=>({
        getSongsByGenre:builder.query({query:(genre)=>`/charts/genre-world?genre_code=${genre}`}),
        getTopCharts:builder.query({query:()=>'/charts/world'}),
        getSongDetails:builder.query({query:({songid})=>`/tracks/details?track_id=${songid}`}),
        getSongRelated:builder.query({query:({songid})=>`/tracks/related?track_id=${songid}`}),
        getArtistDetails:builder.query({query:(artistId)=>`/artists/details?artist_id=${artistId}`}),
        getSongsByCountry:builder.query({query:(countryCode)=>`/charts/country?country_code=${countryCode}`}),
        getSongsBySearch:builder.query({query:(searchTerm)=>`/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`})
    }) 
})

export const {useGetTopChartsQuery,useGetSongDetailsQuery,useGetSongRelatedQuery,useGetArtistDetailsQuery,useGetSongsByCountryQuery,useGetSongsByGenreQuery,useGetSongsBySearchQuery}=shazamCoreApi