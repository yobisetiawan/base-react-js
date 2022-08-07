import { Pane, Heading } from "evergreen-ui";
import AppLayout from "../../components/AppLayout";

const DashboardPage = () => {
 

  return (
    <AppLayout>
      <Pane className="page-content">
        <Pane minHeight={900} padding={20}>
          <Heading>Dashboard</Heading>
        </Pane>
      </Pane>
    </AppLayout>
  );
};

export default DashboardPage;
