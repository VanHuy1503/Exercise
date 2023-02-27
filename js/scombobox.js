window.onload = function () {
    new Combobox();
};

class Combobox {
    Departments;
    constructor() {
        this.buildComboboxElement();
    }
    async buildComboboxElement() {
        // Lấy tất cả element scombobox
        let comboboxes = document.querySelectorAll("scombobox");

        // Build cho từng thẻ
        for (const combobox of comboboxes) {
            // Load dữ liệu theo thuộc tính api
            const api = combobox.getAttribute("api");
            this.Departments = await this.loadData(api);
            // Lấy ra id và class của phần tử 
            const comboboxId = combobox.id;
            const comboboxClass = combobox.classList;
            //Lấy title nếu có
            const comboboxPlaceholder = combobox.getAttribute("placeholder");

            // Build Combobox
            let comboboxHTMLTemplate = `<label for="cbbDepartment"></label>
                                        <div class="combobox">
                                            <input class="combobox__select" value="" />
                                            <ul class="options hidden">
                                            </ul>
                                            <div class="combobox__btn">
                                                <img src="/assets/img/arrow_icon.png" />
                                            </div>
                                        </div>`
            // Tạo element cho combobox:
            let comboboxElementNew = document.createElement("div");
            // Thêm id và class nếu có
            comboboxElementNew.id = comboboxId;
            comboboxElementNew.setAttribute("class", comboboxClass);
            comboboxElementNew.innerHTML = comboboxHTMLTemplate;
            // Lấy element chứa các option, ô input, nút mũi tên
            const optionsElement = comboboxElementNew.querySelector(".options");
            const inputSelected = comboboxElementNew.querySelector("input");
            const comboboxButton = comboboxElementNew.querySelector(".combobox__btn");
            // Set placeholder nếu có
            if (combobox.getAttribute("placeholder")) {
                inputSelected.setAttribute("placeholder", combobox.getAttribute("placeholder"))
            }
            // Tạo các option cho combobox
            this.buildOptionElement(optionsElement, inputSelected, "");

            // Thêm các sự kiện cần thiết
            // sự kiện click vào nút mũi tên 
            comboboxButton.onclick = () => {
                optionsElement.classList.toggle("hidden");
            }
            // sự kiện focus cho thẻ input
            inputSelected.onfocus = () => {
                optionsElement.classList.remove("hidden");
            }
            // inputSelected.onblur = () => {
            //     optionsElement.classList.add("hidden");
            // }

            // Thêm search()
            inputSelected.oninput = () => {
                this.buildOptionElement(optionsElement, inputSelected, inputSelected.value)
            }

            combobox.replaceWith(comboboxElementNew);
        }
    }

    // Thêm option cho combobox
    buildOptionElement(optionsElement, inputSelected, searchtext) {
        try {
            optionsElement.textContent = ""
            for (const item of this.Departments) {

                if (item["DepartmentName"].toLowerCase().includes(searchtext.toLowerCase())) {
                    let optionForCombobox = document.createElement("li");
                    optionForCombobox.classList.add("option");
                    optionForCombobox.textContent = item["DepartmentName"];
                    optionForCombobox.onclick = () => {
                        inputSelected.value = item["DepartmentName"];
                        optionsElement.classList.add("hidden");
                    }
                    optionsElement.append(optionForCombobox);
                }
            }
        } catch (error) {

        }

    }

    async loadData(api) {
        // Gọi api thực hiện load dữ liệu:
        var res = await fetch(api);
        var resJson = await res.json();
        return resJson;
    }
}

export default Combobox;