import React from 'react';
import { connect } from 'react-redux';
import categorys from './Helpers/categorys';
import DropDown from './Helpers/DropDown';

function Settings() {
  const difficults = ['Todas', 'Fácil', 'Média', 'Difícil'];
  const types = ['Multipla escolha', 'Verdadeiro ou Falso'];
  return (
    <div className="App paper container-lg">
      <h1 data-testid="settings-title">Configurações</h1>
      <DropDown title="Categoria" items={ categorys } />
      <DropDown title="Dificuldade" items={ difficults } />
      <DropDown title="Tipo" items={ types } />
    </div>
  );
}

export default /* connect(mapStateToProps, mapDispatchToProps) */(Settings);
