import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect, useState } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

type TProps = {
  searchQuery: string;
  delay: number;
};

const useDebounced = ({ searchQuery, delay }: TProps) => {
  const [debounce, setDebounce] = useState<string>(searchQuery);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(searchQuery);
    }, delay);
    return () => clearTimeout(handler);
  }, [searchQuery, delay]);
  return debounce;
};
