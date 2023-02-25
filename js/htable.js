class Table {
    Data;
    constructor() {
        this.buildTableElement();
        //
    }

    buildTableElement() {
        //1. Lấy tất cả các thẻ có tên htable;
        let tables = document.getElementsByTagName("htable");

        //2. Duyệt từng thẻ và thực hiện build table trương ứng
        for (const table of tables) {
            // -->Lấy ra id
            const tableId = table.id;
            // -->Lấy ra class
            const classList = table.getAttribute("class")

            let tableHTMLTemplate = `<table id="${table.id}" class="${classList || ""}"> 
                <thead></thead>
                <tbody></tbody>
            </table>`
        }
        //2.1 Build template html của table
        //2.2 Bổ sung các class, id nếu có
        //2.3 Tạo Element cho table
        //2.4 Tạo dòng tiêu đề
        //2.5 Tạo các dòng dữ liệu
        //2.6 Thay thế table cũ bằng table mới


    }

    loadData() {

    }
}

export default Table;