import { Grid, Sheet } from '@mui/joy';

import DataContextProvider from '@/contexts/DataContext';

import { DataTable, DataToolbar } from '@/components/DataTable';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <main>
      <DataContextProvider>
        <Grid container spacing={1}>
          <Grid xs={2}>
            <Sidebar />
          </Grid>
          <Grid xs={10}>
            <Sheet variant="outlined">
              <DataToolbar />
              <DataTable />
            </Sheet>
          </Grid>
        </Grid>
      </DataContextProvider>
    </main>
  );
}
