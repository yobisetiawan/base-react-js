import {
  Pane,
  Heading,
  Table,
  Spinner,
  Pagination,
  SelectField,
} from "evergreen-ui";
import { useRef, useState } from "react";
import AppLayout from "../../components/AppLayout";
import { API } from "../../configs/AppApi";
import { useUser } from "../../redux/Selector";
import { useBaseRequest, useFirstLoad } from "../../utils/FormHelper";
import { debounce } from "../../utils/Helper";

const ExamplePage = () => {
  const [ress, setRess] = useState() as any;
  const [branch, setBranch] = useState() as any;

  const user = useUser();

  const refSearch = useRef() as any;

  const params = useRef({
    type: "pagination",
    limit: 5,
    page: 1,
    q: "",
    branch_id: user?.employee?.active_branch?.id,
  }) as any;

  const { submitRequest, isLoading } = useBaseRequest({
    api: () => API.medicalWard(params.current),
    onSuccess: async (data: any) => {
      setRess(data);
    },
  });

  const branchReq = useBaseRequest({
    api: () => API.employeeBranch(),
    onSuccess: async (data: any) => {
      setBranch(data);
    },
  });

  const defaultBranch = useRef(user?.employee?.active_branch?.id) as any;

  useFirstLoad(() => {
    branchReq.submitRequest();
    submitRequest();
  });

  return (
    <AppLayout>
      <Pane className="page-content">
        <Pane minHeight={900} padding={20}>
          <Heading marginBottom={20}>Example</Heading>

          <SelectField
            label="Branch"
            value={defaultBranch.current}
            onChange={(e) => {
              params.current = {
                ...params.current,
                branch_id: e.target.value,
                page: 1,
              };
              defaultBranch.current = e.target.value;

              submitRequest();
            }}
          >
            {(branch?.data || []).map((row: any) => (
              <option value={row.id} key={row.id}>
                {row.title}
              </option>
            ))}
          </SelectField>

          <Table position="relative">
            <Table.Head>
              <Table.SearchHeaderCell
                placeholder="Search"
                onChange={(v) => {
                  params.current = { ...params.current, q: v };
                  debounce(refSearch, () => {
                    submitRequest();
                  });
                }}
              />
              <Table.TextHeaderCell>Description</Table.TextHeaderCell>
              <Table.TextHeaderCell>Total Bed</Table.TextHeaderCell>
              <Table.TextHeaderCell>VIP Bed</Table.TextHeaderCell>
            </Table.Head>

            {isLoading && (
              <Pane
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                left={0}
                right={0}
                top={0}
                bottom={0}
                zIndex={20}
                background="rgba(0,0,0,0.05)"
              >
                <Spinner />
              </Pane>
            )}

            <Table.Body>
              {(ress?.data || []).map((row: any) => (
                <Table.Row
                  key={row.id}
                  isSelectable
                  onSelect={() => alert(row.title)}
                >
                  <Table.TextCell>{row.title}</Table.TextCell>
                  <Table.TextCell>{row.description}</Table.TextCell>
                  <Table.TextCell isNumber>{row.bed_count}</Table.TextCell>
                  <Table.TextCell isNumber>{row.vip_bed_count}</Table.TextCell>
                </Table.Row>
              ))}

              {(ress?.data || []).length === 0 && (
                <Table.Row>
                  <Table.TextCell>No Data</Table.TextCell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>

          <Pagination
            page={ress?.meta?.current_page || 0}
            totalPages={ress?.meta?.last_page || 0}
            onPageChange={(page: number) => {
              params.current = { ...params.current, page };
              submitRequest();
            }}
          ></Pagination>
        </Pane>
      </Pane>
    </AppLayout>
  );
};

export default ExamplePage;
