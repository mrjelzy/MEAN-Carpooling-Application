import { Types } from 'mongoose';

export interface Search {
    villeDepart: string;
    villeArrive: string;
    date: string;
    nbPlaces: number;
    prix: number;
    heureDepart: string;
  }