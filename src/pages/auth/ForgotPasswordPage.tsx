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
import { Outlet, useNavigate } from "react-router-dom";
import { RouteName } from "../../configs/RouteName";

function ForgotPasswordPage() {
  const formData = useRef(null) as any;
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSuccess = () => {
    toaster.success("We sent OTP to your email, please check your mail");
    navigate(RouteName.forgotPassword + "/" + formData.current?.email);
  };

  const { submitRequest, isLoading, errForm } = useBaseFormRequest(
    () => API.forgotPassword(formData.current),
    onSuccess
  );

  const onSubmit = handleSubmit((data) => {
    data.login_as = "employee";
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
        <Card
          border="default"
          background="white"
          padding={20}
          maxWidth={350}
          width="100%"
        >
          <Text fontSize={20} fontWeight={"bold"}>
            Forgot Password
          </Text>
          <Pane height={30}></Pane>
          <form onSubmit={onSubmit}>
            <TextInputField
              {...register("email")}
              label="Email"
              placeholder="Email"
              validationMessage={validationMessage(errForm, "email")}
            />
            <Button appearance="primary" isLoading={isLoading}>
              Submit
            </Button>
          </form>
        </Card>
      </Pane>

      <Outlet />
    </Pane>
  );
}

export default ForgotPasswordPage;
