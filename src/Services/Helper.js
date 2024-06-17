import axios from "axios";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const BASE_URL = 'http://localhost:8080'

export const PAYMENT_KEY = 'rzp_test_YkGGfXYEYeXWZo'

export const myAxios = axios.create(
    {
        baseURL: BASE_URL
    }
);


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export {ScrollToTop}