import React, { useState } from "react";
import {
  Container,
  Title,
  Label,
  Input,
  Span,
  LoginButton,
  Subtitle,
  SpanLabel
} from "../AuthStyles";
import { useCliente } from "../../../Hooks/cliente";
import { useNavigate } from "react-router-dom";
import { app_base_url } from "../../../Utils/urls";
import { useMaster } from "../../../Hooks/master";
import { Alert } from "../../../components/Modals/Alert";
export const MasterLogin = () => {
  const navigate = useNavigate();
  const { logar } = useMaster();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState({title:"", message:""});
  return (
    <Container>
      <Title>Login</Title>
      <Subtitle>Faça seu login para acessar o sistema</Subtitle>
      <Label>
      <SpanLabel> Email</SpanLabel>
        <Input value={email} onChange={(ev) => setEmail(ev.target.value)} />
      </Label>
      <Label>
      <SpanLabel> Senha</SpanLabel>
        <Input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </Label>

      <Span>Esqueceu a Senha?</Span>

      <LoginButton
        onClick={async () => {
          try {
            setLoading(true);

            await logar(email, password);
            navigate(`${app_base_url}/products`);
          } catch (error) {
             setError({title:"Ops", message:String(error)})
          } finally {
            setLoading(false);
          }

         
        }}
      >
        Logar no Sistema
      </LoginButton>
      <Alert open={error.message.length > 0} onClose={()=>{setError({title:"", message:""})}}
          error={error}
        
        />
    </Container>
  );
};
