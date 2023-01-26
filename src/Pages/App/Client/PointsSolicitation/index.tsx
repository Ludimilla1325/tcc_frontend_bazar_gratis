import React, { useEffect, useState } from "react";
import { IPointsSolicitation, useCliente } from "../../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  Body,
  Header,
  Table,
  TableTitle,
  TBody,
  THead,
  Container,
  Title,
  Label,
  Input,
  Span,
  LoginButton,
  Subtitle,
  SpanLabel,
  InputJustification,
  ErrorMessage,
} from "./styles";
import { PointsSolicitationDetails } from "../../../../components/Modals/PointsSolicitationDetails";
export const PointsSolicitation = () => {
  const navigate = useNavigate();
  const {
    pointsSolicitationList,
    cliente,
    clienteStore,
    pointsSolicitation,
    getPointsSolicitationHistoric,
  } = useCliente();
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("");
  const [justification, setJustification] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ title: "", message: "" });
  const [solicitationFocus, setSolicitationFocus] = useState(
    {} as IPointsSolicitation
  );

  const [errors, setErrors] = useState({
    quantity: false,
    justification: false,
  });

  const formSchema = yup.object().shape({
    quantity: yup.number().required().max(100),
    justification: yup.string().required(),
  });

  function renderData() {
    if (pointsSolicitationList && pointsSolicitationList.length > 0) {
      return pointsSolicitationList.map((item: any) => {
        return (
          <Body onClick={() => setSolicitationFocus(item)}>
            <TBody>
              {new Date(item.request_date).toLocaleDateString("pt-br")}
            </TBody>
            <TBody>{item.quantity}</TBody>
            <TBody>{item.status}</TBody>
          </Body>
        );
      });
    }
  }

  useEffect(() => {
    getPointsSolicitationHistoric();
  }, []);
  return (
    <Container>
      <Title>Solicitar Novos pontos</Title>
      <Label>
        <SpanLabel>Nome</SpanLabel>
        <Input value={clienteStore.name} disabled={true} />
      </Label>
      <Label>
        <SpanLabel>Pontos</SpanLabel>
        <Input
          type="number"
          value={quantity}
          onChange={(ev) => setQuantity(ev.target.value)}
          placeholder="Digite os pontos"
        />
        {errors.quantity ? (
          <ErrorMessage>
            Pontos é um campo obrigatório e o valor máximo é 100
          </ErrorMessage>
        ) : (
          ""
        )}
      </Label>
      <Label>
        <SpanLabel>Justificativa</SpanLabel>
        <InputJustification
          value={justification}
          onChange={(ev) => setJustification(ev.target.value)}
          placeholder="Digite uma justificativa!"
        />
        {errors.justification ? (
          <ErrorMessage>Justificativa é um campo obrigatório</ErrorMessage>
        ) : (
          ""
        )}
      </Label>

      <LoginButton
        onClick={async () => {
          const isFormValid = await formSchema.isValid(
            { quantity, justification },
            {
              abortEarly: false, // Prevent aborting validation after first error
            }
          );

          if (isFormValid) {
            setLoading(true);
            await pointsSolicitation(quantity, justification);
            setQuantity("");
            setJustification("");
            setErrors({ quantity: false, justification: false });
          } else {
            formSchema
              .validate({ quantity, justification }, { abortEarly: false })
              .catch((err) => {
                const errors = err.inner.reduce(
                  (acc: any, error: any) => {
                    return {
                      ...acc,
                      [error.path]: true,
                    };
                  },

                  {}
                );

                setErrors(errors);
              });
          }
        }}
      >
        Solicitar
      </LoginButton>

      <TableTitle>Histórico de Pontos</TableTitle>
      <Table>
        <Header>
          <THead>Data</THead>
          <THead>Pontos</THead>
          <THead>Status</THead>
        </Header>

        {renderData()}
      </Table>
      <PointsSolicitationDetails
        open={!!solicitationFocus.id}
        onClose={() => setSolicitationFocus({} as IPointsSolicitation)}
        solicitacao={solicitationFocus}
      />
    </Container>
  );
};
