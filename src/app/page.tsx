"use client";
import { useState, useEffect } from 'react';
import './globals.css';
import Image from 'next/image';
import logo from "./Logo.png";
import icon1 from './Icon.png';
import icon2 from './Group 1.png';
import icon3 from './Group 2.png';

interface Pedido {
  id: number,
  nome: string,
  qtd_paes: number
}

export default function Home() {
  const [data, setData] = useState<Pedido[]>([]);
  const [queue, setQueue] = useState<number>(0);

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
        setQueue(responseData.data.data.length);
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
          setQueue(queue - 1);
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
        setQueue(queue + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main>
      <div className='header'>
        <Image className='logo' src={logo} alt="logo"/>
        <div className='infos'>
          <section className='tamfila'>
            <a>
              <div>Pessoas na fila</div>
              <Image src={icon1} alt="icon1"/>
            </a>
            <p>{queue}</p>
          </section>
          <section className='paesvend'>
            <a>
              <div>Pães vendidos</div>
              <Image src={icon2} alt="icon2"/>
            </a>
            <p>350</p>
          </section>
          <section className='entrada'>
            <a>
              <div>Entrada</div>
              <Image src={icon3} alt="icon3"/>
            </a>
            <p>R$ 175,00</p>
          </section>
        </div>
      </div>

      <div className='body'>
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
        <p className='add' onClick={handlePost}>+ Adicionar Pedido</p>
      </div>
    </main>
  );
}

