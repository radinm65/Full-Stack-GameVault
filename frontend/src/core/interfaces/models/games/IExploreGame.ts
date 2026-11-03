import type Genre from "./Genre";

interface IExploreGame {
  id: number;
  title: string;
  publisher: string;
  developer: string;
  year: number;
  genre: Genre;
  setting: string;
  platform: string;
  rating: number;
  hoursToBeat: number;
  achievements: number;
  cover: string;
  trending: boolean;
}

export default IExploreGame;
