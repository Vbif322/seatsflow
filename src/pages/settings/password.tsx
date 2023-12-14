import EditPassword from "../../components/EditPassword";
import EditInformationPage from "../../hoc/EditInformationPage";

export default function Password() {
  return (
    <EditInformationPage title={"Пароль"}>
      <EditPassword />
    </EditInformationPage>
  );
}
