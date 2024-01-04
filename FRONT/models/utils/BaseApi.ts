import axios, { AxiosResponse } from 'axios';

export const fetchApiData = async (endpoint: string, data?: any, method: string = 'get'): Promise<any> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response: AxiosResponse = await axios({
      method,
      url: `${apiUrl}/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data[0]?.message || 'Erro desconhecido na API';
    // Lança uma exceção com a mensagem de erro personalizada
    throw new Error(errorMessage);
  }
};