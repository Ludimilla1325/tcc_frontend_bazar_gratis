import React from "react";
import {
  Container,
  BodyContent,
  HandleDiv,
  Title,
  HelperTitle,
  FirstSpan,
  ContactHelper,
  ContactTitle,
  ContactSpan,
  Body,
  BodyFooter,
  Logo,
  SecondTitle,
  StepDiv,
  StepNumber,
  BodyContent2,
  Body2,
  HandleColumnDiv,
  Question,
  Answer,
  BodyFooterSimple,
  Body3,
} from "./styles";
import BazarGratisIcon from "../../../Assets/bazargratis.png";
import { ClientLogin } from "../ClientLogin";

export const Home = () => {
  return (
    <Container>
      <Body>
        <BodyContent>
          <HandleDiv>
            <HelperTitle>
              <Title>BAZAR GRÁTIS</Title>
            </HelperTitle>
            <i>
              <FirstSpan>
                O Bazar Grátis é uma plataforma desenvolvida para a troca
                <br />
                de pontos por produtos de maneira simples e amigável! <br />
                Aqui tanto o gerenciamento das lojas por parte de de
                <br />
                administradores, quanto o a compras por parte de clientes
                <br /> são facilitadas!
                <br />
              </FirstSpan>
            </i>
            <ContactHelper>
              <ContactTitle>ENTRE EM CONTATO</ContactTitle>
              <ContactSpan>TELEFONE: (00) 0000000000</ContactSpan>
              <ContactSpan>EMAIL: EXAMPLE@GMAIL.COM</ContactSpan>
            </ContactHelper>
          </HandleDiv>

          <HandleDiv>
            {/* <Logo src={BazarGratisIcon} alt="Logo Bazar Gratis" /> */}
            <ClientLogin />
          </HandleDiv>
        </BodyContent>
        <BodyFooter>"ESCOLHA COM CONSCIÊNCIA!"</BodyFooter>
      </Body>
      <SecondTitle>
        NÃO SABE COMO FUNCIONA E ESTÁ NECESSITANDO DE DOAÇÕES? <br />
        VAMOS TE EXPLICAR COMO!
      </SecondTitle>
      <Body2>
        <BodyContent2>
          <HandleDiv>
            <StepDiv>
              <StepNumber>1</StepNumber>Primeiro, você precisa se cadastrar em
              nosso <br />
              site gratuitamente, através do botão <br />
              “Registrar”
            </StepDiv>

            <StepDiv>
              <StepNumber>2</StepNumber>Após a criação da conta, você poderá
              logar
              <br />
              se na conta e receberá 100 pontos <br />
              automaticamente
            </StepDiv>
          </HandleDiv>

          <HandleDiv>
            <StepDiv>
              <StepNumber>3</StepNumber>Assim, você já poderá adicionar os itens
              que <br />
              deseja na cesta. Porém, vocẽ só pode <br />
              adicionar 100 pontos em produtos!
            </StepDiv>

            <StepDiv>
              <StepNumber>4</StepNumber>Já com os produtos na cesta, <br />
              você poderá finalizar compra, e escolher a data de <br />
              retirada dos produtos.
            </StepDiv>
          </HandleDiv>
        </BodyContent2>
        <BodyFooterSimple></BodyFooterSimple>
   
        
      </Body2>
      <SecondTitle>PERGUNTAS FREQUENTES</SecondTitle>
      <Body3>
        <BodyContent2>
          <HandleDiv>
            <HandleColumnDiv>
              <Question>1. Onde irei retirar os produtos?</Question>
              <Answer>
                Da loja que cadastrou durante seu registro de conta
              </Answer>
            </HandleColumnDiv>
            <HandleColumnDiv>
              <Question>
                2. Posso alterar a loja que cadastrei para retirada <br /> dos
                produtos?
              </Question>
              <Answer>
                Sim, vocẽ pode alterar no seu perfil, ao clicar no botão <br />
                “Atualizar Dados”
              </Answer>
            </HandleColumnDiv>
          </HandleDiv>
          <HandleDiv>
            <HandleColumnDiv>
              <Question>3. Como faço para obter novos pontos?</Question>
              <Answer>
                Depois de logado, você pode ir no painel e clicar em <br />
                solicitar novos pontos. Passando a quantidade de <br />
                pontos(máximo de 100) e dando uma justificativa de <br />
                necessidade
              </Answer>
            </HandleColumnDiv>
            <HandleColumnDiv>
              <Question>4. Esqueci minha senha, o que fazer?</Question>
              <Answer>Será decidido depois</Answer>
            </HandleColumnDiv>
          </HandleDiv>
        </BodyContent2>
        <BodyFooterSimple final={true}>
          Copyright © 2022 BAZAR GRÁTIS. All Rights Reserved.
        </BodyFooterSimple>
      </Body3>
    </Container>
  );
};
