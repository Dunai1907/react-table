import { Route, Routes } from "react-router-dom";
import FormPage from "@/Pages/Form/form";
import FormsTablePage from "@/Pages/FormsTable/formsTable";

export enum RouteUrls {
  formsTable = "/",
  form = "/form",
  viewTable = "/table",
}

export const redirect_uri = "http://localhost:5173";

const Router = () => {
  return (
    <Routes>
      <Route path={RouteUrls.formsTable} element={<FormsTablePage />} />
      <Route path={RouteUrls.form} element={<FormPage />} />

      {/* <Route path={RouteUrls.error404} element={<Error code={404} />} />
        <Route path={RouteUrls.error500} element={<Error code={500} />} /> */}
    </Routes>
  );
};

export default Router;
