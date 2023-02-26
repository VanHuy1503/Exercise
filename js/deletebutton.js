
//thêm sự kiện cho nút xóa nhân viên
function addEventForDeleteButton() {
    //Lấy nút xóa
    let input = document.getElementById("btnDeleteEmployee")
    //Lấy hộp thoại xóa
    let deletePopup = document.querySelector(".delete-popup")

    //Tạo event onclick
    input.onclick = () => {
        //Tắt droplist
        document.querySelector(".dropdownlist").classList.add("hidden")
        document.querySelector(".border-drop-icon").classList.remove("border-drop-icon");
        //Hiển thị hộp thoại
        deletePopup.classList.remove("hidden")
    }

    //Thêm sự kiện cho delete popup
    //Thêm sự kiện tắt
    document.getElementById("btnCloseDelete").onclick = () => { deletePopup.classList.add("hidden") }
    document.getElementById("btnCancelDelete").onclick = () => { deletePopup.classList.add("hidden") }
    document.getElementById("btnDeleteConfirm").onclick = () => { deletePopup.classList.add("hidden") }
}

export default addEventForDeleteButton