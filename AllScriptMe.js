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
//Get Value Field On load page
function getValueindustryOwnership() {
    var ValueindustryOwnership = new Array();
    ValueindustryOwnership[0] = Xrm.Page.getAttribute("ownershipcode").getValue();
    ValueindustryOwnership[1] = Xrm.Page.getAttribute("industrycode").getValue();
    return ValueindustryOwnership
}

