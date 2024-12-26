import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import {
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import { getCollectionBySlug } from '@/lib/crud';
import { type Collection } from '@/lib/db';

export interface DataProps {
  [key: string]: string | number | boolean;
}

export interface ContextProps {
  refetch: () => void;
  isFetching: boolean;
  selectedRows: string[];
  setSelectedRows: (val: string[]) => void;
  handleSelectRow: (id: string) => void;
  selectedCollection: Collection | undefined;
}

const DataContext = createContext<ContextProps>({} as ContextProps);

export const useDataContext = () => useContext(DataContext);

interface DataContextProviderProps {
  children: ReactNode;
}

export default function DataContextProvider({
  children,
}: DataContextProviderProps) {
  const { query } = useRouter();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { data, refetch, isFetching } = useQuery({
    queryFn: () => getCollectionBySlug(query.slug as string),
    queryKey: ['selected-collection', query.slug],
  });

  const contextValue = useMemo((): ContextProps => {
    function handleSelectRow(id: string) {
      if (selectedRows.includes(id)) {
        setSelectedRows(selectedRows.filter((i) => i !== id));
      } else {
        setSelectedRows([...selectedRows, id]);
      }
    }

    return {
      refetch,
      isFetching,
      setSelectedRows,
      selectedRows,
      handleSelectRow,
      selectedCollection: data,
    };
  }, [isFetching, refetch, data, selectedRows, setSelectedRows]);

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}
