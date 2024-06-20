var registerForm = document.querySelector("#register-form")
var imgIcon = document.querySelector(".img-icon")
var allInput = registerForm.querySelectorAll("input")
var addBtn = document.querySelector("#add-btn")
var modal = document.querySelector(".modal")
var closeBtn = document.querySelector(".close-icon")
var imgAvatar = 'images/icon-avatar.jpg'

var userData = []
var idEl = document.getElementById("id")
var nameEl = document.querySelector("#name")
var l_nameEl = document.querySelector("#l_name")
var emailEl = document.querySelector("#email")
var officeEl = document.querySelector("#office-code")
var jobtitleEl = document.querySelector("#job-title")
var registerBtn = document.querySelector("#register-btn")
var updateBtn = document.querySelector("#update-btn")
var registerForm = document.querySelector("#register-form")
var imgUrl
var imgAvatar = 'images/icon-avatar.jpg'

addBtn.onclick = function(){
    modal.classList.add("active")
}

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active")
    var i
    imgIcon.src = imgAvatar
    registerBtn.disabled = false
    updateBtn.disabled = true
    for(i=0;i<allInput.length;i++){
        allInput[i].value = ""
    }
})


registerBtn.onclick = function(e){
    e.preventDefault()
    regitrationData()
    getDataFromLocal()
    registerForm.reset('')
    closeBtn.click()   
}
if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"))
}

function regitrationData(){
   
    userData.push({
        id: idEl.value,
        name: nameEl.value,
        l_name: l_nameEl.value,
        email: emailEl.value,
        officeCode: officeEl.value,
        jobTitle: jobtitleEl.value,
        profilePic: imgUrl == undefined ? imgAvatar : imgUrl,
    })
    var userString = JSON.stringify(userData)
    localStorage.setItem("userData", userString)
    swal("Good job!", "Registration Success", "success");
}

var tableData = document.querySelector("#table-data")

const getDataFromLocal = () => {
    tableData.innerHTML = ``
    userData.forEach((data, index) => {
        tableData.innerHTML += `
            <tr index=${index}>
                <td>${index+1}</td>
                <td><img src="${data.profilePic}" alt="" srcset="" class="img-avatar"></td>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.l_name}</td>
                <td>${data.email}</td>
                <td>${data.officeCode}</td>
                <td>${data.jobTitle}</td> 
                <td>
                    <button class="edit-btn" id="edit-btn"><i class="fa fa-eye"></i></button>
                    <button class="del-btn" style="background-color: #EE534F"><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `
    })

    var i
    var allDelBtn = document.querySelectorAll(".del-btn")
    for(i=0;i<allDelBtn.length;i++){
        allDelBtn[i].onclick = function(){
            var tr = this.parentElement.parentElement
            var id = tr.getAttribute("index")

            swal({
                title: "Bạn có chắc chắn muốn xóa?",
                text: "Nếu xóa, bạn không thể phục hồi lại được!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    userData.splice(id, 1)
                    localStorage.setItem("userData", JSON.stringify(userData))
                    tr.remove()
                  swal("Dữ liệu của bạn đã được xóa thành công!", {
                    icon: "success",
                  });
                } else {
                  swal("Chắc là có sự nhầm lẫn!");
                }
              });

            
        }
    }

    var allEditBtn = document.querySelectorAll(".edit-btn")
    for(i=0;i<allEditBtn.length;i++){
        allEditBtn[i].onclick = function(){
            var tr = this.parentElement.parentElement
            var td = tr.getElementsByTagName("td")
            var index = tr.getAttribute("index")
            var imgTag = td[1].getElementsByTagName("img")
            var profilePic = imgTag[0].src
            var id = td[2].innerHTML
            var name = td[3].innerHTML
            var l_name = td[4].innerHTML
            var email = td[5].innerHTML
            var officeCode = td[6].innerHTML
            var jobTitle = td[7].innerHTML

            addBtn.click()
            registerBtn.disabled = true
            updateBtn.disabled = false
            idEl.value = id
            nameEl.value = name
            l_nameEl.value = l_name
            emailEl.value = email
            officeEl.value = officeCode
            jobtitleEl.value = jobTitle
            profile_pic.src = profilePic
            updateBtn.onclick = function(e){
                userData[index] = {
                    id: idEl.value,
                    name: nameEl.value,
                    l_name: l_nameEl.value,
                    email: emailEl.value,
                    officeCode: officeEl.value,
                    jobTitle: jobtitleEl.value,
                    profilePic: uploadPic.value == "" ? profilePic : imgUrl,
                }
                localStorage.setItem("userData", JSON.stringify(userData))
            }
        }
    }

}

getDataFromLocal()



var profile_pic = document.querySelector("#profile-pic")
var uploadPic = document.querySelector("#upload-field")

uploadPic.onchange = function(){
    if(uploadPic.files[0].size < 1000000){
            var fReader = new FileReader()
            fReader.onload = function(e){
                imgUrl = e.target.result
                profile_pic.src = imgUrl
            }
            fReader.readAsDataURL(uploadPic.files[0])
    }else{
        alert('Kích thước ảnh quá lớn')
    }
}

var searchEl = document.querySelector("#empId")
searchEl.oninput = function(){
    searchFuc()
}

function searchFuc(){
    var tr = tableData.querySelectorAll("tr")
    var filter = searchEl.value.toLowerCase()
    var i
    for(i = 0; i < tr.length; i++){
        var id = tr[i].getElementsByTagName("td")[2].innerHTML
        var name = tr[i].getElementsByTagName("td")[3].innerHTML
        var l_name = tr[i].getElementsByTagName("td")[4].innerHTML
        var email = tr[i].getElementsByTagName("td")[5].innerHTML
        if(id.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = ""
        }else if(name.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = ""
        }
        else if(l_name.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = ""
        }
        else if(email.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = ""
        }
        else{
            tr[i].style.display = "none"
        }
    }
}