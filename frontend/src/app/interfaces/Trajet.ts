import { Types } from 'mongoose';

export interface Trajet {
    id?: Types.ObjectId;
    villeDepart: string;
    villeArrive: string;
    date: string;
    email: string;
    nbPlaces: number;
    passagers: string[];
    prix: number;
    heureDepart: string;
    heureArrive: string;
  }