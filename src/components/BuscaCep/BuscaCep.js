import { useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import './BuscaCep.css';
import api from './../../services/api';

function BuscaCep() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  const refCep = useRef(null);

  async function hadleSearch() {
    if (isNaN(input) || input.length < 8) {
      return alert('cep inválido')
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
    } catch {
      alert('ops deu erro!!');
    }
    setInput('');
    refCep.current.focus();
  }

  return (
    <>
      <div className="container-input">
        <input
          placeholder="Digite seu Cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={refCep}
        />
        <button className="buttonSearch" onClick={hadleSearch}>
          <FiSearch size={18} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>{cep.cep}</h2>
          <p>
            {cep.logradouro}, {cep.bairro}<br />
            {cep.localidade}-{cep.uf}
          </p>
        </main>
      )}
    </>
  );
}

export default BuscaCep;
