import { Check, Close } from '@mui/icons-material';
import { Checkbox, Sheet, Table } from '@mui/joy';

import { useDataContext } from '@/contexts/DataProvider';

export default function DataTable() {
  const { selectedCollection, selectedRows, handleSelectRow } =
    useDataContext();

  function formatValue(value: any, type: string) {
    switch (type) {
      case 'boolean':
        return value ? <Check /> : <Close />;
      default:
        return value;
    }
  }

  return (
    <Sheet variant="outlined" sx={{ borderRadius: 4 }}>
      <Table>
        <thead>
          <tr>
            <th style={{ width: '40px' }} />
            {selectedCollection?.fields.map((field) => (
              <th key={field.id}>{field.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedCollection?.values.map((row) => (
            <tr key={`row-${row.id}`}>
              <td>
                <Checkbox
                  onChange={() => handleSelectRow(row.id)}
                  checked={selectedRows.includes(row.id)}
                />
              </td>
              {selectedCollection?.fields.map((field) => (
                <td key={`${row.id}-${field.id}`}>
                  {formatValue(row[field.id], field.type)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
