import { Pane, Heading, Button, toaster, FilePicker, Text } from "evergreen-ui";
import AppLayout from "../../components/AppLayout";

import { useBaseRequest, validationMessage } from "../../utils/FormHelper";

import { useRef } from "react";
import { API } from "../../configs/AppApi";
import { useForm } from "react-hook-form";

const ChangeAvatar = () => {
  const formData = useRef(null) as any;
  const { handleSubmit, setValue } = useForm();

  const { submitRequest, isLoading, errForm } = useBaseRequest({
    api: () => API.profileChangeAvatar(formData.current),
    onSuccess: () => {
      toaster.success("Your Avatar updated!");
    },
  });

  const onSubmit = handleSubmit((data) => {
    const formDt = new FormData();
    formDt.append("avatar", (data?.avatar || [])[0] || null);
    formData.current = formDt;

    submitRequest();
  });

  return (
    <AppLayout>
      <Pane className="page-content">
        <Pane minHeight={900} padding={20}>
          <Heading>Change Avatar</Heading>
          <Pane height={30}></Pane>
          <Pane maxWidth={500}>
            <form onSubmit={onSubmit}>
              <FilePicker
                width={250}
                onChange={(files) => setValue("avatar", files)}
                placeholder="Select the file here!"
              />
              <Text>{validationMessage(errForm, "avatar")}</Text>

              <Pane height={10}></Pane>
              <Button
                appearance="primary"
                isLoading={isLoading}
                marginRight={15}
              >
                Submit
              </Button>
            </form>
          </Pane>
        </Pane>
      </Pane>
    </AppLayout>
  );
};

export default ChangeAvatar;
