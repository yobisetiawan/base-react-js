import { Pane, Heading } from "evergreen-ui";
import AppLayout from "../../components/AppLayout";

const ExamplePage = () => {

  return (
    <AppLayout>
      <Pane className="page-content">
        <Pane minHeight={900} padding={20}>
          <Heading>Example</Heading>
        </Pane>
      </Pane>
    </AppLayout>
  );
};

export default ExamplePage;
