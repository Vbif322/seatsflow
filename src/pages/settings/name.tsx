import EditName from "../../components/EditName";
import EditInformationPage from "../../hoc/EditInformationPage";

export default function Name() {
  return (
    <EditInformationPage title={"Имя"}>
      <EditName />
    </EditInformationPage>
  );
}
