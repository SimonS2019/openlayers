window.onload = init

  // Controls
  const fullScreenControl = new ol.control.FullScreen();
  const mousePositionControl = new ol.control.MousePosition();
  const overViewMapControl = new ol.control.OverviewMap({
    collapsed: false,
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()      
      })
    ]
  });
  const scaleLineControl = new ol.control.ScaleLine();
  const zoomSliderControl = new ol.control.ZoomSlider();
  const zoomToExtentControl = new ol.control.ZoomToExtent();


function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: [-12080385, 7567433],
            zoom: 3,
            maxZoom: 26,
            minZoom: 2,
            // rotation:0.5
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: "js-map",
        keyboardEventTarget: document,
        controls:ol.control.defaults().extend([
            fullScreenControl,
            mousePositionControl,
            overViewMapControl,
            scaleLineControl,
            zoomSliderControl,
            zoomToExtentControl
        ])
    })


    const popupContainerElement = document.getElementById('popup-coordinates');
    const popup = new ol.Overlay({
        element: popupContainerElement,
        positioning: 'top-right'
    })

    map.addOverlay(popup);

    map.on('click', function (e) {
        console.log(e)
        console.log(e.coordinate)
        console.log(e.Tn)
        const clickedCoordinate = e.coordinate;
        popup.setPosition(undefined);
        popup.setPosition(clickedCoordinate);
        popupContainerElement.innerHTML = clickedCoordinate;
    })

    // DragRotate Interaction
    const dragRotateInteraction = new ol.interaction.DragRotate({
        condition: ol.events.condition.altKeyOnly
    })
    map.addInteraction(dragRotateInteraction)

    const drawInteraction = new ol.interaction.Draw({
        type: 'Polygon',
        freehand: true
    })
    map.addInteraction(drawInteraction)
    drawInteraction.on('drawend', function (e) {
        console.log("Drawing finished");
        console.log(e);
        let parser = new ol.format.GeoJSON();
        let drawFeature = parser.writeFeaturesObject([e.feature])
        console.log(drawFeature);
        console.log(drawFeature.features[0].geometry.coordinates);
        console.log(drawFeature.features[0].geometry.coordinates);
    })

}

