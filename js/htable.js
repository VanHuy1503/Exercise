class Table {
    Data;
    constructor() {
        this.buildTableElement();
    }
    async buildTableElement() {

        // 1. Lấy tất cả các thẻ có tên là mtable;
        let tables = document.querySelectorAll("mtable");

        // 2. Duyệt từng thẻ và thực hiện build table tương ứng:
        for (const table of tables) {
            console.log("table name:", tables);
            const api = table.getAttribute("api");
            this.Data = await this.loadData(api);
            // --> Lấy ra id: 


            const tableId = table.id;
            const classList = table.getAttribute("class");
            // --> lấy ra class
            // 2.1 Build template html của table
            let tableHTMLTemplate = `<table id="${table.id}" class="${classList || ""}">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>`;
            // 2.2 Bổ sung các class, id nếu có:

            // 2.3 Tạo element cho table:
            let tableElementNEW = document.createElement("div");
            tableElementNEW.innerHTML = tableHTMLTemplate;

            // 2.4 Tạo dòng tiêu đề cho table:
            let theadElement = this.buildTheaderElement(table, tableElementNEW);

            // 2.5 Tạo các dòng dữ liệu cho table:
            let tBodyElement = this.buildTrDataElements(table, tableElementNEW);

            // 2.6 Thay thế table cũ bằng table mới tạo bằng js
            table.replaceWith(tableElementNEW);
        }

    }


    buildTheaderElement(mtable, tableElementNEW) {
        // Lấy ra các cột của mtable:
        let cols = mtable.children;
        // Duyệt từng cột và đọc các thuộc tính để lấy ra tiêu đề cột, kiểu dữ liệu tương ứng...
        let trForTheadElement = document.createElement("tr");
        for (const col of cols) {
            const label = col.getAttribute("label");
            const type = col.getAttribute("type");
            const modelName = col.getAttribute("model-name");
            const width = col.getAttribute("width");
            let thElement = document.createElement("th");
            if (width) {
                thElement.style.width = width;
            }
            let thClass = "";
            switch (type) {
                case "checkbox":
                    thClass = "text-align--left";
                    break;
                case "date":
                    thClass = "text-align--center";
                    break;
                case "money":
                    thClass = "text-align--right";
                    break;
                default:
                    thClass = "text-align--left";
                    break;
            }
            thElement.classList.add(thClass);
            thElement.textContent = label;
            console.log(thElement);
            // Đẩy vào tr của thead:
            trForTheadElement.append(thElement);
        }
        tableElementNEW.querySelector("thead").append(trForTheadElement);
        console.log("table", tableElementNEW);
        console.log("tr", trForTheadElement);
        // Tạo Thead:
    }
    buildTrDataElements(mtable, tableElementNEW) {
        // Lấy ra các cột của mtable:
        let cols = mtable.children;
        // Duyệt từng cột và đọc các thuộc tính để lấy ra tiêu đề cột, kiểu dữ liệu tương ứng...

        //Lấy dữ liệu:
        // Duyệt từng đối tượng để build ra tr tương ứng:
        for (const item of this.Data) {
            let trForTBodyElement = document.createElement("tr");
            for (const col of cols) {
                const type = col.getAttribute("type");
                const modelName = col.getAttribute("model-name");
                let tdElement = document.createElement("td");
                // Lấy ra value tương ứng với đối tượng:
                let value = item[modelName];
                let tdClass = "";
                switch (type) {
                    case "checkbox":
                        tdClass = "text-align--left";
                        break;
                    case "date":
                        tdClass = "text-align--center";
                        // format dữ liệu:
                        break;
                    case "money":
                        tdClass = "text-align--right";
                        break;
                    default:
                        tdClass = "text-align--left";
                        break;
                }
                tdElement.classList.add(tdClass);
                tdElement.textContent = value;
                // Đẩy vào tr của thead:
                trForTBodyElement.append(tdElement);
            }
            tableElementNEW.querySelector("tbody").append(trForTBodyElement);
            // Tạo Thead:
        }
        console.log("table", tableElementNEW);
    }
    async loadData(api) {
        // Gọi api thực hiện load dữ liệu:
        var res = await fetch(api);
        var resJson = await res.json();
        return resJson;
    }

}
export default Table;