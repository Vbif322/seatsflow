import EditPhoto from "../../components/EditPhoto";
import EditInformationPage from "../../hoc/EditInformationPage";

export default function photo() {
  return (
    <EditInformationPage title={"Фото"}>
      <EditPhoto />
    </EditInformationPage>
  );
}
