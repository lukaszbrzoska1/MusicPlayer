import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSong } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: { data: artistData } = {}, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails) return <Loader title="Loading Artist details" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col gap-6">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData}
      />

      <RelatedSong
        data={artistData[0]?.views['top-songs'].data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />

    </div>
  );
};

export default ArtistDetails;

