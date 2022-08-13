import { Pane, Heading, TextInputField, Button, toaster } from "evergreen-ui";
import AppLayout from "../../components/AppLayout";

import { useBaseRequest, validationMessage } from "../../utils/FormHelper";

import { useForm } from "react-hook-form";
import { useRef } from "react";
import { API } from "../../configs/AppApi";

const ChangePassword = () => {
  const formData = useRef(null) as any;
  const { register, handleSubmit, reset } = useForm();

  const { submitRequest, isLoading, errForm } = useBaseRequest({
    api: () => API.profileChangePassword(formData.current),
    onSuccess: () => {
      reset();
      toaster.success("Your password updated!");
    },
  });

  const onSubmit = handleSubmit((data) => {
    formData.current = data;
    submitRequest();
  });

  return (
    <AppLayout>
      <Pane className="page-content">
        <Pane minHeight={900} padding={20}>
          <Heading>Change Password</Heading>
          <Pane height={30}></Pane>
          <Pane maxWidth={500}>
            <form onSubmit={onSubmit}>
              <TextInputField
                {...register("old_password")}
                label="Old Password"
                placeholder="Old Password"
                type="password"
                validationMessage={validationMessage(errForm, "old_password")}
              />
              <TextInputField
                label="New Password"
                placeholder="New Password"
                {...register("password")}
                type="password"
                validationMessage={validationMessage(errForm, "password")}
              />

              <TextInputField
                label="New Password Confirmation"
                placeholder="New Password Confirmation"
                {...register("password_confirmation")}
                type="password"
                validationMessage={validationMessage(
                  errForm,
                  "password_confirmation"
                )}
              />
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

export default ChangePassword;
