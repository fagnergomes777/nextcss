'use client';

import { useState } from 'react';
import axios from 'axios';

export default function CepConsultaMinimal() {
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');

  const buscar = async () => {
    if (cep.length !== 8) return setErro('CEP inválido');

    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (res.data.erro) {
        setErro('CEP não encontrado');
        setDados(null);
      } else {
        setDados(res.data);
        setErro('');
      }
    } catch {
      setErro('Erro ao buscar');
      setDados(null);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ background: '#fce300', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <strong style={{ color: '#06447a' }}>CEP CONSULTA</strong>
        <div>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="Digite o CEP"
            maxLength="8"
            style={{ padding: '5px' }}
          />
          <button onClick={buscar} style={{ padding: '5px' }}>Buscar</button>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        {dados && (
          <div>
            <h3>CEP {cep}</h3>
            <p><strong>Cidade:</strong> {dados.localidade}/{dados.uf}</p>
            <p><strong>Rua:</strong> {dados.logradouro}</p>
            <p><strong>Bairro:</strong> {dados.bairro}</p>
          </div>
        )}
      </div>
    </div>
  );
}
