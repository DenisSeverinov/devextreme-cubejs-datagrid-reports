import { TableColumn } from "@cubejs-client/core";
import { useCubeQuery } from "@cubejs-client/react";
import DataGrid, { Column } from "devextreme-react/data-grid";

const getColumns = (columns: TableColumn[]) =>
  columns.map(({ key, title }) => (
    <Column
      key={key}
      caption={title}
      calculateCellValue={(rowData: Record<string, string>) => rowData[key]}
    />
  ));

export const TableUsers = () => {
  const { resultSet, isLoading, error } = useCubeQuery({
    measures: [],
    dimensions: [
      "Users.city",
      "Users.company",
      "Users.gender",
      "Users.firstName",
      "Users.lastName",
    ],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!resultSet) {
    return null;
  }

  const dataSource = resultSet.tablePivot();

  const columns = resultSet.tableColumns();

  return <DataGrid dataSource={dataSource}>{getColumns(columns)}</DataGrid>;
};
