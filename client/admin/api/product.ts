import { ProductContent, ProductDetail } from "@/app/(private)/product/_components/product.type";
import http from "@/configs/AxiosClient";

export const getAllProduct = async (name?: string,delFlag? :boolean) => {
    const response = await http.get("product", {
      params: {
        name: name,
        delFlag: delFlag
      }
    });
    return response.data;
}

export const getSearchSuggestions  = async (name: string, delFlag?: boolean) => {
  const response = await http.get(`product/search`,{
    params: {
      name: name,
      delFlag: delFlag
    }
  });
  return response.data;
}

export const getProductDentail = async (productId: number) => {
    const response = await http.get(`product/${productId}`);
    return response.data;
}

export const createProduct = async (req: ProductContent) => {
  const response = await http.post("product", { body: req });
  return response.data;
}

// export const updateListImgGallery = async (productId: number, file: File) => {
//   const formData = new FormData();
//   formData.append('imageUrl', file);

//   // Sử dụng http.upload với formData
//   const response = await http.upload(`product/upload-img/${productId}`, formData);

//   return response;
// };


export const updateListImgGallery = async (productId: number, file: File) => {
  const formData = new FormData();
  formData.append('imageUrl', file);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/upload-img/${productId}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const updateImgTitle = async (productId: number, file: File) => {
  const formData = new FormData();
  formData.append('imageUrl', file);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/upload-titleImg/${productId}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const updateContentProduct = async (productId: number, req: ProductContent) => {
  const response = await http.put(`product/${productId}`, {body: req});
  return response.data
}

export const deleteImage = async (productId:number, imageId?: number) => {
    const response = await http.delete(`product/${productId}/images/${imageId}`);
    return response.data;
}

export const removeProduct = async (productId:number) => {
  const response = await http.delete(`product/remove/${productId}`);
  return response.data;
}

export const rollbackProduct = async (productId?: number) => {
  const response = await http.put(`product/rollback/${productId}`);
  return response;
}

export const deleteProduct = async (productId?:number) => {
  const response = await http.delete(`product/delete/${productId}`);
  return response.data;
}