import type { IPicture } from 'music-metadata-browser';

export type TrackId = string;
export type ArtistId = string;
export type AlbumId = string;

export interface TrackModel {
  id: TrackId;
  name?: string;
  artist?: string; // artists를 합친 문자열
  artists?: ArtistModel[]; // 각 artist 정보
  album?: AlbumModel;
  source?: string;
}

export interface ArtistModel {
  id: ArtistId;
  name: string;
}

export interface AlbumModel {
  id: AlbumId;
  name: string;
  coverImgUrl?: string;
  coverImg?: IPicture;
}
