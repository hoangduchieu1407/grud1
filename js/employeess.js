const formEmp = document.getElementById("formEmp")
const inputName = document.getElementById("name")
const inputEmail = document.getElementById("email")
const inputMobile = document.getElementById("mobile")
const tableBody = document.querySelector("#example")
const submit = document.getElementById("submit")
const contIdEdit = document.getElementById("contIdEdit")

function comeback(id, name, email, mobile){
    return `<tr role="row" class="odd">
            <td>${id}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${mobile}</td>
            <td>
                <button class="btn btn-info edit" data-id="${id}">Edit</button>
                <button class="btn btn-info delete" data-id="${id}">Delete</button>
            </td>
            </tr>`
}

Employee.showAllEmployees(comeback)


formEmp.addEventListener("submit", (e) => {
    e.preventDefault()
    if(!contIdEdit.value){
        let id = Math.floor(Math.random() * 1000000)
        const newEmp = new Employee(id, inputName.value, inputEmail.value, inputMobile.value)
        newEmp.showData(comeback)
        newEmp.storeEmployee()
        
    }else{
        const id = contIdEdit.value
        const newEmp = new Employee(id, inputName.value, inputEmail.value, inputMobile.value)
        newEmp.updateEmployee(id)
        submit.value = "Store This Data"
        tableBody.innerHTML = ''
        contIdEdit.value = ''
        Employee.showAllEmployees(comeback)
    }  
    inputName.value = ''
    inputEmail.value = ''
    inputMobile.value = ''
})

tableBody.addEventListener("click", (e)=>{
    if(e.target.classList.contains("delete")){
        
        //Remove from localStrorage
        const id = +e.target.getAttribute("data-id")
        const emps = JSON.parse(localStorage.getItem("employeess"))
        const newData = emps.filter(item=>item.id != id)
        localStorage.setItem("employeess", JSON.stringify(newData))
        
        //Remove from HTML
        e.target.parentElement.parentElement.remove()
    }

    if(e.target.classList.contains("edit")){
        
        //Edit from localStrorage
        const id = +e.target.getAttribute("data-id")
        const item = JSON.parse(localStorage.getItem("employeess")).find(item => item.id === id)
        inputName.value = item.name
        inputEmail.value = item.email
        inputMobile.value = item.mobile
        contIdEdit.value = id
        submit.value = "Edit this Item"
    }

})