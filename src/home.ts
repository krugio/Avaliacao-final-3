




//Pegamos dados do usuario do sessionStorage
(document.getElementById('emailUser') as HTMLSpanElement).innerHTML = (JSON.parse(sessionStorage.getItem('temp') || '{}')).usuario;

//Pegamos a posicao do usuario do session e ja deixamos como variavel global
let posicaoX = JSON.parse(sessionStorage.getItem('temp') || '{}').posicao;

//Pegamos o numero de recados ja deste usuario!
let usuariosY = JSON.parse(localStorage.getItem('usuarios') || '{}');
let totalMsg = usuariosY[posicaoX].recados.length;
(document.getElementById('totalMsg') as HTMLSpanElement).innerHTML = totalMsg;



//=================================================================== 
//  Listamos todos os recados daquele usuario quando este conectou! \\
//===================================================================


for (let p1 in usuariosY[posicaoX].recados) {


  let idRecado = (document.createElement('tr') as HTMLTableRowElement);

  idRecado.innerHTML = `<td>${p1}</td>
                            <td>${usuariosY[posicaoX].recados[p1].descricao}</td>
                            <td>${usuariosY[posicaoX].recados[p1].recado}</td>
                            <td>
                              <button class='btn-sm btn-danger' onclick='apagar(${p1})'>APAGAR</button> 
                              <button class='btn-sm btn-primary' onclick='editar(${p1})'>EDITAR</button>  
                            </td>
                           `;

  (document.querySelector('#corpo') as HTMLTableElement).appendChild(idRecado);




}



//================================================================== 
// Escutando todos os clicks!
//==================================================================
(document.querySelector('#adicionar') as HTMLButtonElement).addEventListener('click', adicionar);
(document.querySelector('#sair') as HTMLButtonElement).addEventListener('click', sair);



// //================================================================== 
// // Funções!
// //==================================================================

function sair() {
  let respx = confirm('Você realmente deseja sair do sistema?');

  if (respx) {
    sessionStorage.removeItem('temp');
    location.href = 'index.html';
  }
}

function editar(id: string) {

  let desOld = usuariosY[posicaoX].recados[id].descricao;
  let recOld = usuariosY[posicaoX].recados[id].recado;




  //colocamos o id no modal
  (document.querySelector('#nId') as HTMLSpanElement).innerHTML = id;
  (document.querySelector('#descricaoEditado') as HTMLInputElement).value = desOld;
  (document.querySelector('#recadoEditado') as HTMLInputElement).value = recOld;



  //Abrimos o modal 
  let editarModal = new bootstrap.Modal(document.querySelector('#editaRecado') as HTMLSpanElement).show();



}


function salvarEditado() {
  //Pegamos o id do modal
  let pegaId = parseFloat((document.querySelector('#nId') as HTMLSpanElement).innerHTML);



  let novaDescricao = (document.querySelector('#descricaoEditado') as HTMLInputElement).value;
  let novoRecado = (document.querySelector('#recadoEditado') as HTMLInputElement).value;

  //pegamos a lista de ususarios
  usuariosY[posicaoX].recados[pegaId].descricao = novaDescricao;
  usuariosY[posicaoX].recados[pegaId].recado = novoRecado;

  //Salvamos no storage!
  localStorage.setItem('usuarios', JSON.stringify(usuariosY));


  location.reload();
}

function excluir() {
  //Pegamos o id do modal
  let pegaxId = parseFloat((document.querySelector('#eId') as HTMLSpanElement).innerHTML);

  usuariosY[posicaoX].recados.splice(pegaxId, 1);
  localStorage.setItem('usuarios', JSON.stringify(usuariosY));
  location.reload();
}




function apagar(id: string) {

  //colocamos o id no modal
  (document.querySelector('#eId') as HTMLSpanElement).innerHTML = id;

  //Abrimos o modal 
  let editarModal = new bootstrap.Modal((document.querySelector('#excluir') as HTMLDivElement)).show();




}

function adicionar() {

  let descricao = (document.querySelector('#descricao') as HTMLInputElement).value;
  let recado = (document.querySelector('#recado') as HTMLInputElement).value;


  if (descricao === '' || recado === '') {
    alert('Por favor preencha todos os campos para cadastrar os recados!');
    return;
  }


  //Salvando o recado do usuario Atual

  let novoRecado = {
    descricao: descricao,
    recado: recado

  }

  usuariosY[posicaoX].recados.push(novoRecado);

  localStorage.setItem('usuarios', JSON.stringify(usuariosY));
  alert("recado adicionado!");

  location.reload();

}

