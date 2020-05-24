import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQBlUf5HM_CyhgqD9ClhR5guX8pLqwy8qmc1LcEwDP_gTWSBb6HM889gvrZ9HEfKFyQ6kDcTMo0qUlRI8DU',
    });
    return this.http.get(url, { headers });
  }
  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(
      map((data) => data['albums'].items)
    );
  }
  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data) => data['artists'].items)
    );
  }
  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    //.pipe(map((data) => data['artists'].items));
  }
  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=ES`).pipe(
      map((data) => data['tracks'])
    );
  }
}
