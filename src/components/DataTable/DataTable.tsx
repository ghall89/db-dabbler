import { Check, X } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDataContext } from '@/contexts/DataProvider';

export default function DataTable() {
  const { selectedCollection, selectedRows, handleSelectRow } =
    useDataContext();

  function formatValue(value: any, type: string) {
    switch (type) {
      case 'boolean':
        return value ? <Check /> : <X />;
      default:
        return value;
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          {selectedCollection?.fields.map((field) => (
            <TableHead key={field.id}>{field.name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedCollection?.values.map((row) => (
          <TableRow key={`row-${row.id}`}>
            <TableCell>
              <Checkbox
                onChange={() => handleSelectRow(row.id)}
                checked={selectedRows.includes(row.id)}
              />
            </TableCell>
            {selectedCollection?.fields.map((field) => (
              <TableCell key={`${row.id}-${field.id}`}>
                {formatValue(row[field.id], field.type)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  // return (
  //   <Sheet variant="outlined" sx={{ borderRadius: 4 }}>
  //     <Table>
  //       <thead>
  //         <tr>
  //           <th style={{ width: '40px' }} />
  //           {selectedCollection?.fields.map((field) => (
  //             <th key={field.id}>{field.name}</th>
  //           ))}
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {selectedCollection?.values.map((row) => (
  //           <tr key={`row-${row.id}`}>
  //             <td>
  //               <Checkbox
  //                 onChange={() => handleSelectRow(row.id)}
  //                 checked={selectedRows.includes(row.id)}
  //               />
  //             </td>
  //             {selectedCollection?.fields.map((field) => (
  //               <td key={`${row.id}-${field.id}`}>
  //                 {formatValue(row[field.id], field.type)}
  //               </td>
  //             ))}
  //           </tr>
  //         ))}
  //       </tbody>
  //     </Table>
  //   </Sheet>
  // );
}
