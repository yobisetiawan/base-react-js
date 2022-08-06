import React, { useRef } from "react";
import { Button, Pane, Card, TextInputField, Text, Link } from "evergreen-ui";
import { useForm } from "react-hook-form";
import { validationMessage, useBaseFormRequest } from "../../utils/FormHelper";
import { API } from "../../configs/AppApi";
import { Link as LinkRouter } from "react-router-dom";

function LoginPage() {
  const formData = useRef(null) as any;
  const { register, handleSubmit } = useForm();

  const onSuccess = (data: any) => {
    console.log(data);
  };

  const { submitRequest, isLoading, errForm } = useBaseFormRequest(
    () => API.login(formData.current),
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
        <Card border="default" padding={20} maxWidth={350} width="100%">
          <Text fontSize={20} fontWeight={"bold"}>
            Login
          </Text>
          <Pane height={30}></Pane>
          <form onSubmit={onSubmit}>
            <TextInputField
              {...register("email")}
              label="Email"
              placeholder="Email"
              validationMessage={validationMessage(errForm, "email")}
            />
            <TextInputField
              label="Password"
              {...register("password")}
              placeholder="Password"
              type="password"
              validationMessage={validationMessage(errForm, "password")}
            />
            <Button appearance="primary" isLoading={isLoading} marginRight={15}>
              Submit
            </Button>

            <Link to={"/forgot-password"} is={LinkRouter} size="small">
              Forgot Password
            </Link>
          </form>
        </Card>
      </Pane>
    </Pane>
  );
}

export default LoginPage;
