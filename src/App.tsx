import { CubeProvider } from "@cubejs-client/react";
import cubejs from "@cubejs-client/core";
import "devextreme/dist/css/dx.light.css";
import { TableUsers } from "./components/TableUsers";

export const cubejsApi = cubejs({
  apiUrl: "http://localhost:4000/cubejs-api/v1",
});

const App = () => {
  return (
    <CubeProvider cubejsApi={cubejsApi}>
      <TableUsers />
    </CubeProvider>
  );
};

export default App;
