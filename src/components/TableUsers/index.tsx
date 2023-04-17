import { TableColumn } from "@cubejs-client/core";
import { useCubeQuery } from "@cubejs-client/react";
import DataGrid, {
  Column,
  FilterRow,
  GroupPanel,
  Export,
  FilterPanel,
  HeaderFilter,
  SearchPanel,
  Summary,
  TotalItem,
  Paging,
  StateStoring,
} from "devextreme-react/data-grid";

const getColumns = (columns: TableColumn[]) =>
  columns.map(({ key, title }) => (
    <Column
      key={key}
      caption={title}
      dataField={key}
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

  return (
    <DataGrid dataSource={dataSource} allowColumnResizing>
      <FilterRow visible />
      <FilterPanel visible />
      <HeaderFilter visible />
      <SearchPanel visible width={300} placeholder="Search" />
      <Paging defaultPageSize={10} />
      <StateStoring enabled type="localStorage" storageKey="datagrid-options" />
      <GroupPanel visible />
      <Export enabled />
      {getColumns(columns)}
      <Summary>
        <TotalItem column="Users Company" summaryType="count" />
      </Summary>
    </DataGrid>
  );
};
