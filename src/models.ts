export interface Profile {
  displayName: string;
  photoURL: string;
  uid: string;
  email: string;
  institute: string;
  about: string;
}
export interface Signature {
  displayName: string | null;
  uid: string;
  photoURL: string | null;
}
export interface Article {
  id?: string;
  title: string;
  body: string;
  cover: string;
  category: string;
  tags: string[];
  preview: string;
  views: string[];
  shares: string[];
  keywords: string[];
  comments?: Comment[];
  active?: boolean;
  created?: firebase.firestore.Timestamp | Date;
  updated?: firebase.firestore.Timestamp | Date;
  user?: Signature;
}
export interface Comment {
  user: Signature;
  text: string;
  time: firebase.firestore.Timestamp | Date | firebase.firestore.FieldValue;
}
