using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace api.Wrapper
{
    public class Museek: IDisposable
    {
        private readonly string LASTFMAPIKEY = string.Empty;
        private string LASTFMAPI = "http://ws.audioscrobbler.com/2.0/?format=json&api_key=";
        private string COVERTARTAPI = "http://coverartarchive.org/";
        private string MUSICBRAINZAPI = "http://musicbrainz.org/ws/2/"; //https://musicbrainz.org/ws/2/artist/?
        private readonly HttpClient client;

        /// <summary>
        /// Initialize the Museek object.
        /// </summary>
        /// <param name="APIKey">LastFM API Key</param>
        public Museek(string APIKey)
        {
            if (!string.IsNullOrEmpty(APIKey))
            {
                LASTFMAPIKEY = APIKey;
                client = new HttpClient();
                client.DefaultRequestHeaders.Add("User-Agent", "Museek/1.0.0");
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            }
            else
            {
                throw new ArgumentNullException("APIKey cannot be null or empty.");
            }
        }
        
        public async Task<Object> GetArtist(string name)
        {
            HttpResponseMessage response = await client.GetAsync(LASTFMAPI + $"{LASTFMAPIKEY}&method=artist.getinfo&artist={name}").ConfigureAwait(false);
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

            var lastfm_artist = JsonConvert.DeserializeObject<LastFM>(resp);

            string artist_mbid = lastfm_artist.Artist.MBID;

            //response = await client.GetAsync(MUSICBRAINZAPI + $"artist/?query=arid:{artist_mbid}&fmt=json").ConfigureAwait(false);
            response = await client.GetAsync(MUSICBRAINZAPI + $"artist/{artist_mbid}?fmt=json&inc=ratings+genres").ConfigureAwait(false);
            response.EnsureSuccessStatusCode();
            resp = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            var mb_artist = JsonConvert.DeserializeObject<MusicBrainz>(resp);

            dynamic obj = new ExpandoObject();
            obj.name = lastfm_artist.Artist.Name;
            obj.alias = mb_artist.KnownAlias;
            obj.gender = mb_artist.Gender;
            obj.genres = mb_artist.Genres;
            obj.life = mb_artist.LifeSpan;
            obj.rating = mb_artist.Rating;
            obj.bio = lastfm_artist.Artist.Biography.Info;

            return obj;
        }

        private async Task<CoverArt> CoverArt(string id)
        {
            HttpResponseMessage response = await client.GetAsync(COVERTARTAPI + $"release/{ id}").ConfigureAwait(false);
            response.EnsureSuccessStatusCode();
            var resp = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            CoverArt coverart = JsonConvert.DeserializeObject<CoverArt>(resp);
            return coverart;
        }

        public void Dispose()
        {
            client.Dispose();
        }
    }
}
