import { useEffect, useState } from 'react'

function App() {
  const [membros, setMembros] = useState([])
  const [novoNome, setNovoNome] = useState('')
  const [novoEmail, setNovoEmail] = useState('')

  // Busca os membros no back-end quando a tela carrega
  useEffect(() => {
    fetch('http://localhost:3000/membros')
      .then(res => res.json())
      .then(data => setMembros(data))
      .catch(err => console.error("Erro ao buscar membros:", err))
  }, [])

  // Função para cadastrar um novo membro
  const cadastrarMembro = async (e) => {
    e.preventDefault()
    
    const resposta = await fetch('http://localhost:3000/membros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: novoNome, email: novoEmail })
    })

    if (resposta.ok) {
      const membroCriado = await resposta.json()
      // Atualiza a lista na tela sem precisar recarregar a página
      setMembros([...membros, membroCriado])
      setNovoNome('')
      setNovoEmail('')
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Gestão da Academia 🏋️</h1>
      
      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Cadastrar Novo Membro</h2>
        <form onSubmit={cadastrarMembro}>
          <input 
            type="text" 
            placeholder="Nome" 
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
            required
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={novoEmail}
            onChange={(e) => setNovoEmail(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
            required
          />
          <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer' }}>Cadastrar</button>
        </form>
      </div>

      <h2>Lista de Membros</h2>
      {membros.length === 0 ? (
        <p>Nenhum membro cadastrado ainda.</p>
      ) : (
        <ul>
          {membros.map(membro => (
            <li key={membro.id} style={{ marginBottom: '10px' }}>
              <strong>{membro.nome}</strong> - {membro.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App