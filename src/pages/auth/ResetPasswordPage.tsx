import React, { useRef } from "react";
import {
  Button,
  Pane,
  Card,
  TextInputField,
  Text,
  toaster,
} from "evergreen-ui";
import { useForm } from "react-hook-form";
import { validationMessage, useBaseFormRequest } from "../../utils/FormHelper";
import { API } from "../../configs/AppApi";
import { useNavigate, useParams } from "react-router-dom";

function ResetPasswordPage() {
  const formData = useRef(null) as any;
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const params = useParams();

  const onSuccess = () => {
    toaster.success(
      "Password changed!, your password has been changed successfully  "
    );

    navigate("/login?email=" + formData.current?.email);
  };

  const { submitRequest, isLoading, errForm } = useBaseFormRequest(
    () => API.resetPassword(formData.current),
    onSuccess
  );

  const onSubmit = handleSubmit((data) => {
    data.email = params?.email;
    formData.current = data;
    submitRequest();
  });

  return (
    <Pane height="100%" position="fixed" width="100%" left={0} top={0}>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Card border="default" padding={20} maxWidth={350} width="100%">
          <Text fontSize={20} fontWeight={"bold"}>
            Reset Password
          </Text>
          <Pane height={30}></Pane>
          <form onSubmit={onSubmit}>
            <TextInputField
              {...register("code")}
              label="OTP"
              placeholder="OTP"
              validationMessage={validationMessage(errForm, "code")}
            />
            <TextInputField
              {...register("password")}
              label="Password"
              placeholder="Password"
              type="password"
              validationMessage={validationMessage(errForm, "password")}
            />
            <TextInputField
              {...register("password_confirmation")}
              label="Password Confirmation"
              placeholder="Password"
              type="password"
              validationMessage={validationMessage(
                errForm,
                "password_confirmation"
              )}
            />
            <Button appearance="primary" isLoading={isLoading}>
              Submit
            </Button>
          </form>
        </Card>
      </Pane>
    </Pane>
  );
}

export default ResetPasswordPage;
