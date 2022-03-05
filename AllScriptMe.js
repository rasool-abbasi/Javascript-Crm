//Visibe and Unvisible Start time & End time With Value Special Feild (Type is Option Set)
function demoFunction() {
    const items = getFieldListFromTab(0);
    if (Xrm.Page.getAttribute("new_type").getValue() == "100000000") {
        items.forEach(function (item) {
            if (item == 'new_start_time_vacations' || item == 'new_end_time_vacations') {
                Xrm.Page.getAttribute(item).setRequiredLevel("required");
                Xrm.Page.getControl(item).setVisible(true);
            }
            if (item == 'new_enddate' || item == 'new_start_date') {
                Xrm.Page.getAttribute(item).setValue();
                Xrm.Page.getAttribute(item).setRequiredLevel("none");
                Xrm.Page.getControl(item).setVisible(false);
            }
            if (item = 'new_date_vacation_orginal')
                Xrm.Page.getControl(item).setVisible(false);
            if (item = 'new_time_vacations')
                Xrm.Page.getControl(item).setVisible(true);
        })
    }
    else if (Xrm.Page.getAttribute("new_type").getValue() == "100000001") {
        items.forEach(function (item) {
            if (item == 'new_enddate' || item == 'new_start_date') {
                Xrm.Page.getAttribute(item).setRequiredLevel("required");
                Xrm.Page.getControl(item).setVisible(true);
            }
            if (item == 'new_start_time_vacations' || item == 'new_end_time_vacations') {
                Xrm.Page.getAttribute(item).setValue();
                Xrm.Page.getAttribute(item).setRequiredLevel("none");
                Xrm.Page.getControl(item).setVisible(false);
            }
            if (item = 'new_time_vacations')
                Xrm.Page.getControl(item).setVisible(false);
            if (item = 'new_date_vacation_orginal')
                Xrm.Page.getControl(item).setVisible(true);
        })
    }
}
// Get Value Field of Other Entity
function RetrieveYDetails() {
    var yId = Xrm.Page.getAttribute('ownerid').getValue()[0].id;
    yId = yId.replace('{', '');
    yId = yId.replace('}', '');
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.0/systemusers(" + yId + ")?$select=fullname,mobilephone", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                var fullname = result["fullname"];
                var mobilephone = result["mobilephone"];
                Xrm.Page.getAttribute("new_name").setValue(result["mobilephone"]);
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
}
//Lock All Feild in Entity
function ConfirmEvent() {
    const items = getFieldListFromTab(0);
    if (Xrm.Page.getAttribute("new_confirm").getValue() == "100000000" || Xrm.Page.getAttribute("new_confirm").getValue() == "100000001") {
        items.forEach(function (item) {
            if (item != 'new_confirm')
                Xrm.Page.getControl(item).setDisabled(true);
        })
    }
    else {
        items.forEach(function (item) {
            if (item != 'new_confirm')
                Xrm.Page.getControl(item).setDisabled(false);
        })
    }
}
//Get All Name Of Field On Load Page
function getFieldListFromTab(tabId) {
    var fieldList = new Array();
    var tab = Xrm.Page.ui.tabs.get(tabId);
    tab.sections.forEach(function (section, sectionIndex) {
        section.controls.forEach(function (control, controlIndex) {
            var attribute = control.getAttribute();
            if (attribute != null) {
                fieldList.push(attribute.getName());
            }
        });
    });
    return fieldList;
}
//Select Option in Filed With Change Value Other Field
function HideIndustry() {
    var ValueindustryOwnership = getValueindustryOwnership();
    var industry = loadIndustry();
    if (ValueindustryOwnership[0] != null) {
        Xrm.Page.getControl("industrycode").setDisabled(false);
        switch (ValueindustryOwnership[0]) {
            case (1):
                Xrm.Page.getControl("industrycode").clearOptions();
                for (let i = 1; i < 11; i++) {
                    Xrm.Page.getControl("industrycode").addOption({ value: i, text: industry[i - 1] });
                }
                if (ValueindustryOwnership[1] < 11) {
                    Xrm.Page.getAttribute("industrycode").setValue(ValueindustryOwnership[1])
                }
                break;
            case (2):
                Xrm.Page.getControl("industrycode").clearOptions();
                for (let i = 11; i < 16; i++) {
                    Xrm.Page.getControl("industrycode").addOption({ value: i, text: industry[i - 1] });
                }
                if (ValueindustryOwnership[1] < 16 && ValueindustryOwnership[1] > 10) {
                    Xrm.Page.getAttribute("industrycode").setValue(ValueindustryOwnership[1])
                }
                break;
            case (3):
                Xrm.Page.getControl("industrycode").clearOptions();
                for (let i = 26; i < 31; i++) {
                    Xrm.Page.getControl("industrycode").addOption({ value: i, text: industry[i - 1] });
                }
                if (ValueindustryOwnership[1] < 30 && ValueindustryOwnership[1] > 25) {
                    Xrm.Page.getAttribute("industrycode").setValue(ValueindustryOwnership[1])
                }
                break;
            case (4):
                Xrm.Page.getControl("industrycode").clearOptions();
                for (let i = 31; i < 34; i++) {
                    Xrm.Page.getControl("industrycode").addOption({ value: i, text: industry[i - 1] });
                }
                if (ValueindustryOwnership[1] < 34 && ValueindustryOwnership[1] > 30) {
                    Xrm.Page.getAttribute("industrycode").setValue(ValueindustryOwnership[1])
                }
                break;
        }
    }
    else {
        Xrm.Page.getAttribute("industrycode").setValue(null)
        Xrm.Page.getControl("industrycode").setDisabled(true);
    }
}
//Get All Value Option Set industrycode On Load Page
function loadIndustry() {
    var industry = new Array();
    for (let i = 0; i < 34; i++) {
        industry.push(Xrm.Page.getAttribute("industrycode").getOptions()[i].text);
    }
    return industry
}
//Check Two OptionSet With Two dimensional
function HideIndustry(part) {
    var SelectOwnership = getValueindustryOwnership();
    var industry = loadIndustry(part);
    for (let j = 0; j < industry.length; j++) {
        if (industry[j][0] == SelectOwnership[0]) {
            var indexOption = industry[j][1];
            Xrm.Page.getControl("industrycode").clearOptions();
            for (let i = 0; i < indexOption.length; i++) {
                Xrm.Page.getControl("industrycode").addOption({ value: i + 1, text: indexOption[i] });
            }
            var Selected = Xrm.Page.getAttribute("industrycode").getValue(indexOption[i]);
            Xrm.Page.getAttribute("industrycode").setValue(Selected);
        }
    }
}
//Read All Text On Load and Push in Two dimensional
function loadIndustry(part) {
    var AllOption = part;
    var ArrayAllOption = new Array();
    ArrayAllOption = AllOption.split(";");
    var industryArray = new Array();
    var splitted = new Array();
    var splittedItems = new Array();
    for (let i = 0; i < ArrayAllOption.length; i++) {
        var splitted = ArrayAllOption[i].split("|");
        splittedFirst = splitted[0];
        splittedItems = splitted[1].split('.');
        industryArray.push([splittedFirst, splittedItems])
    }
    return industryArray
}

//Get Value Field On load page
function getValueindustryOwnership() {
    var ValueindustryOwnership = new Array();
    ValueindustryOwnership[0] = Xrm.Page.getAttribute("ownershipcode").getText();
    ValueindustryOwnership[1] = Xrm.Page.getAttribute("industrycode").getText();
    return ValueindustryOwnership
}

//Work With Multi Select
function TypeChange() {
    if (Xrm.Page.getAttribute("new_platformnamemulti").getValue() == "100000003"
        || Xrm.Page.getAttribute("new_platformnamemulti").getValue() == "100000004"
        || Xrm.Page.getAttribute("new_platformnamemulti").getValue() == "100000003,100000004")
        Xrm.Page.getAttribute("new_typechange").setValue(100000000);
    else
        Xrm.Page.getAttribute("new_typechange").setValue();
}
//Work With Multi Select
function RequiredVersionNumber() {
    if (Xrm.Page.getAttribute("new_platformnamemulti").getValue() == "100000003")
        Xrm.Page.getAttribute("new_versionnumber").setRequiredLevel("none");
    else
        Xrm.Page.getAttribute("new_versionnumber").setRequiredLevel("required");

}
//logic IBAN Static
function CalculateSheba() {
    Xrm.Page.ui.clearFormNotification("warning");
    Xrm.Page.getAttribute("new_phone").setValue();
    var sheba = Xrm.Page.getAttribute("new_sheba").getValue();
    var alarm;
    if (sheba.length < 24)
        alert('تعداد ارقام نمیتواند کمتر از 24 رقم باشد');
    else {
        var bankId = sheba.substring(3, 5);
        switch (bankId) {
            case ("55"):
                var alarm = "بانک اقتصاد نوین";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("54"):
                alarm = "بانک پارسیان";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("57"):
                alarm = "بانک پاسارگاد";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("21"):
                alarm = "پست بانک ایران";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("18"):
                alarm = "بانک تجارت";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("51"):
                alarm = "موسسه اعتباری توسعه";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("20"):
                alarm = "بانک توسعه صادرات";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("13"):
                alarm = "بانک رفاه";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("56"):
                alarm = "بانک سامان";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("15"):
                alarm = "بانک سپه";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("58"):
                alarm = "بانک سرمایه";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("19"):
                alarm = "بانک صادرات ایران";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("11"):
                alarm = "بانک صنعت و معدن";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("53"):
                alarm = "بانک کارآفرین";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("16"):
                alarm = "بانک کشاورزی";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("10"):
                alarm = "بانک مرکزی جمهوری اسلامی ایران";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("14"):
                alarm = "بانک مسکن";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("12"):
                alarm = "بانک ملت";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("17"):
                alarm = "بانک ملی ایران";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            case ("70"):
                alarm = "بانک رسالت";
                Xrm.Page.getAttribute("new_phone").setValue(alarm);
                break;
            default:
                Xrm.Page.getAttribute("new_phone").setValue("بانک مورد نظر یافت نشد");
        }
        if (alarm != null) {
            Xrm.Page.ui.setFormNotification("صرفا نام " + alarm + " می باشد و این به منزله درست بودن شماره شبا نمی باشد.", "هشدار", "warning");
        }
    }
}
//logic IBAN Dynamic
function DynamiceCalculateSheba(textSheba, Sheba) {
    Xrm.Page.ui.clearFormNotification("warning");
    Xrm.Page.getAttribute(textSheba).setValue();
    var sheba = Xrm.Page.getAttribute(Sheba).getValue();   
    var model = "";
    var bankName;
    var illegalBank;
    var AllBankinfo = new Array();
    var bankInfo = new Array();
    var splittedFirst = new Array();
    var splittedSecond = new Array();
    var splittedThird = new Array();
    var part = "بانک اقتصاد نوین|55|1;بانک پارسیان|54|1;بانک پاسارگاد|57|1;پست بانک ایران|21|1;بانک تجارت|18|1;موسسه اعتباری توسعه|51|1;بانک توسعه صادرات|20|1;بانک رفاه|13|1;بانک سامان|56|1;بانک سپه|15|1;بانک سرمایه|58|1;بانک صادرات ایران|19|1;بانک صنعت و معدن|11|1;بانک کارآفرین|53|1;بانک کشاورزی|16|1;بانک مرکزی جمهوری اسلامی ایران|10|1;بانک مسکن|14|1;بانک ملت|12|1;بانک ملی ایران|17|1;بانک رسالت|70|1;بانک توسعه تعاون|22|1;بانک سینا|59|1;بانک آینده|62|1;بانک شهر|61|1;بانک دی|66|1;بانک ایران زمین|69|1;بانک گردشگری|64|1;بانک انصار|63|0;بانک حکمت ایرانیان|65|0;قرض الحسنه مهر ایران|60|1;بانک قوامین|52|0;بانک خاورمیانه|78|1;موسسه اعتباری کوثر|73|0;موسسه اعتباری نور|80|1;موسسه اعتباری ملل|75|1;ایران ونزوئلا|95|1;بانک مهر اقتصاد|79|0";
    AllBankinfo = part.split(";");
    for (let i = 0; i < AllBankinfo.length; i++) {
        var splitted = AllBankinfo[i].split("|")
        splittedFirst = splitted[0];
        splittedSecond = splitted[1];
        splittedThird = splitted[2];
        bankInfo.push([splittedFirst, splittedSecond, splittedThird]);
    }
    if (sheba != null) {
        sheba = sheba.replace(/-/g, '');
        var twoNumber = sheba.substring(0, 2);
        var treeofall = sheba.substring(2);
        var newSheba = BigInt(treeofall.concat("1827", twoNumber));
        var Result = newSheba % 97n;
        if (sheba.length < 24)
            Xrm.Page.ui.setFormNotification('تعداد ارقام نمی تواند کمتر از 24 رقم باشد', "WARNING", "warning");
        else if (sheba.length > 24) {
            Xrm.Page.ui.setFormNotification('تعداد ارقام نمی تواند بیش از 24 رقم باشد', "WARNING", "warning");
        }
        else {
            var bankId = sheba.substring(3, 5);
            for (let j = 0; j < bankInfo.length; j++) {
                if (bankInfo[j][1] == bankId) {
                    bankName = bankInfo[j][0];
                    illegalBank = bankInfo[j][2];
                    Xrm.Page.getAttribute(textSheba).setValue(bankName);
                }
            }
            if (Result == 1) {
                if (bankName != null && illegalBank != 0)
                    Xrm.Page.ui.setFormNotification("متعلق به  " + bankName + " است و شبای وارد شده صحیح می باشد", "INFO", "warning");
                else if (bankName != null) {
                    Xrm.Page.ui.setFormNotification("با توجه به اینکه  " + bankName + " قابلیت پرداخت ندارد لطفا مجدد شبا اخذ گردد", "ERROR", "warning");
                    Xrm.Page.getAttribute(textSheba).setValue();
                }
                else {
                    Xrm.Page.ui.setFormNotification("نام بانک در لیست بانک ها تعریف نشده ولی شبای وارد شده صحیح می باشد", "INFO", "warning");
                    Xrm.Page.getAttribute(textSheba).setValue("تعریف نشده");
                }
            }
            else {
                Xrm.Page.ui.setFormNotification("شبای وارد شده نادرست است لطفا مجددا شبا اخذ شود", "ERROR", "warning");
                Xrm.Page.getAttribute(textSheba).setValue();
            }
            model = model.concat(sheba.substring(0, 2), "-", sheba.substring(2, 5), "-", sheba.substring(5, 12), "-", sheba.substring(12, 16), "-", sheba.substring(16, 20), "-", sheba.substring(20, 24));
            Xrm.Page.getAttribute(Sheba).setValue(model);
        }
    }
}

//Check The is Valid Iraian Natinal Code(Orginal)
function isValidIranianNationalCode(input) {
    if (!/^\d{10}$/.test(input)) return false;
    const check = +input[9];
    const sum = input.split('').slice(0, 9).reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return sum < 2 ? check === sum : check + sum === 11;
}
//Check The is Valid Iraian Natinal Code(Customic)
function isValidIranianNationalCode(input) {
    var codemeli = Xrm.Page.getAttribute(input).getValue();
    if (!/^\d{10}$/.test(codemeli))
        alert("ورود کاراکتر غیرعددی درست نمی باشد ");
    else {
        if (codemeli != null) {
            const check = +codemeli[9];
            const sum = codemeli.split('').slice(0, 9).reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
            if (sum < 2 ? check === sum : check + sum === 11)
                alert("شماره ملی صحیح می باشد");
            else
                alert("شماره ملی صحیح نمی باشد");
        }
    }

}