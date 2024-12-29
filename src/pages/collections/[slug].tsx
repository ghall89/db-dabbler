import DataTable from '@/components/DataTable/DataTable';
import DataToolbar from '@/components/DataTable/DataToolbar';
import DataContextProvider from '@/contexts/DataProvider';

export default function Collection() {
  return (
    <DataContextProvider>
      <div className="p-6">
        <DataToolbar />
        <DataTable />
      </div>
    </DataContextProvider>
  );
}
