export type Work = {
    id: string;
    title: string;
    url: string;
    tags: Tag[];
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
    revisedAt: string;
    publishedAt: string;
  };
  
  
  export type Tag = {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    revisedAt: string;
    publishedAt: string;
  };