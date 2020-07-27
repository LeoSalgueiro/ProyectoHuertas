import React from 'react'

import { Table, Tag, Space,Modal, Button } from 'antd';

//servicio de nodo
import nodoService from '../../servicios/informacionDeNodoService'

const data = [
  {
    key: '1',
    name: 'nodo1',
    tipo: 'Arduino Uno',
    conexiones: 'Temperatura, Humedad De Suelo',
    tags: ['Correcto Funcionamiento'],
  },
  {
    key: '2',
    name: 'nodo2',
    tipo: 'Arduno Uno',
    conexiones: 'Temperatura, Humedad Ambiente, Intensidad Lumínica',
    tags: ['Con Problemas'],
  },
  {
    key: '3',
    name: 'nodo3',
    tipo: 'Arduino Mega',
    conexiones: 'Arduino Uno, Arduino Uno, Módulo WIFI',
    tags: ['Correcto Funcionamiento', 'Una conexión no está en óptimas condiciones'],
  },
];


let conexHTML = '';
let nombreHTML='';
let estadoHTML = '';

export default class EstadoNodos extends React.Component {
  state = { visible: false, items:[], isLoaded:false, data:''||{}};

  constructor(props){
    super(props);

    this.state = {
      error:null,
      isLoaded:false,
      items:[]

    };
    }
   
    
    
 componentDidMount(){
   let item = JSON.parse(localStorage.getItem('user'))
  
    nodoService.getAllNodos({email:item.email})
    .then(res => res)
    .then((result) => {
      console.log('entro al result siii')
      
      this.setState({isLoaded:true, items:result})
      
    },(error) => {
      console.log('entra a errror')
      this.setState({
        isLoaded: true,
        error 
      });
    }
    )
  }


  




  showModal = (text) => {
    let posicion
    this.state.items.find((res)=> {
      if(res.nombre===text){
/* 
if (json.hasOwnProperty(index)) {
  
  for (let j in json[index]) {
    if (json[index][j].hasOwnProperty('check')) {
      json[index][j].check = isCheck;
    }
   }
 }
*/

         console.log("Esta es la res: "+res.conexiones + res.nombre)
         this.setState({
          visible: true,
          data:{
            titulo: res.nombre,
            tipo: res.tipo,
            conexiones: res.conexiones,
            estado: res.conexiones
          }
    
        });
        } 
      })

    
    
  };
 
  handleOk = e => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  };


  columns = [
    {
      key: '_id', //con este manejo el index 
    },
    {
      
      title: 'Identificación',
      dataIndex: 'nombre',
      render: text => <a onClick={() => this.showModal(text)}>{text}</a>,
      
    },
    {
      
      title: 'Tipo',
      dataIndex: 'tipo',
      
    },
    {
      
      title: 'Conexiones',
      dataIndex: 'conexiones',
      render: (conexiones) => (
        <>
        
          {conexiones.map(conexion => {
            let resultado ='';
            
            return (
              
                resultado = resultado + conexion.nombre +', '
             
            );
          })}
        </>
      )
      
    },
    {
       
      title: 'Estado',
      dataIndex: 'conexiones',
      render: (conexiones) => (
        <>
          {conexiones.map(conexion => {
            let color = conexion.nombre.length >= 20 ? 'volcano' : 'green';
            let estado = conexion.nombre.length >= 20 ? 'CON PROBLEMAS' : 'BUEN ESTADO';
            return (
              <Tag color={color} key={conexion.nombre}>
                {estado}
              </Tag>
            );
          })}
        </>
      ),
    },
    /*
    {
      
      title: 'Accion',
      render: (text, record) => (
        <Space size="middle">
          <a>Corregir {record.name}</a>
          <a>No Hacer Nada</a>
        </Space>
      ),
    },
    */
  ];


    render(){
      const { error, isLoaded, items } = this.state;
      let nombres={nombres:Array};
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        
       
        return(
          <div>


            <Table
              columns={this.columns}
              rowKey={record => record._id}
              dataSource={items} />


            <div>
              <Modal
                closable
                title={"Nombre: " + (this.state.data?this.state.data.titulo:'')}
                visible={this.state.visible}
                onOk={this.handleOk}
                
                footer={
                  [

                    <Button key="submit" type="primary" onClick={this.handleOk}>
                      Ok
              </Button>,
                  ]
                }
              >
                <p><strong>{"Tipo: "}</strong>{this.state.data?this.state.data.tipo:''}</p>
                {this.state.data?creadorConex(this.state.data.conexiones):''}
                {/*this.state.data?creadorEstado(this.state.data.conexiones):''*/}
                <div><strong>{"Conexiones: "}</strong>{(typeof(this.state.data)!='undefined')?<p>{nombreHTML}</p>:''}</div>
                <div><strong>{"Valores: "}</strong>{(typeof(this.state.data)!='undefined')?<p>{estadoHTML}</p>:''}</div>
                
              </Modal>
            </div>

          </div>
        )}
    }
    
    
}
const creadorConex = (conexiones)=>{

  JSON.stringify(conexiones)
  let nombres='';
  let valores='';
  
  for(let i = 0; i <conexiones.length; i++){
  
    nombres = nombres +' '+ conexiones[i].nombre +','
    valores = valores +' '+conexiones[i].valor+','
  }
  nombreHTML = nombres
  estadoHTML = valores
}