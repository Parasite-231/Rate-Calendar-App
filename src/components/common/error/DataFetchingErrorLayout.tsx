import React from "react";
import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

const DataFetchingErrorLayout: React.FC = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={
      <>
        <NavLink to="/">
          <Button type="primary">Back Home</Button>
        </NavLink>
      </>
    }
  />
);

export default DataFetchingErrorLayout;
