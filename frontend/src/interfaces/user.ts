export interface User {
  _id?: string;

  email: string;
  nom?: string;
  prenom?: string;

  role?: 'admin' | 'local' | 'tourist' | 'partner';
  permissions?: string[];

  verifToken?: string;
  verifTokenExpires?: string; // ou Date si tu manipules des objets Date côté front
  accessToken?: string;
  isVerified?: boolean;

  dateNaissance?: Date; // ou Date
  localisation?: string;
  langue?: string,
  nationalite?: string;
  photoProfil?:  string;
  preferencesCulinaires?: string[];


  createdAt?: string; // ou Date
  lastLogin?: string; // ou Date
}
