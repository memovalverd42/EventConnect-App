import { useState, useEffect } from 'react';
import { AxiosInstance, AxiosResponse } from 'axios';
import { getAccessToken } from '../helpers';

interface State<T> {
    data: T | null;
    isLoading: boolean;
    hasError: any;
}

export const useFetch = <T>(api: AxiosInstance, path: string) => {


    const [state, setState] = useState<State<T>>({
        data: null,
        isLoading: true,
        hasError: null
    });

    useEffect(() => {
      const fetchData = async () => {
          setState(prevState => ({
              ...prevState,
              isLoading: true,
              hasError: null
          }));
  
          try {
              const response: AxiosResponse<T> = await api.get<T>(path, { headers: getAccessToken()! });
              // console.log('response', response.data);
              setState(prevState => ({
                  ...prevState,
                  data: response.data,
                  isLoading: false,
                  hasError: null
              }));
          } catch (error) {
              console.error('Error fetching data:', error);
              setState(prevState => ({
                  ...prevState,
                  data: null,
                  isLoading: false,
                  hasError: error
              }));
          }
      };
  
      fetchData();
  }, [api, path]);

    return {
      data: state.data,
      isLoading: state.isLoading,
      hasError: state.hasError
    };
};