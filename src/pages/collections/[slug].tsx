import { Box } from '@mui/joy';

import DataTable from '@/components/DataTable';
import DataToolbar from '@/components/DataToolbar';
import DataContextProvider from '@/contexts/DataProvider';

export default function Collection() {
  return (
    <DataContextProvider>
      <Box>
        <DataToolbar />
        <DataTable />
      </Box>
    </DataContextProvider>
  );
}
