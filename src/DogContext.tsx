import React, { createContext, useState, useEffect, useRef, ReactNode } from "react";

interface DogContextType {
  dogImages: string[];
  loading: boolean;
  fetchDogArray: () => void;
}

interface DogProviderProps {
  children: ReactNode; 
}

export const DogContext = createContext<DogContextType>({
  dogImages: [],
  loading: false,
  fetchDogArray: () => {},
});

export const DogProvider: React.FC<DogProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [dogImages, setDogImages] = useState<string[]>([]);
  const hasFetched = useRef(false);

  const fetchDogImage = async (url: URL) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data.message;
      }
      return null;
    } catch (e) {
      console.error("Error fetching image:", e);
      return null;
    }
  };

  const fetchDogArray = async () => {
    const url = new URL("https://dog.ceo/api/breeds/image/random");
    setLoading(true);

    try {
      const results = await Promise.all(
        Array.from({ length: 12 }).map(() => fetchDogImage(url))
      );
      const dogArray = results.filter((result) => result !== null);
      setDogImages(dogArray);
    } catch (e) {
      console.error("Error fetching dog images", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchDogArray();
      hasFetched.current = true;
    }
  }, []);

  return (
    <DogContext.Provider value={{ dogImages, loading, fetchDogArray }}>
      {children}
    </DogContext.Provider>
  );
};
