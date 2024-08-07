export interface ImageUrl {
    imageId: number;
    imageUrl: string;
    imageType: string;
  }
  
export interface ProductDetail {
    productId: number;
    name: string;
    typeName: string;
    imageUrl: ImageUrl[];
    createDate?: string;
    createUser?: string;
    delFlag?: boolean;
    description?: string;
    discount?: number | null;
    label?: string;
    location?: string;
    price: number;
    quantity?: number;
    rating?: number | null;
    updateDate?: string;
    updateUser?: string;
  }

  export interface ProductContent {
    name?: string;
    typeName?: string;
    description?: string;
    discount?: number | null;
    label?: string;
    location?: string;
    price?: number;
    quantity?: number;
    rating?: number | null;
  }

  export enum TypeProduct {
    robusta = 'ROBUSTA',
    arabica = 'ARABICA',
    cherry = 'CHERRY',
    culi = 'CULI'
  }

  export const typeOptions = [
    {
      value: "ROBUSTA",
      label: "ROBUSTA",
    },
    {
      value: "ARABICA",
      label: "ARABICA",
    },
    {
      value: "CHERRY",
      label: "CHERRY",
    },
    {
      value: "CULI",
      label: "CULI",
    },
  ];

export  interface IconSliderProps {
    max: number;
    min: number;
  }
  