import { useQuery } from '@tanstack/react-query';
import {
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import { getCollections } from '@/utils/crud';
import { Collection } from '@/utils/db';

export interface DataProps {
  [key: string]: string | number | boolean;
}

export interface ContextProps {
  data: Collection[];
  refetch: () => void;
  isFetching: boolean;
  selectedRows: number[];
  handleSelectRow: (index: number) => void;
  selectedCollection: Collection | undefined;
  selectedCollectionId: string;
  setSelectedCollectionId: (id: string) => void;
}

const DataContext = createContext<ContextProps>({} as ContextProps);

export const useDataContext = () => useContext(DataContext);

interface DataContextProviderProps {
  children: ReactNode;
}

export default function DataContextProvider({
  children,
}: DataContextProviderProps) {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const { data, refetch, isFetching } = useQuery({
    queryFn: () => getCollections(),
    initialData: [],
    queryKey: ['collections'],
  });

  const selectedCollection = useMemo((): Collection | undefined => {
    const collection = data.find((col) => col.id === selectedCollectionId);

    if (collection) {
      return collection;
    }

    return undefined;
  }, [data, selectedCollectionId]);

  const contextValue = useMemo((): ContextProps => {
    function handleSelectRow(index: number) {
      if (selectedRows.includes(index)) {
        setSelectedRows(selectedRows.filter((i) => i !== index));
      } else {
        setSelectedRows([...selectedRows, index]);
      }
    }

    return {
      data,
      refetch,
      isFetching,
      selectedRows,
      handleSelectRow,
      selectedCollection,
      selectedCollectionId,
      setSelectedCollectionId,
    };
  }, [
    data,
    isFetching,
    refetch,
    selectedCollection,
    selectedCollectionId,
    selectedRows,
  ]);

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}
