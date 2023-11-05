"use client";
import { useState, useEffect } from 'react';
import styles from './page.module.css'

interface Pedido {
  id: number,
  nome: string,
  qtd_paes: number
}

export default function Home() {
  const [data, setData] = useState<Pedido[]>([]);

  useEffect(() => {
    // Simulando uma solicitação GET
    fetch('/api/pedidos', {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Falha na solicitação GET');
        }
      })
      .then((responseData) => {
        setData(responseData.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (id: number) => {
    // Simulando uma solicitação DELETE
    fetch('/api/pedidos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.ok) {
          // Atualizar a lista de pedidos após a exclusão
          setData(data.filter((pedido:Pedido) => pedido.id !== id));
        } else {
          throw new Error('Falha na solicitação DELETE');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePost = () => {
    // Simulando uma solicitação POST
    const newPedido = {
      nome: 'Novo Pedido',
      qtd_paes: 10,
    };

    fetch('/api/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPedido),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Falha na solicitação POST');
        }
      })
      .then((responseData) => {
        // Adicionar o novo pedido à lista de pedidos
        setData([...data, responseData.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Dados dos Pedidos:</h1>
      <ul>
        {data.map((pedido: Pedido) => (
          <li key={pedido.id}>
            <p>ID: {pedido.id}</p>
            <p>Nome: {pedido.nome}</p>
            <p>Quantidade de Pães: {pedido.qtd_paes}</p>
            <button onClick={() => handleDelete(pedido.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <button onClick={handlePost}>Adicionar Pedido</button>
    </div>
  );
}

