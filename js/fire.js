var map;
var kmlLayer;
var defaultout = ['*']; //default arcgisserver rest outfields
var maparray = [];

var layer;
var dynamap;
var overlaymap;

// keep track of highlight for devices without mouse
var highlighted = null;
var iw = null;

var minimumlongitude = 180; //lng min
var maximumlongitude = -180; //lng max
var minimumlatitude = 90; //lat min
var maximumlatitude = -90; //lat max



var hStyle = {
    fillColor: '#ac30b5',
    fillOpacity: 0.05,
    strokeColor: '#d431e0',
    strokeWeight: 3,
    zIndex: 100,
    strokeOpacity: 1
};
var style = {
    fillColor: '#ac30b5',
    fillOpacity: 0.1,
    strokeColor: '#d431e0',
    strokeWeight: 3,
    strokeOpacity: 1,
    zIndex: 0
};

//google.load("jquery", "1.4.2");
//google.load("jqueryui", "1.8.1");
google.load("maps", "3", {
    other_params: "sensor=true"
});


function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

google.setOnLoadCallback(function () {



    function processResultSet(rs) {
        var fs = rs.features;
        if (fs == "") {
            $("#map_drawing").hide();
            $("#mapcenterpopulate").html("Nothing to load. Did you follow a link?");
        } else {
            for (var i = 0, c = fs.length; i < c; i++) {
                setupFeature(fs[i]);
            }
        }
    }

    function setupFeature(feat) {
        var html;

        dynamap = feat.geometry[0]; //V3 supports multiple rings, so should have only 1 element

        var latlng = getPolyCenter(dynamap);
        dynamap.setMap(map);

        google.maps.event.addListener(dynamap, 'mouseover', function () {
            highlight(dynamap, "", latlng);
        });
        google.maps.event.addListener(dynamap, 'click', function () {
            highlight(dynamap, "", latlng);
            $("#mapcenterpopulate").html(html);
        });
        // the following use cursor to indicate busy
        google.maps.event.addListener(gmaps.ags.Util, 'jsonpstart', function () {
            map.setOptions({
                draggableCursor: 'wait'
            });
        });
        google.maps.event.addListener(gmaps.ags.Util, 'jsonpend', function () {
            map.setOptions({
                draggableCursor: 'url(http://maps.gstatic.com/intl/en_us/mapfiles/openhand_8_8.cur),default' //inherit'
            });
        });
    }

    function getPolyCenter(poly) {
        var paths, path, latlng;
        var latar = [];
        var lngar = [];
        var lat = 0;
        var lng = 0;
        var c = 0;

        paths = poly.getPaths();

        var minlat, minlng, maxlat, maxlng;
        for (var j = 0, jc = paths.getLength(); j < jc; j++) {
            path = paths.getAt(j);
            for (var k = 0, kc = path.getLength(); k < kc; k++) {
                latlng = path.getAt(k);
                latar[k] = latlng.lat();
                lngar[k] = latlng.lng();

                lat += latlng.lat();
                lng += latlng.lng();
                c++;
            }
        }

        if (Math.min.apply(Math, latar) < minimumlatitude) {
            minimumlatitude = Math.min.apply(Math, latar)
        };
        if (Math.max.apply(Math, latar) > maximumlatitude) {
            maximumlatitude = Math.max.apply(Math, latar)
        };

        if (Math.min.apply(Math, lngar) < minimumlongitude) {
            minimumlongitude = Math.min.apply(Math, lngar)
        };
        if (Math.max.apply(Math, lngar) > maximumlongitude) {
            maximumlongitude = Math.max.apply(Math, lngar)
        };


        var southWest = new google.maps.LatLng(minimumlatitude, minimumlongitude);
        var northEast = new google.maps.LatLng(maximumlatitude, maximumlongitude);
        var bounds = new google.maps.LatLngBounds(southWest, northEast);
        map.fitBounds(bounds);

        if (c > 0) {
            return new google.maps.LatLng(lat / c, lng / c);
        }
        return false;
    }

    function highlight(g, html, latlng) {
        if (highlighted) {
            highlighted.setOptions(style);
        }
        dynamap.setOptions(hStyle);
        highlighted = g;
        if (!iw) {
            iw = new google.maps.InfoWindow({
                content: html,
                position: latlng,
                maxWidth: 240
            });
        } else {
            iw.setContent(html);
            iw.setPosition(latlng);
        }
        google.maps.event.trigger(map, 'resize');
        //iw.open(map);
    }

    function addLayer(mapname, url, lbl, lyropt, where, outfields, thisstyle, callbackfn) {
		if (where != 'ID = 420') {
        minimumlongitude = 180; //lng min
        maximumlongitude = -180; //lng max
        minimumlatitude = 90; //lat min
        maximumlatitude = -90; //lat max

		 if (dynamap != null) {
			dynamap.setMap(null);
		}
	
        layer = new gmaps.ags.Layer(url + '/' + lyropt);
        var params = {
            returnGeometry: true,
            where: where,
            outFields: outfields,
            overlayOptions: thisstyle
        };
        layer.query(params, processResultSet);
        callbackfn();
        return false;
		}
    }
	

    loadScript("/ifwis/_js/agslink.js", function () {

       // addLayer(map, "http://fishandgame.idaho.gov/gis/rest/services/mapcenter_hunt/MapServer", "", 0, "ID = " + lyrval, defaultout, style, function () { });

        $('#gmu').change(function () {
            addLayer(map, "https://fishandgame.idaho.gov/gis/rest/services/Special/HuntPlanner_Mapcenter/MapServer", $("#gmu option:selected").text(), 0, "ID = " + $('#gmu').val(), defaultout, style, function () { });
            $('#elkzone').prop('selectedIndex', 0);
			$('#chunt').prop('selectedIndex', 0);
        });

        $('#elkzone').change(function () {
            addLayer(map, "https://fishandgame.idaho.gov/gis/rest/services/Special/HuntPlanner_Mapcenter/MapServer", $("#elkzone option:selected").text(), 0, "ID = " + $('#elkzone').val(), defaultout, style, function () { });
            $('#gmu').prop('selectedIndex', 0);
			$('#chunt').prop('selectedIndex', 0);
        });

        $('#chunt').change(function () {
            addLayer(map, "https://fishandgame.idaho.gov/gis/rest/services/Special/HuntPlanner_Mapcenter/MapServer", $("#chunt option:selected").text(), 0, "ID = " + $('#chunt').val(), defaultout, style, function () { });
            $('#gmu').prop('selectedIndex', 0);
			$('#elkzone').prop('selectedIndex', 0);
        });
		
						var sm = $($(":jqmData(slidemenu)").data('slidemenu'));
	if (viewport().width > 900) {
		slidemenu(sm);
	}

    });

    var josefov = new google.maps.LatLng(45.3119, -116.67029);
    //Define OSM as base layer in addition to the default Google layers
    var osmMapType = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            return "http://otile1.mqcdn.com/tiles/1.0.0/osm/" +
		            zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: true,
        alt: "OpenStreetMap",
        name: "Streets",
        maxZoom: 19,
        opacity: 0.7
    });

    //Define custom WMS tiled layer
    var SLPLayer = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            var proj = map.getProjection();
            var zfactor = Math.pow(2, zoom);
            // get Long Lat coordinates
            var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor));
            var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 256 / zfactor, (coord.y + 1) * 256 / zfactor));

            //corrections for the slight shift of the SLP (mapserver)
            var deltaX = 0.0013;
            var deltaY = 0.00058;

            //create the Bounding box string
            var bbox = (top.lng() + deltaX) + "," +
    	                               (bot.lat() + deltaY) + "," +
    	                               (bot.lng() + deltaX) + "," +
    	                               (top.lat() + deltaY);

            //base WMS URL
            var url = "http://activefiremaps.fs.fed.us/cgi-bin/mapserv.exe?map=conus.map";
            url += "&REQUEST=GetMap"; //WMS operation
            url += "&SERVICE=WMS";    //WMS service
            url += "&VERSION=1.1.1";  //WMS version  
            //url += "&LAYERS=" + "Last 12 hour fire detections,Last 6 hour fire detections,Current Large incidents,Cumulative MODIS fire detections for current year"; //WMS layers
            url += "&LAYERS=" + "Last 6 hour fire detections,Cumulative Fire Detections,Last 24 hour fire detections,Last 12 hour fire detections"; //WMS layers
            url += "&FORMAT=image/png"; //WMS format
            url += "&BGCOLOR=0xFFFFFF";
            url += "&TRANSPARENT=TRUE";
            url += "&SRS=EPSG:4269";     //set WGS84 
            url += "&BBOX=" + bbox;      // set bounding box
            url += "&WIDTH=256";         //tile size in google
            url += "&HEIGHT=256";
            return url;                 // return URL for the tile

        },
        tileSize: new google.maps.Size(256, 256),
        isPng: true
    });




    function initialize() {
        var mapOptions = {
            zoom: 7,
            center: josefov,
            mapTypeId: 'OSM',
            mapTypeControlOptions: {
                mapTypeIds: ['OSM', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN],
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            }
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        map.mapTypes.set('OSM', osmMapType);
        map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
        //add WMS layer
        SLPLayer.setOpacity(0.4);
        map.overlayMapTypes.push(SLPLayer);


		var closureLayer = new google.maps.KmlLayer('https://fishandgame.idaho.gov/ifwis/portal/sites/ifwis/files/opendata/FireEmergencyClosures.kmz?v=3');
       closureLayer.setMap(map);
		
		//var perimeterLayer = new 
		//google.maps.KmlLayer('http://rmgsc.cr.usgs.gov/outgoing/GeoMAC/current_year_fire_data/KMLS//ActiveFirePerimeters.kml?v=26d', { preserveViewport: true });
        //perimeterLayer.setMap(map);
    }


    function kml(surl) {
        if (surl != "") {
            //clearOverlays();
			kmlLayer = new google.maps.KmlLayer(surl, { preserveViewport: true, clickable: true, suppressInfoWindows: false });
            map.currentLayer = kmlLayer;
        }
    }


    initialize();
	
	$("#clearmap").click(
		function() {
			dynamap.setMap(null);
			$('#gmu').prop('selectedIndex', 0);
			$('#chunt').prop('selectedIndex', 0);
			$('#elkzone').prop('selectedIndex', 0);
		}
	);
});
 