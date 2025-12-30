import { api } from '@/lib/axios';

interface HelloResponse {
  message: string;
}

export const fetchHello = async (): Promise<HelloResponse> => {
  const { data } = await api.get<HelloResponse>('/hello');
  return data;
};
