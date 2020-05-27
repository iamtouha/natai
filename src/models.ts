export interface Post {
  id?: string;
  title: string;
  preview: string;
  tags: string[];
  body: string;
  writer?: firebase.UserInfo;
  views?: number;
  shares?: number;
  comments?: Comment[];
  active?: boolean;
  created?: firebase.firestore.Timestamp | Date;
  updated?: firebase.firestore.Timestamp | Date;
}
export interface Comment {
  user: firebase.UserInfo;
  text: string;
  time?: firebase.firestore.Timestamp | Date;
}
