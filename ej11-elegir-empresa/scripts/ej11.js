//-------------------------------------
//Declaración de variables y constantes
//-------------------------------------

let empresas = ["Apple","Google","IBM","Microsoft","Nvidia","Intel","Embargos a lo bestia"]
let preferencias = []
const studentName = document.querySelector("#studentName")
const choice1 = document.querySelector("#choice1")
const choice2 = document.querySelector("#choice2")
const insertButton = document.querySelector("#insertButton")
const studentsChoices = document.querySelector("#studentsChoices>tbody")
let cleanStudentName = true

//----------------------------------------------------------------------------
//Estas líneas se ejecutan automáticamente al cargar la página en el navegador
//----------------------------------------------------------------------------
studentName.focus()
choice2.disabled = true
insertButton.disabled = true

//----------------------------------------------------------------------------
//Rellenar automáticamente el primer SELECT choice1
//----------------------------------------------------------------------------
empresas.forEach( (empresa,indice) => {
    let newOption = document.createElement("OPTION")
    newOption.textContent = empresa
    newOption.value = indice + 1
    choice1.append(newOption)
})

//----------------------------------------------------------------------------
//El INPUT debe escuchar el evento KEYUP
//----------------------------------------------------------------------------
studentName.addEventListener("keyup",keyPressed )
function keyPressed() {
    if (studentName.value.trim().length)
        cleanStudentName = false
    else
        cleanStudentName = true

    checkButtonDisable()
}

//----------------------------------------------------------------------------
//El SELECT choice1 debe escuchar el evento CHANGE
//----------------------------------------------------------------------------
choice1.addEventListener("change",fillChoice2 )
function fillChoice2() {
    //vaciar las empresas de choice2, por si existiera alguna
    choice2.innerHTML = '<option value="0">(choose one)</option>'
    //comprobar si hay que habilitar o deshabilitar el botón
    checkButtonDisable()
    //si el usuario elige la opción nula (value = 0) en choice1...
    if (choice1.value == 0) {
        choice2.disabled = true
        return 
    }
    //añadir todas las empresas EXCEPTO la elegida en choice1
    empresas.forEach( (empresa,indice) => {
        if ( choice1.value != indice + 1 ) {
            let newOption = document.createElement("OPTION")
            newOption.textContent = empresa
            newOption.value = indice + 1
            choice2.append(newOption)
        }
    })
    //decidir si habilitar o deshabilitar choice2
    choice2.disabled = false
}

//----------------------------------------------------------------------------
//El SELECT choice2 también debe escuchar el evento CHANGE
//----------------------------------------------------------------------------
choice2.addEventListener("change",checkButtonDisable)
function checkButtonDisable() {
    if (cleanStudentName == false
            && choice1.value != 0
                    && choice2.value != 0)

        insertButton.disabled = false
    else
        insertButton.disabled = true
}

//----------------------------------------------------------------------------
//El botón de insertar debe escuchar el evento CLICK e insertar en un array
// el nombre del estudiante y sus preferencias de empresas
//----------------------------------------------------------------------------
insertButton.addEventListener("click",insertarNuevasPreferencias)
function insertarNuevasPreferencias() {
    let nombreAlumno = studentName.value.trim()
    //recuperar el texto del OPTION seleccionado en choice1
    let nombreEmpresa1 = choice1.options[choice1.selectedIndex].textContent
    //recuperar el texto del OPTION seleccionado en choice2
    let nombreEmpresa2 = choice2.options[choice2.selectedIndex].textContent
    //insertar en el array preferencias un nuevo objeto con los 3 datos introducidos por usuario
    preferencias.push({
        alumno: nombreAlumno,
        empresa1: nombreEmpresa1,
        empresa2: nombreEmpresa2
    })
    //mostrar en la consola para depurar programa
    console.table(preferencias)
    //por último, una vez insertada la nueva info en el array, hay que mostrarlo
    // en el HTML, en la tabla vacía que hay en la parte de abajo de la web
    imprimirPreferencias()
}

//----------------------------------------------------------------------------
//Esta función muestra en el HTML toda la información que tenemos en el array
// de prefencias de los estudiantes
//----------------------------------------------------------------------------
function imprimirPreferencias() {
    studentsChoices.innerHTML = ""
    preferencias.forEach( pref => {
        let newTR = studentsChoices.insertRow()
        let newTD1 = newTR.insertCell()
        let newTD2 = newTR.insertCell()
        let newTD3 = newTR.insertCell()
        let newTD4 = newTR.insertCell()
        newTD1.textContent = pref.alumno
        newTD2.textContent = pref.empresa1
        newTD3.textContent = pref.empresa2
        let newButton = document.createElement("button")
        newButton.classList.add("btn","btn-danger")
        newButton.textContent = "Delete"
        newTD4.append(newButton)
        //falta hacer que el botón escuche el evento CLICK

        //falta también insertar otros botones para otras acciones
        
    })
}