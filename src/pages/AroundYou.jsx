import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const [country, setCountry] = useState('PL');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  const getCountry = () => {
    axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_sR8FsGJMe8CNQ3plX0OkkxyalMclH')
      .then((response) => {
        setCountry(response?.data?.location?.country);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getCountry();
    // at_sR8FsGJMe8CNQ3plX0OkkxyalMclH
  }, [country]);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;

  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around You <span>{country}</span></h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {
          data?.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              activeSong={activeSong}
              isPlaying={isPlaying}
              i={i}
              data={data}
            />
          ))
        }
      </div>
    </div>
  );
};

export default AroundYou;
