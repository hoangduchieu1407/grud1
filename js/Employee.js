class Employee{
    constructor(id, name, email, mobile){
        this.id = id
        this.name = name
        this.email = email
        this.mobile = mobile
    }

    showData(comeback){
        const trEl = document.createElement("tr")
        trEl.innerHTML = comeback(this.id, this.name, this.email, this.mobile)
        tableBody.appendChild(trEl)
    }

    storeEmployee(){
        const allData = JSON.parse(localStorage.getItem("employeess"))  ?? [] 
        allData.push({
            id: this.id,
            name: this.name,
            email: this.email,
            mobile: this.mobile,
        })
        localStorage.setItem("employeess", JSON.stringify(allData))
    }

    static showAllEmployees(comeback){
        if(localStorage.getItem("employeess")){
            JSON.parse(localStorage.getItem("employeess")).forEach((item) => {
                const trEl = document.createElement("tr")
                trEl.innerHTML = comeback(item.id, item.name, item.email, item.mobile)
                tableBody.appendChild(trEl)
            })
        }
    }

    updateEmployee(id){
        const  newItem = {id:id, name:this.name, email:this.email, mobile:this.mobile}
        const UpdateData = JSON.parse(localStorage.getItem("employeess")).map((item) =>{
            if(item.id == id){
                return newItem
            }
            return item
        })
        localStorage.setItem("employeess",JSON.stringify(UpdateData))     
    }
}
