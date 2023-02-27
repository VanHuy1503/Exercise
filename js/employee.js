import Table from "./htable.js";
import addEventForDeleteButton from "./deletebutton.js";
import Combobox from "./scombobox.js";


window.onload = function () {
    new Combobox();
    //Tạo các event cho trang web
    createEvents();
    //Load data table
    new EmployeePage();
    // new Table(); 
};

//Tạo các sự kiện cho trang web
function createEvents() {
    try {
        document.getElementById("btnAddEmployee").addEventListener("click", onOpenFormAdd);
        document.getElementById("btnClose").addEventListener("click", onCloseFormAdd);
        document.getElementById("btnCancel").addEventListener("click", onCloseFormAdd);

        onCheckList();

        onValidator();

        //tạo sự kiện cho nút xóa
        addEventForDeleteButton();
        //thêm tabindex cho form nhân viên
        addTabIndex();


        //Thêm sự kiện click load lại bảng
        document.querySelector(".btn-refresh").onclick = () => {
            document.querySelector("tbody").textContent = "";// xóa dữ liệu cũ
            new EmployeePage(); //load dữ liệu mới
        }

    } catch (error) {
        console.log(error);
    }
}

function addTabIndex() {
    const form = document.getElementById("formEmployeeDetail");
    const input = form.querySelector("#btnCancel");
    input.addEventListener('keydown', (event) => {
        if (event.key == 'Tab') {
            event.preventDefault();
            document.getElementById("txtEmployeeCode").focus();
        }
    });
}

function onValidator() {
    try {
        // //Kiểm tra trống
        // document.querySelectorAll(".required").forEach(function (el) {
        //     el.addEventListener("blur", onValidateFieldEmpty(message));
        // });
        //-------------Kiểm tra dữ liệu hợp lệ--------------

        //Kiểm tra mã nhân viên//Mã không được bỏ trống
        document.getElementById("txtEmployeeCode").onblur = () => onValidateFieldEmpty("Mã nhân viên không được bỏ trống");

        document.getElementById("txtEmployeeCode").onblur = () => onValidateFormat(/(([NV-])+([0-9]{5})\b)/, "Mã nhân viên không hợp lệ!");

        document.getElementById("txtFullName").onblur = () => onValidateFieldEmpty("Tên không được bỏ trống");

        //Kiểm tra ngày sinh hợp lệ
        document.getElementById("dateOfBirth").onblur = () => onValidatorDate("Ngày sinh không được lớn hơn hiện tại!");

        //Kiểm tra số CMND hợp lệ
        document.getElementById("txtIdentityCard").onblur = () => onValidateFormat(/((^\d{9}$)|(^\d{12}$))/, "Số CMND không hợp lệ!");

        //Kiểm tra ngày cấp CMND hợp lệ
        document.getElementById("dateOfIssue").onblur = () => onValidatorDate("Ngày Cấp không hợp lệ!");

        //Kiểm tra Số điện thoại di động
        document.getElementById("txtMobilePhone").onblur = () => onValidateFormat(/((09|03|07|08|05)+([0-9]{8,9})\b)/, "Số điện thoại không hợp lệ!");

        //Kiểm tra Số điện thoại di động
        document.getElementById("txtLandlinePhone").onblur = () => onValidateFormat(/((09|03|07|08|05)+([0-9]{8,9})\b)/, "Số điện thoại không hợp lệ!");

        //Kiểm tra Email hợp lệ
        document.getElementById("txtEmail").onblur = () => onValidateFormat(/((^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$))|(^\d{0}$)/, "Email không hợp lệ!");

        //Kiểm tra Số điện thoại di động
        document.getElementById("txtBankAccount").onblur = () => onValidateFormat(/^\d*$/, "Số tài khoản không hợp lệ!");
    } catch (error) {
        console.log(error);
    }
}

//Hàm kiểm tra dữ liệu ngày hợp lệ
function onValidatorDate(message) {
    try {
        let input = event.currentTarget;
        let parentElement = input.parentElement;
        const value = input.value;
        if (value.trim()) {
            let today = new Date();
            let date = new Date(value);
            if (date == "Invalid Date" || date.getTime() > today.getTime()) {
                displayErrorMessage(message, parentElement);
            } else {
                clearErrorMessage(input, parentElement);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

//Hàm kiểm tra định dạng dữ liệu nhập
function onValidateFormat(format, message) {
    try {
        //Lấy dữ liệu
        let input = event.currentTarget;
        let parentElement = input.parentElement;
        const value = input.value;
        //Kiểm tra dữ liệu hợp lệ không?
        if (!value.trim()) {
            if (input.classList.contains("required")) {
                displayErrorMessage("Mã không được bỏ trống", parentElement);
            } else {
                clearErrorMessage(input, parentElement);
            }
        } else {
            if (!format.test(value.trim())) {
                displayErrorMessage(message, parentElement);
            } else {
                clearErrorMessage(input, parentElement);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function onValidateFieldEmpty(message) {
    try {
        //Lấy value
        let input = event.currentTarget;
        let parentElement = input.parentElement;
        const value = input.value;
        //Kiểm Empty
        if (!value.trim()) {
            //Thông báo lỗi
            displayErrorMessage(message, parentElement);
        } else {
            // Xóa thông báo lỗi nếu có
            clearErrorMessage(input, parentElement);
        }
    } catch (error) {
        console.log(error);
    }
}

//Hàm hiển thị thông báo lỗi
function displayErrorMessage(message, parentElement) {
    try {
        if (!parentElement.classList.contains("error-element")) {
            parentElement.classList.add("error-element");
            let elError = document.createElement("p");
            elError.classList.add("error-message");
            elError.textContent = message;
            parentElement.append(elError);
        } else {
            event.target.nextElementSibling.textContent = message;
        }
    } catch (error) {
        console.log(error);
    }
}

//Hàm xóa thông báo lỗi
function clearErrorMessage(input, parentElement) {
    try {
        parentElement.classList.remove("error-element");
        let elErrorExits = input.nextElementSibling;
        if (elErrorExits != null) {
            elErrorExits.remove();
        }
    } catch (error) {
        console.log(error);
    }
}

//Hàm mở form thêm nhân viên
async function onOpenFormAdd() {
    //HIện thị form nhập
    await fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees/NewEmployeeCode")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("txtEmployeeCode").value = data
        });

    document.getElementById("txtEmployeeCode").disabled = false;
    document.getElementById("formEmployeeDetail").style.display = "block";
    // document.getElementById("txtEmployeeCode").value = xhr;;
}

//Hàm đóng form thêm nhân viên
function onCloseFormAdd() {
    document.getElementById("formEmployeeDetail").style.display = "none";
    let errorElemets = document.getElementById("formEmployeeDetail").querySelectorAll(".error-element");
    errorElemets.forEach(function (el) {
        let input = el.querySelector("input");
        clearErrorMessage(input, el);
    });
    let textFields = document.querySelectorAll(".textfield input");
    textFields.forEach(function (el) {
        el.value = null;
    })
}
//Hàm tạo sự kiện click nút chọn tất cả
function onCheckList() {
    let checkAll = document.getElementById('ckbAllEmp');
    let checkboxes = document.getElementsByName('emp');

    checkAll.onclick = () => {
        checkboxes.forEach(function (el) {
            if (el.checked != checkAll.checked) {
                el.closest("tr").classList.toggle("selected-row")
            }
            el.checked = checkAll.checked;
        })
    }
}
//---------------------------------------------------------------------------------------------------------------------
//Class dùng để load data table
class EmployeePage {
    ListEmployee;
    constructor() {
        this.loadData();
    }
    //Lấy data bằng api
    loadData() {
        let loading = document.querySelector(".loading");
        loading.classList.remove("hidden");
        fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/employees")
            .then(res => res.json())
            .then(data => {
                this.ListEmployee = data;
                this.buildDataTable(data);
            })
    }
    //Sử dụng data lấy từ api xây dựng bảng
    buildDataTable(data) {
        try {
            let table = document.getElementById("tbEmployeeList");
            let bodyTable = table.lastElementChild;
            let thList = table.getElementsByTagName("th");
            for (const item of data) {
                let trElement = document.createElement("tr");
                trElement.classList.add("table__row");
                for (const col of thList) {
                    const type = col.getAttribute("type");
                    const modelName = col.getAttribute("model-name");
                    const value = item[modelName];
                    let tdElement = this.buildTd(type, value, item);
                    trElement.append(tdElement);
                }
                trElement.ondblclick = (e) => {
                    if (e.target.tagName.toLowerCase() != "input") {
                        this.displayEditEmployeeForm(item);
                    }
                }
                bodyTable.append(trElement);
            }
            this.addEventForDropList();
            let loading = document.querySelector(".loading");

            loading.classList.add("hidden");
        } catch (error) {
            console.log(error);
        }
    }
    //Tạo ô check box
    buildTdCheckbox() {
        let checkButton = document.createElement("input");
        checkButton.setAttribute("type", "checkbox");
        checkButton.setAttribute("name", "emp");
        let checkMark = document.createElement("span");
        checkMark.classList.add("checkmark");
        let checkItem = document.createElement("div");
        checkItem.classList.add("checkbox")
        checkItem.append(checkButton);
        checkItem.append(checkMark);
        let tdCheck = document.createElement("td");
        tdCheck.append(checkItem);
        tdCheck.addEventListener("click", this.addEventForTdCheck);
        return tdCheck;
    }
    //Tạo ô chức năng
    buildTdFunc(item) {
        let tdFunc = document.createElement("td");
        //tạo nút Sửa
        let btnEdit = document.createElement("input");
        btnEdit.classList.add("btn-link", "btn-edit");
        btnEdit.type = "button";
        btnEdit.value = "Sửa";
        //Tạo nút mở rộng
        let btndropdown = document.createElement("input");
        btndropdown.type = "button";
        btndropdown.classList.add("btn-arrow-down")
        tdFunc.append(btnEdit);
        tdFunc.append(btndropdown);

        btnEdit.onclick = () =>
            this.displayEditEmployeeForm(item);
        return tdFunc;
    }
    // Thêm sự kiện cho nút chức năng
    addEventForDropList() {
        let dropList = document.querySelector(".dropdownlist");

        document.addEventListener("click", (e) => {
            //Lấy phần tử được bấm
            let input = e.target;
            //Lấy phần tử dropdownlist đang được hiển thị
            let dropSelectedElement = document.querySelector(".border-drop-icon");
            //Lấy vị trí nút bấm
            let local = input.getBoundingClientRect();

            if (input.classList.contains("btn-arrow-down")) {
                //Kiểm tra đã hiển thị dropdownlist chưa
                if (!dropSelectedElement) {
                    // Nếu chưa hiển thị dropdown thì hiển thị
                    if (local.bottom < 600) {
                        dropList.style.top = local.bottom + "px";
                    } else {
                        dropList.style.top = local.top - 112 + "px";
                    }
                    //Thêm border cho nút đang chọn và hiển thị
                    input.classList.add("border-drop-icon");
                    dropList.classList.remove("hidden");

                } else if (dropSelectedElement == input) { //Nếu bấm vào nút đang chọn thì tắt droplist
                    dropSelectedElement.classList.remove("border-drop-icon");
                    dropList.classList.add("hidden")
                } else {
                    //Nếu đã có drop và người dùng bấm vào nút drop khác
                    //xóa border cũ thêm border cho nút mới
                    dropSelectedElement.classList.remove("border-drop-icon");
                    input.classList.add("border-drop-icon");
                    //Thay đổi vị trí droplist
                    if (local.bottom < 600) {
                        dropList.style.top = local.bottom + "px";
                    } else {
                        dropList.style.top = local.top - 112 + "px";
                    }
                }
            }
            else { //Nếu đang mở droplist bấm ra ngoài ẩn droplist
                do {
                    if (input == dropList) {
                        return;
                    }
                    input = input.parentNode;
                } while (input)
                if (!dropList.classList.contains("hidden")) {
                    dropSelectedElement.classList.remove("border-drop-icon");
                    dropList.classList.add("hidden")
                }
            }
        })
    }


    //Tạo thẻ ngày
    buildTdDate(value) {

        let date = new Date(value);
        //Lấy ra ngày
        let day = date.getDate().toString().padStart(2, '0');
        //Lấy ra tháng
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        //Lấy ra năm
        let year = date.getFullYear();
        //Tạo thẻ td
        let tdDate = document.createElement("td");
        //Gán dữ liệu đã định dạng
        tdDate.textContent = `${day}/${month}/${year}`;
        //Căn giữa cho ô ngày
        tdDate.classList.add("text-align--center");
        return tdDate;
    }
    buildTdMoney(value) {
        //Tạo thẻ td
        let tdMoney = document.createElement("td");
        if (value) {

            //Định dạng kiểu tiền tệ
            // let money = value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            //Gán dữ liệu đã định dạng
            tdMoney.textContent = value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            //Căn phải cho ô ngày
        }
        tdMoney.classList.add("text-align--right");
        return tdMoney;
    }
    buildTd(type, value, item) {
        switch (type) {
            case "checkbox":
                return this.buildTdCheckbox();
            case "date":
                return this.buildTdDate(value);
            case "money":
                return this.buildTdMoney(value);
            case "function":
                return this.buildTdFunc(item);
            default:
                {
                    let tdElement = document.createElement("td");
                    tdElement.textContent = value;
                    return tdElement;
                }
        }
    }
    addEventForTdCheck() {
        let checkAll = document.getElementById("ckbAllEmp");
        let checkboxes = document.getElementsByName("emp");
        //Kiểm tra khi click checkbox con
        checkboxes.forEach(function (el) {
            el.onclick = () => {
                el.closest("tr").classList.toggle("selected-row")
                let ischeckedAll = true;
                if (!el.checked) {
                    checkAll.checked = false;
                }
                else {
                    for (let checkbox of checkboxes) {
                        if (!checkbox.checked) {
                            ischeckedAll = false;
                            break;
                        }
                    }
                    if (ischeckedAll) {
                        checkAll.checked = true;
                    }
                }
            }
        })
    }
    displayEditEmployeeForm(item) {
        //Hiển thị form sửa
        let form = document.getElementById("formEmployeeDetail").style.display = "block";

        //Gán giá trị cho các ô nhập
        document.querySelector("#formEmployeeDetail .popup__title-text").textContent = "Sửa thông tin nhân viên";
        document.getElementById("txtEmployeeCode").value = item["EmployeeCode"];
        document.getElementById("txtEmployeeCode").disabled = true;
        document.getElementById("txtFullName").value = item["FullName"];
        document.getElementById("txtIdentityCard").value = item["IdentityNumber"];
        document.getElementById("txtPosition").value = item["PositionName"];
        document.getElementById("txtIssuePlace").value = item["IdentityPlace"];
        document.getElementById("txtAddress").value = item["Address"];
        document.getElementById("txtMobilePhone").value = item["PhoneNumber"];
        document.getElementById("txtEmail").value = item["Email"];
        document.getElementById("cbbDepartment").querySelector("input").value = item["DepartmentName"];
        document.getElementById("btnStoreAndAdd").value = "Cất và Sửa";
        // document.getElementById("txtLandlinePhone").value = item[""];
        // document.getElementById("txtBankAccount").value = item[""];
        // document.getElementById("txtBankName").value = item[""];
        // document.getElementById("txtBranch").value = item["PositionName"];
        if (item["Gender"]) {
            document.getElementsByName("gender")[(item["Gender"])].checked = true;
        }

        if (item["DateOfBirth"]) {
            //Gán giá trị ngày 
            let date = new Date(item["DateOfBirth"]);
            //Lấy ra ngày
            let day = date.getDate().toString().padStart(2, '0');
            //Lấy ra tháng
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            //Lấy ra năm
            let year = date.getFullYear();
            document.getElementById("dateOfBirth").value = year + '-' + month + '-' + day;
        }

        if (item["IdentityDate"]) {
            date = new Date(item["IdentityDate"]);
            //Lấy ra ngày
            day = date.getDate().toString().padStart(2, '0');
            //Lấy ra tháng
            month = (date.getMonth() + 1).toString().padStart(2, '0');
            //Lấy ra năm
            year = date.getFullYear();

            document.getElementById("dateOfIssue").value = year + '-' + month + '-' + day;
        }
    }
}
