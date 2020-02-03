import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

interface IVideoCDNParams {
  IMDBid?: string;
  title?: string;
}

interface IVideoCDNResponse {
  IMDBid: string;
  iframeURL: string;
}

interface IOMDBResponse {
  engTitle?: string;
  releaseDate?: Date;
  runtime?: number;
  IMDBRating?: number;
  production?: string;
}

export type IFilmDataResponse = IVideoCDNResponse & IOMDBResponse;

@Injectable()
export class APIService {
  private isNotNA = (item: string) => item !== 'N/A' && item;

  private readonly OMDBEndpoint = 'http://www.omdbapi.com';
  private readonly videoCDNEndpoint = 'https://videocdn.tv/api/short';

  private async videoCDNData({
    title,
    IMDBid
  }: IVideoCDNParams): Promise<IVideoCDNResponse | null> {
    if (!title && !IMDBid) return null;

    const videoCDNUrl = new URL(this.videoCDNEndpoint);

    videoCDNUrl.searchParams.append('api_token', process.env.VIDEO_CDN_API_KEY);

    if (title) {
      videoCDNUrl.searchParams.append('title', title);
    } else {
      videoCDNUrl.searchParams.append('imdb_id', IMDBid);
    }

    const videoCDNDataJSON = await fetch(videoCDNUrl);
    const videoCDNData = await videoCDNDataJSON.json();

    if (!videoCDNData || !Array.isArray(videoCDNData.data)) {
      return null;
    }

    const videoCDNFilmData = videoCDNData.data[0];

    if (!videoCDNFilmData) {
      return null;
    }

    return {
      IMDBid: videoCDNFilmData.imdb_id,
      iframeURL: videoCDNFilmData.iframe_src
    };
  }

  private async OMDBData(IMDBid: string): Promise<IOMDBResponse | null> {
    const response: IOMDBResponse = {};
    const OMDBUrl = new URL(this.OMDBEndpoint);

    OMDBUrl.searchParams.append('apikey', process.env.OMDB_API_KEY);
    OMDBUrl.searchParams.append('i', IMDBid);

    const OMDBDataJSON = await fetch(OMDBUrl);
    const OMDBData = await OMDBDataJSON.json();

    if (!OMDBData.Response) {
      return null;
    }

    if (this.isNotNA(OMDBData.Title)) {
      response.engTitle = OMDBData.Title;
    }

    if (this.isNotNA(OMDBData.Released)) {
      response.releaseDate = new Date(OMDBData.Released);
    }

    if (this.isNotNA(OMDBData.Runtime)) {
      response.runtime = parseInt(OMDBData.Runtime, 10);
    }

    if (this.isNotNA(OMDBData.imdbRating)) {
      response.IMDBRating = parseFloat(OMDBData.imdbRating);
    }

    if (this.isNotNA(OMDBData.Production)) {
      response.production = OMDBData.Production;
    }

    return response;
  }

  public async getFilmData(
    params: IVideoCDNParams
  ): Promise<IFilmDataResponse | null> {
    const videoCDNData = await this.videoCDNData(params);

    if (!videoCDNData) {
      return null;
    }

    const OMDBData = await this.OMDBData(videoCDNData.IMDBid);

    if (!OMDBData) {
      return null;
    }

    return Object.assign(videoCDNData, OMDBData);
  }
}
