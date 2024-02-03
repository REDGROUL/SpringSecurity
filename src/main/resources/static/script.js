let allRoles;
document.addEventListener("DOMContentLoaded", ()=>{

    loadAllUsers();
    allRoles = "";
    getCurrenUser();
    loadRoles();
});


function loadAllUsers() {
    fetch("/api/getUsers")
        .then(response=>response.json())
        .then(users=>{
            console.log(users)
            printUsers(users)
        })
        .catch(error=>{
            console.log(error)
        })
}
function loadRoles() {
    fetch("/api/getRoles")
        .then(response=>response.json())
        .then(roles=>{
            console.log(roles)
            allRoles = roles
        })
        .catch(error=>{
            console.log(error)
        })
}



function printUsers(users) {
    let allUsersTable = document.getElementById("all-users-table");
    allUsersTable.innerHTML = ""

    users.forEach(user=>{
        allUsersTable.innerHTML += `
                             <tr>
                                <tr >
                                    <th scope="row" >${user.id}</th>
                                    <td >${user.username}</td>
                                    <td>${user.age}</td>
                                    
                                    <td>${ getRolesFromJson(user.roles)}</td>
                                    <td>
                                        <button type="button" class="btn btn-info" data-toggle="modal"
                                                data-target="#edit${user.id}">
                                            Edit
                                        </button>
                                        <div class="modal fade text-center"  id="edit${user.id}"
                                             tabindex="-1" role="dialog" aria-labelledby="editTitle"
                                             aria-hidden="true">
                                            <form  method="post">
                                                
                                                <div class="modal-dialog" role="document">
                                                    <div class="modal-content ">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="editTitle">Edit user</h5>
                                                            <button type="button" class="close" data-dismiss="modal"
                                                                    aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body text-center col-12 offset-3 col-md-6 offset-md-3">
                                                            <div class="form-group">
                                                                <label class="font-weight-bold"
                                                                       for="idEdit${user.id}">ID</label>
                                                                <input id="idEdit${user.id}" class="form-control" 
                                                                       placeholder="Id"
                                                                       readonly value="${user.id}">
                                                            </div>
                                                            <div class="form-group text-center">
                                                                <label class="font-weight-bold"
                                                                       for="nameEdit${user.id}">Name</label>
                                                                <input id="nameEdit${user.id}" class="form-control"
                                                                      
                                                                       placeholder="Name" value="${user.username}">
                                                            </div>
                                                            <div class="form-group text-center">
                                                                <label class="font-weight-bold"
                                                                       for="AgeEdit${user.id}">Age</label>
                                                                <input type="number" id="AgeEdit${user.id}"
                                                                       class="form-control"
                                                                      
                                                                       placeholder="Age" value="${user.age}">
                                                            </div>

                                                            <div class="form-group text-center">
                                                                <label class="font-weight-bold" for="passwordEdit${user.id}">Password</label>
                                                                <input type="password" id="passwordEdit${user.id}"
                                                                       class="form-control"
                                                                      
                                                                       placeholder="Password" value="${user.password}">
                                                            </div>
                                                            <div class="form-group text-center">
                                                                <label class="font-weight-bold"
                                                                       for="rolesEdit">Role</label> <br>
                                                                <select id="rolesEdit${user.id}" class="form-select"
                                                                        name="roles"
                                                                        multiple size="2">
                                                                    ${getRolesForOption(allRoles)}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary"
                                                                    data-dismiss="modal">
                                                                Close
                                                            </button>
                                                            <button id = ${user.id} class="btn btn-primary btn-edit-user"  data-dismiss="modal">Edit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger" data-toggle="modal"
                                                data-target="#delete${user.id}"
                                               >Delete
                                        </button>
                                        <div class="modal fade" id="delete${user.id}"
                                             tabindex="-1"
                                             role="dialog"
                                             aria-labelledby="deleteTitle" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="deleteTitle">Delete
                                                            user</h5>
                                                        <button type="button" class="close" data-dismiss="modal"
                                                                aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body text-center col-12 offset-3 col-md-6 offset-md-3">
                                                        <form>
                                                            <div class="form-group text-center">
                                                                <label class="font-weight-bold" for="id">ID</label>
                                                                <input id="id" class="form-control"
                                                                       value="${user.id}"
                                                                       disabled>
                                                            </div>
                                                            <div class="form-group text-center">
                                                                <label class="font-weight-bold"
                                                                       for="name">Name</label>
                                                                <input id="name" class="form-control"
                                                                       disabled value="${user.username}">
                                                            </div>
                                                            <div class="form-group text-center">
                                                                <label class="font-weight-bold"
                                                                       for="Age">Age</label>
                                                                <input type="number" id="Age" value="${user.id}" class="form-control"
                                                                        disabled>
                                                            </div>
                                                            <div class="form-group text-center">
                                                                <label class="font-weight-bold"
                                                                       for="Password">Password</label>
                                                                <input type="password" id="Password"
                                                                       class="form-control"
                                                                      value="${user.password}"
                                                                      disabled>
                                                            </div>
                                                            <div class="form-group text-center">
                                                                <label class="font-weight-bold"
                                                                       for="roles2">Role</label> <br>
                                                                <select multiple class="form-control"
                                                                        id="roles2"
                                                                        name="roles2" disabled>
                                                                    ${getRolesForOption(user.roles)}
                                                                </select>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div class="modal-footer" id="${user.id}">
                                                        <button  type="button" class="btn btn-secondary"
                                                                data-dismiss="modal">
                                                            Close
                                                        </button>
                                                       
                                                        <button id="${user.id}" data-dismiss="modal" class="btn btn-danger btnDeleteUser">Delete
                                                            </button>
                                                      
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`
    });
    console.log("print")
    addBtnEvents();
}

function getCurrenUser() {
    let tableuser = document.getElementById("current-user");
    fetch("/api/getUser/"+document.getElementById("uuserid").value,
        {method: "GET"})
        .then( response => response.json())
        .then(usr => {
            console.log("dddddd")
            console.log(usr)
            tableuser.innerHTML = `
             <th scope="row">${usr.id}</th>
                            <td>${usr.username}</td>
                            <td>${usr.age}</td>
                            <td>
                            ${getRolesFromJson(usr.roles)}
                                
                            </td>
            `
        })
        .catch(error=>{console.log(error)})


}

function getRolesFromJson(roles) {
    let stringRole = "";
    roles.forEach(role =>{
        stringRole += role.name+" ";
    })

    return stringRole;
}

function getRolesForOption(roles) {
    let stringRole = "";
    roles.forEach(role =>{
        stringRole += `<option value="${role.id}">${role.name}</option>>`
    })

    return stringRole;
}



function addBtnEvents() {
    let btnDelete = document.querySelectorAll(".btnDeleteUser");
    console.log(btnDelete);

    btnDelete.forEach(btn => {
        btn.addEventListener("click", ()=>{

            fetch("/api/users/"+btn.id,
                {method: "POST"})
                .then( response => response.text())
                .then(date => {
                    loadAllUsers()
                })
                .catch(error=>{console.log(error)})


        })
    })


    let edit = document.querySelectorAll(".btn-edit-user");
    console.log(edit)
    edit.forEach(btn=>{
        btn.addEventListener("click", ()=>{



            let roleNum = document.getElementById("rolesEdit"+btn.id).value;
            let selectedRole;
            allRoles.forEach(role=>{
                if(role.id == roleNum) {
                    selectedRole = role;
                }
            })

            let jsonRequest = JSON.stringify({
                "id": btn.id,
                "username": document.getElementById("nameEdit"+btn.id).value,
                "password": document.getElementById("passwordEdit"+btn.id).value,
                "age": document.getElementById("AgeEdit"+btn.id).value,
                "roles": [selectedRole],
            });
            console.log(jsonRequest)



            fetch("/api/userUpdate", {
                method: "POST",
                body: jsonRequest,
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                    loadAllUsers()
                })
                .then(error=>{
                    console.log(error)
                })


        })
    })
}



let newuser = document.getElementById("btn-add-user");
console.log(newuser)
newuser.addEventListener("click", ()=>{

    let roleNum = document.getElementById("rolesNew").value;
    let selectedRole;
        allRoles.forEach(role=>{
        if(role.id == roleNum) {
            selectedRole = role;
        }
    })

    let jsonRequest = JSON.stringify({
        "username": document.getElementById("nameNew").value,
        "password": document.getElementById("passwordNew").value,
        "age": document.getElementById("AgeNew").value,
        "roles": [selectedRole],
    });
    console.log(jsonRequest)



    fetch("/api/newUsers", {
        method: "POST",
        body: jsonRequest,
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            loadAllUsers()
        })
        .then(error=>{
            console.log(error)
        })

})






