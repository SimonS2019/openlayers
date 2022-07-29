window.onload = init;

function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: [0, 0],
            zoom: 3,
            //   extent: [12400753.576694038, -5658730.000549673, 17174426.336716905, -980228.5067132516]
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
                zIndex: 1,
                visible: true,
                // extent: [12400753.576694038, -5658730.000549673, 17174426.336716905, -980228.5067132516],
                opacity: 0
            })
        ],
        target: 'js-map'
    })

    // Layer Group
    const layerGroup = new ol.layer.Group({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM({
                    url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                }),
                zIndex: 0,
                visible: false,
                // extent: [12400753.576694038, -5658730.000549673, 17174426.336716905, -980228.5067132516],
                opacity: 0.1
            }),
            // Bing Maps Basemap Layer
            new ol.layer.Tile({
                source: new ol.source.BingMaps({
                    key: "ApCcDdfIxIvrSnQTur3RCvLaipL8gUj63Tvu5CdE4tZe-9g9hn2kn-7pnIea1Jow",
                    // imagerySet: 'Aerial'  // Road, CanvasDark, CanvasGray
                    imagerySet: 'AerialWithLabels'  // Road, CanvasDark, CanvasGray
                    // imagerySet: 'Road'  // Road, CanvasDark, CanvasGray
                    // imagerySet: 'CanvasDark'  // Road, CanvasDark, CanvasGray
                    //   imagerySet: 'CanvasGray'  // Road, CanvasDark, CanvasGray
                }),
                visible: false
                // visible: true
            })
        ]
    })
    map.addLayer(layerGroup);

    // CartoDB BaseMap Layer
    const cartoDBBaseLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            // url: 'http://{1-4}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
            //   url: 'http://{1-4}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png',
            url: 'http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
            attributions: '© CARTO'
        }),
        visible: false
        // visible: true
    })
    map.addLayer(cartoDBBaseLayer);

    // TileDebug
    const tileDebugLayer = new ol.layer.Tile({
        source: new ol.source.TileDebug(),
        // visible: true
        visible: false
    })
    map.addLayer(tileDebugLayer);


    // Stamen basemap layer
    const stamenBaseLayer = new ol.layer.Tile({
        source: new ol.source.Stamen({
            //   layer: 'terrain-labels',
            layer: 'terrain',
            //   layer: 'watercolor',
            attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
        visible: false
    })
    map.addLayer(stamenBaseLayer);

    const stamenBaseMapLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            //   url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
            url: 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
            attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
        visible: false
    })

    map.addLayer(stamenBaseMapLayer);

    // Print out mouse click coordinates
    map.on('click', function (e) {
        console.log(e.coordinate);
    })

    // tile ArcGIS REST API Layer
    const tileArcGISLayer = new ol.layer.Tile({
        source: new ol.source.TileArcGISRest({
            // url: ""
            url: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer"
            // url: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Louisville/LOJIC_LandRecords_Louisville/MapServer"
        }),
        visible: true
    })
    map.addLayer(tileArcGISLayer);
}

