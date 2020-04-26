function onSelectStore(ele){
    var form = $(ele).parent().parent();
    var label = $(form).find(".store_info");
    var select = $(form).find(".store_info_select");

    switch (ele.value) {
        case "ALDI":
            label.text("Location:");
            select.find('option').remove();
            select.append($("<option></option>")
                         .attr("value","")
                         .text("Choose Store Location"));
            selectValues = ['Fitchburg', 'Madison - Lien Road', 'Madison - Watts Road', 'Stoughton', 'Sun Prairie',];
            $.each(selectValues, function(index,value){
                select.append($("<option></option>")
                              .attr("value",value)
                              .text(value));
            });
            break;
            
        case "Costco":
            label.text("Location:");
            select.find('option').remove();
            select.append($("<option></option>")
                          .attr("value","")
                          .text("Choose Store Location"));
            selectValues = ['Middleton', 'Sun Prairie'];
            $.each(selectValues, function(index,value){
                select.append($("<option></option>")
                             .attr("value",value)
                             .text(value));
            });
            break;
        
        case "Festival Foods":
            label.text("Location:");
            select.find('option').remove();
            select.find('option').remove();
            select.append($("<option></option>")
                          .attr("value","")
                          .text("Choose Store Location"));
            selectValues = ['Madison', 'Verona'];
            $.each(selectValues, function(index,value){
                select.append($("<option></option>")
                             .attr("value",value)
                             .text(value));
            });
            break;
            
        case "Pick 'n Save":
            label.text("Location:");
            select.find('option').remove();
            select.find('option').remove();
            select.append($("<option></option>")
                          .attr("value","")
                          .text("Choose Store Location"));
            selectValues = ['DeForest', 'Fitchburg', 'Maple Grove', 'Madison - Park', 'Madison - Junction', 'Madison - Shopko Dr', 'McFarland', 'Middleton', 'Monona', 'Shorewood Hills', 'Stoughton', 'Sun Prairie - E Main', 'Sun Prairie - Ironwood'];
            $.each(selectValues, function(index,value){
                select.append($("<option></option>")
                             .attr("value",value)
                             .text(value));
            });
            break;    
        
        case "Piggly Wiggly Midwest":
            label.text("Location:");
            select.find('option').remove();
            select.find('option').remove();
            select.append($("<option></option>")
                          .attr("value","")
                          .text("Choose Store Location"));
            selectValues = ['Cambridge', 'Cottage Grove', 'Cross Plains', 'Waunakee'];
            $.each(selectValues, function(index,value){
                select.append($("<option></option>")
                             .attr("value",value)
                             .text(value));
            });
            break;
            
        case "Target":
            label.text("Location:");
            select.find('option').remove();
            select.find('option').remove();
            select.append($("<option></option>")
                          .attr("value","")
                          .text("Choose Store Location"));
            selectValues = ['Fitchburg', 'Madison - Lien Road', 'Madison - Hilldale Way', 'Madison - Junction Road', 'Sun Prairie'];
            $.each(selectValues, function(index,value){
                select.append($("<option></option>")
                             .attr("value",value)
                             .text(value));
            });
            break;
            
        case "Walmart":
            label.text("Location:");
            select.find('option').remove();
            select.find('option').remove();
            select.append($("<option></option>")
                          .attr("value","")
                          .text("Choose Store Location"));
            selectValues = ['Madison - Watts Road', 'Madison - Nakoose Trail', 'Monona', 'Stoughton', 'Sun Prairie'];
            $.each(selectValues, function(index,value){
                select.append($("<option></option>")
                             .attr("value",value)
                             .text(value));
            });
            break;
            
        case "Willy Street Co-op":
            label.text("Location:");
            select.find('option').remove();
            select.find('option').remove();
            select.append($("<option></option>")
                          .attr("value","")
                          .text("Choose Store Location"));
            selectValues = ['East', 'North', 'West'];
            $.each(selectValues, function(index,value){
                select.append($("<option></option>")
                             .attr("value",value)
                             .text(value));
            });
            break; 
            
        case "Woodman's Market":
            label.text("Location:");
            select.find('option').remove();
            select.find('option').remove();
            select.append($("<option></option>")
                          .attr("value","")
                          .text("Choose Store Location"));
            selectValues = ['Madison - Milwaukee Street', 'Madison - S Gammon Road', 'Sun Prairie'];
            $.each(selectValues, function(index,value){
                select.append($("<option></option>")
                             .attr("value",value)
                             .text(value));
            });
            break;
        
        case "Brennan's Market":
        case "Hy-Vee":
        case "Metro Market":
        case "Trader Joe's":
        case "Whole Foods Market":
        default:
            $(form).find(".store_info_div").css("visibility", "hidden");
            return;
    }
    $(form).find(".store_info_div").css("visibility", "visible");
}
function createReport(event) {
    event.preventDefault();

    var a = $("#create_report_form").serializeArray();
    a.push({ name: "tab_id", value: "0" });
    a.push({ name: "latitude", value: place.geometry.location.lat()});
    a.push({ name: "longitude", value: place.geometry.location.lng()});
    a = a.filter(function(item){return item.value != '';});
    $.ajax({
        url: 'HttpServlet',
        type: 'POST',
        data: a,
        success: function(reports) {
            mapInitialization(reports);
        },
        error: function(xhr, status, error) {
            alert("Status: " + status + "\nError: " + error);
        }
    });
    alert("The report is successfully submitted!");
    document.getElementById("create_report_form").reset();
    window.location.reload()
};

function queryReport(event) {
    event.preventDefault();

    var a = $("#query_report_form").serializeArray();
    a.push({ name: "tab_id", value: "1" });
    a = a.filter(function(item){return item.value != '';});
    $.ajax({
        url: 'HttpServlet',
        type: 'POST',
        data: a,
        success: function(reports) {
            mapInitialization(reports);
        },
        error: function(xhr, status, error) {
            alert("Status: " + status + "\nError: " + error);
        }
    });
}

$("#create_report_form").on("submit",createReport);
$("#query_report_form").on("submit",queryReport);