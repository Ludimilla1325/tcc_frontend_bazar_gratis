import React, { useState } from "react";
import { Container, Title, Label, Input, Button } from "./styles";
import { useNavigate } from "react-router-dom";
import { useMaster } from "../../../../Hooks/master";
export const CreateAndEditStore = () => {
  const navigate = useNavigate();
  const {
    isEditedStore,
    selectedStore,
    updateStore,
    setIsEditedStore,
    createStore,
  } = useMaster();
  const [loading, setLoading] = useState(false);

  const [formValue, setFormValue] = useState({
    name: isEditedStore ? selectedStore.name : "",
    localization: isEditedStore ? selectedStore.description : "",
    maxPoints: isEditedStore ? selectedStore.quantity : "",
  });

  const handleChangeForm = (name: string, event: any) => {
    setFormValue({
      ...formValue,
      [name]: event.target.value,
    });
  };

  return (
    <Container>
      <Title>Cadastrar loja</Title>
      <Label>
        Nome
        <Input
          value={formValue.name}
          onChange={(ev) => handleChangeForm("name", ev)}
        />
      </Label>
      <Label>
        Localização
        <Input
          value={formValue.localization}
          onChange={(ev) => handleChangeForm("localization", ev)}
        />
      </Label>
      <Label>
        Pontos Máximos
        <Input
          type="number"
          value={formValue.maxPoints}
          onChange={(ev) => handleChangeForm("maxPoints", ev)}
        />
      </Label>

      {isEditedStore ? (
        <Button
          onClick={async () => {
            try {
              setLoading(true);

              await updateStore(
                selectedStore.id,
                formValue.name,
                formValue.localization,
                formValue.maxPoints
              );

              setIsEditedStore(false);
            } catch (error) {
              window.alert(JSON.stringify("Erro ao cadastrar!"));
            } finally {
              setLoading(false);
            }
          }}
        >
          Atualizar
        </Button>
      ) : (
        <Button
          onClick={async () => {
            try {
              setLoading(true);
              await createStore(
                formValue.name,
                formValue.localization,
                formValue.maxPoints
              );
            } catch (error) {
              window.alert(JSON.stringify("Erro ao cadastrar!"));
            } finally {
              setLoading(false);
            }
          }}
        >
          Confirmar
        </Button>
      )}
    </Container>
  );
};
