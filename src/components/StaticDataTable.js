import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const StaticDataTable = ({ data, fieldList }) => {
  const filtered = Object.entries(fieldList).filter(([_field, show]) => show);

  if (!filtered.length) {
    return <div className="error">Field list is empty</div>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {filtered.map((field, index) => (
            <TableCell key={index} component="th" scope="row">
              {field}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(row => (
          <TableRow key={row.startIndex}>
            {filtered.map(field => (
              <TableCell key={field} scope="row">
                {row[field] || ""}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StaticDataTable;
