require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/widgets/Locate",
    "esri/widgets/Directions"
], function (Map, MapView, FeatureLayer, SimpleMarkerSymbol, Locate, Directions) {

    var map = new Map({
        basemap: "streets-navigation-vector",

    });

    var view = new MapView({
        container: "map-canvas",   //was "viewdiv"
        map: map,
        center: [-89.418782, 43.062652],
        zoom: 11
    });

    var locateBtn = new Locate({
        view: view
    });

    // Add the locate widget to the top left corner of the view
    view.ui.add(locateBtn, {
        position: "top-left"
    });


    var renderer = {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-marker",  // autocasts as new SimpleFillSymbol()
            color: [255, 128, 0, 0.5],
            outline: {  // autocasts as new SimpleLineSymbol()
                width: 1,
                color: "black"
            }
        }
    };

    // Symbol for High Availability
    const highSym = {
        type: "picture-marker", // autocasts as new SimpleLineSymbol()
        url: "https://tscggis.maps.arcgis.com/sharing/rest/content/items/3c106fa7b91645c683d8e85d8dd97ba6/data",
        width: "32px",
        height: "32px"
    };

    // Symbol for Low Availability
    const lowSym = {
        type: "picture-marker", // autocasts as new SimpleLineSymbol()
        url: "https://tscggis.maps.arcgis.com/sharing/rest/content/items/8b2ed25bae6d4d61b86bc94128b1823d/data",
        width: "32px",
        height: "32px"
    };

    // Symbol for Other
    const noSym = {
        type: "picture-marker", // autocasts as new SimpleLineSymbol()
        url: "https://tscggis.maps.arcgis.com/sharing/rest/content/items/6ecd168ed6794bac9a133eb27d4f7cd8/data",
        width: "32px",
        height: "32px"
    };

    // Symbol for Other
    const otherSym = {
        type: "simple-marker", // autocasts as new SimpleLineSymbol()
        color: "#000000",
        outline: {  // autocasts as new SimpleLineSymbol()
            width: 1,
            color: "black"
        }
    };

    const pointRenderer = {
        type: "unique-value",  //autocasts as new UniqueValueRenderer()
        field: 'dairy',
        defaultSymbol: otherSym,

        uniqueValueInfos: [
            {
                value: "high",
                symbol: highSym,
                label: "High Availability"
            },
            {
                value: "low",
                symbol: lowSym,
                label: "Low Availability"
            },
            {
                value: "no",
                symbol: noSym,
                label: "No Availability"
            }
        ]
    };

    //Trailheads feature layer(points)
    var featureLayer = new FeatureLayer({
        url: "https://services1.arcgis.com/JPUKRee8mEBfJ0K4/arcgis/rest/services/SafeGraph_POI_Data/FeatureServer",
        renderer: pointRenderer,
        outFields: ["*"],  //Return all fields so it can be queried client side
        popupTemplate: {
            title: "{StoreName}",
            content: [
                {
                    // You can also set a descriptive text element. This element
                    // uses an attribute from the featurelayer which displays a
                    // sentence giving the total amount of trees value within a
                    // specified census block. Text elements can only be set within the content.
                    type: "text", // TextContentElement
                    text:
                        "This store is located at {Address} and is open {StoreHours}.  Please call ahead to verify availabiltiy - {PhoneNumber}."
                },
                {
                    type: "fields",
                    fieldInfos: [

                        {
                            fieldName: "dairy",
                            label: "Dairy "
                        },
                        {
                            fieldName: "bread",
                            label: "Bread & Grains ",
                        },
                        {
                            fieldName: "produce",
                            label: "Fresh Produce ",
                        },
                        {
                            fieldName: "meat",
                            label: "Meat & Seafood ",
                        },
                        {
                            fieldName: "water",
                            label: "Bottled Water ",
                        },
                        {
                            fieldName: "paper",
                            label: "Paper Products ",
                        },
                        {
                            fieldName: "cleaning",
                            label: "Cleaning Products ",
                        }
                    ]
                }
            ]
        }
    });
    map.add(featureLayer);

    var sqlExpressions = ["dairy = 'high'", "dairy = 'low'", "dairy = 'no'", "meat", "water", "paper", "cleaning"];

    var selectFilter = document.createElement("select");
    selectFilter.setAttribute("class", "esri-widget esri-select");
    selectFilter.setAttribute("style", "width: 275px; font-family: Avenir Next W00; font-size: 1em;");

    sqlExpressions.forEach(function (sql) {
        var option = document.createElement("option");
        option.value = sql;
        option.innerHTML = sql;
        selectFilter.appendChild(option);
    });

    view.ui.add(selectFilter, "top-left");

    function setFeatureLayerViewFilter(expression) {
        view.whenLayerView(featureLayer).then(function (featureLayerView) {
            featureLayerView.filter = {
                where: expression
            };
        });
    }

    selectFilter.addEventListener('change', function (event) {
        // setFeatureLayerFilter(event.target.value);
        setFeatureLayerViewFilter(event.target.value);
    });

    var directionsWidget = new Directions({
        view: view,
        // Point the URL to a valid route service that uses an
        // ArcGIS Online hosted service proxy instead of the default service
        // I've set this up using my developers.arcgis.com account with a proxy that limits to 10 routes a minute.
        routeServiceUrl:
            "https://utility.arcgis.com/usrsvcs/appservices/VX4GBDaBBt9P70gs/rest/services/World/Route/NAServer/Route_World"
    });

    // Add the Directions widget to the top right corner of the view
    view.ui.add(directionsWidget, {
        position: "bottom-right"
    });

});