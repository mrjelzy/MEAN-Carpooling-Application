import { Types } from 'mongoose';

export interface Utilisateur {
    id?: Types.ObjectId;
    email: string;
    motDePasse: string;
    nom: string;
    prenom: string;
    telephone: string;
    numPermis: string;
    numImmatriculation: string;
    vitMoyenne: number;
  }
