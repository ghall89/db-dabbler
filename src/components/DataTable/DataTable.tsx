import { Check, Close } from '@mui/icons-material';
import { Checkbox, Table } from '@mui/joy';

import { useDataContext } from '@/contexts/DataContext';

export default function DataTable() {
  const { selectedCollection, selectedRows, handleSelectRow } =
    useDataContext();

  function formatValue(value: any) {
    if (typeof value === 'boolean') {
      return value ? <Check /> : <Close />;
    } else if (value instanceof Date) {
      return new Date(value).toLocaleDateString();
    } else {
      return value;
    }
  }

  return (
    selectedCollection && (
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: '40px' }} />
            {selectedCollection.fields.map((field) => (
              <th key={field.id}>{field.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedCollection.values.map((row, index) => (
            <tr key={`row-${index}`}>
              <td>
                <Checkbox
                  onChange={() => handleSelectRow(index)}
                  checked={selectedRows.includes(index)}
                />
              </td>
              {Object.values(row).map((value) => (
                <td key={`${row}-${value}`}>{formatValue(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    )
  );
}
