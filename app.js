
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC2tDB3Z1tIYatKGuvTBEDxmqs03vsKXsc",
    authDomain: "webfirebase-c0cd4.firebaseapp.com",
    projectId: "webfirebase-c0cd4",
  });
  // añadir fdatos ala base de datos
  var db = firebase.firestore();

  function guardar(){
     var nombre = document.getElementById('nombre').value;
     var apellido =document.getElementById('apellido').value;
     var fecha =document.getElementById('fecha').value
     
        

    db.collection("users").add({
        first: nombre,
        last: apellido,
        born: fecha
    })
    .then(function(docRef) {
       alert("agregado Correctamente");
        
        
        
        
        
        document.getElementById('nombre').value='';
        document.getElementById('apellido').value='';
        document.getElementById('fecha').value=''
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }
  // leeer datos de ñla base de datos
var tabla =document.getElementById('tabla')
  db.collection("users").onSnapshot((querySnapshot) => { // el codigo snapshot esta al pendiente de escribir y mostrarlo inmediatamente en la base
      tabla.innerHTML='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML +=`
        <tr>
          <th scope="row">${doc.id}</th>
          <td>${doc.data().first}</td>
          <td>${doc.data().last}</td>
          <td>${doc.data().born}</td>
          <td><button class="btn btn-danger" onClick="Eliminar('${doc.id}')">Eliminar</button></td>
          <td><button class="btn btn-warning" onClick="Editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
        </tr>
        `
        
    });
});

//borrar datos 
function Eliminar(id){
    
    db.collection("users").doc(id).delete().then(function() {
        alert('Eliminado correctamente !!')

    }).catch(function(error) {
        alert("Error al eliminar ", error);
    });
    

}

//Editar Usuario 

function Editar(id,nombre,apellido,fecha){
    document.getElementById('nombre').value=nombre;
    document.getElementById('apellido').value=apellido;
    document.getElementById('fecha').value=fecha;
    var Boton=document.getElementById('boton');
    Boton.innerHTML='Editar';

    Boton.onclick=function(){
        var washingtonRef = db.collection("users").doc(id);

        var nombre=document.getElementById('nombre').value;
        var apellido=document.getElementById('apellido').value;
        var fecha=document.getElementById('fecha').value;




// Set the "capital" field of the city 'DC'
    return washingtonRef.update({
        first: nombre,
        last: apellido,
        born: fecha
})
    .then(function() {
    console.log("Document successfully updated!");
    Boton.innerHTML='guardar';
    alert("editado con exito !!!")
    document.getElementById('nombre').value='';
    document.getElementById('apellido').value='';
    document.getElementById('fecha').value=''
})
    .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
}


    }




