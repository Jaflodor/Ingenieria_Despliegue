define(["dojo/_base/lang", "dojo/ready", "dojo/parser", "dojo/_base/array", 'dojo/_base/declare', 'jimu/BaseWidget', "dojo/dom", "dojo/on", "esri/layers/FeatureLayer", "esri/tasks/GeometryService", "esri/dijit/editing/Editor", "esri/dijit/editing/TemplatePicker", "dijit/layout/BorderContainer", "dijit/layout/ContentPane"], function (lang, ready, parser, array, declare, BaseWidget, dom, on, FeatureLayer, GeometryService, Editor, TemplatePicker, BorderContainer, ContentPane) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {

        // Custom widget code goes here

        baseClass: 'widget-edicion',
        // this property is set by the framework when widget is loaded.
        // name: 'Widget_Edicion',
        // add additional properties here

        //methods to communication with app container:
        postCreate: function postCreate() {
            this.inherited(arguments);
            mapa = this.map;
            console.log(mapa);
        },

        startup: function startup() {
            this.inherited(arguments);

            // Declaramos las variables que contienen las capas a cargar en el mapa:

            var capaCentrales,
                capaCableado,
                capaEmpalmes,
                capaConductos,
                capaDepositos,
                capaCentrales = new FeatureLayer("https://localhost:6443/arcgis/rest/services/Proyecto/ServicioCableado/FeatureServer/3", {
                outFields: ['*']
            });
            capaCableado = new FeatureLayer("https://localhost:6443/arcgis/rest/services/Proyecto/ServicioCableado/FeatureServer/4", {
                outFields: ['*']
            });
            capaEmpalmes = new FeatureLayer("https://localhost:6443/arcgis/rest/services/Proyecto/ServicioCableado/FeatureServer/0", {
                outFields: ['*']
            });

            capaConductos = new FeatureLayer("https://localhost:6443/arcgis/rest/services/Proyecto/ServicioCableado/FeatureServer/5", {
                outFields: ['*']
            });

            capaDepositos = new FeatureLayer("https://localhost:6443/arcgis/rest/services/Proyecto/ServicioCableado/FeatureServer/1", {
                outFields: ['*']
            });

            // Añadimos las capas al mapa:
            mapa.addLayers([capaConductos, capaCableado, capaDepositos, capaEmpalmes, capaCentrales]);
        },

        onOpen: function onOpen() {
            ready(function () {

                // Lanzamos el evento que lanza la función cuando las capas se añadan al mapa permita editas dichas Feature Layer:
                mapa.on("layers-add-result", initEditor);

                ;

                function initEditor(results) {

                    var layerInfosWildfire = array.map(results.layers, function (result) {
                        return {
                            featureLayer: result.layer
                        };
                    });

                    var layerObjects = array.map(results.layers, function (result) {
                        return result.layer;
                    });

                    // Añadimos el TemplatePicker al widget
                    var tpPicker = new TemplatePicker({
                        featureLayers: layerObjects,
                        columns: 6,
                        rows: "auto"
                    }, "divLeft");
                    tpPicker.startup();

                    // Configuramos las configuraciones del editor:
                    var editorSettings = {
                        map: mapa,
                        geometryService: new GeometryService('http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer'),
                        layerInfos: layerInfosWildfire,
                        toolbarVisible: true,
                        templatePicker: tpPicker,
                        createOptions: {
                            polygonDrawTools: [Editor.CREATE_TOOL_FREEHAND_POLYGON, Editor.CREATE_TOOL_RECTANGLE, Editor.CREATE_TOOL_TRIANGLE, Editor.CREATE_TOOL_CIRCLE]
                        },
                        toolbarOptions: {
                            reshapeVisible: true
                        },
                        enableUndoRedo: true,
                        maxUndoRedoOperations: 200

                        /*
                         * Step: Build the Editor constructor's first parameter
                         */
                    };var editorParams = {
                        settings: editorSettings

                        /*
                         * Step: Construct the Editor widget
                         */
                    };var widgetEditor = new Editor(editorParams, "divTop");
                    widgetEditor.startup();
                };
            });
        },

        onClose: function onClose() {

            // mapa.removeLayer(capaCableado)
            // mapa.removeLayer("https://localhost:6443/arcgis/rest/services/Proyecto/ServicioCableado/FeatureServer/3")
            // mapa.removeLayer(capaConductos)
            // mapa.removeLayer(capaDepositos)
            // mapa.removeLayer(capaEmpalmes)


        }

        // onMinimize: function(){
        //   console.log('Widget_Edicion::onMinimize');
        // },

        // onMaximize: function(){
        //   console.log('Widget_Edicion::onMaximize');
        // },

        // onSignIn: function(credential){
        //   console.log('Widget_Edicion::onSignIn', credential);
        // },

        // onSignOut: function(){
        //   console.log('Widget_Edicion::onSignOut');
        // }

        // onPositionChange: function(){
        //   console.log('Widget_Edicion::onPositionChange');
        // },

        // resize: function(){
        //   console.log('Widget_Edicion::resize');
        // }

        //methods to communication between widgets:

    });
});
//# sourceMappingURL=Widget.js.map
