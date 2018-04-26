var Hmap = {};
//地图展示
Hmap.createMap = function (opts) {
    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    //map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP] }));
};

//百度地图API功能
Hmap.loadJScript = function () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=您的密钥&callback=init";
    document.body.appendChild(script);
}
//异步加载地图
Hmap.initMapAsyn = function (opts) {
    //mapId:显示地图的位置dom Id，lng、lat:经纬度，level：地图级别
    var map = new BMap.Map(opts.mapId);            // 创建Map实例
    var point = new BMap.Point(opts.lng, opts.lat); // 创建点坐标
    map.centerAndZoom(point, opts.level);
    map.enableScrollWheelZoom();                 //启用滚轮放大缩小
};

//根据城市名设置地图中心点
Hmap.setCenterPointByCity = function (opts) {
    //mapId:显示地图的位置dom Id，level：地图级别，cityName：设置地图显示的城市
    // 百度地图API功能
    var map = new BMap.Map(opts.mapId);  // 创建Map实例
    map.centerAndZoom(opts.cityName, opts.level);      // 初始化地图,用城市名设置地图中心点
}

//设置地图最小/大级别
Hmap.setMapMaxorMinLevel = function (opts) {
    //mapId:显示地图的位置dom Id，lng、lat:经纬度，level：地图级别，minZoom：最小缩放，maxZoom：最大缩放
    // 百度地图API功能
    var map = new BMap.Map(opts.mapId, { minZoom: opts.minZoom, maxZoom: opts.maxZoom }); // 创建Map实例,设置地图允许的最小/大级别
    map.centerAndZoom(new BMap.Point(opts.lng, opts.lat), opts.level);
    map.enableScrollWheelZoom(true);
}

//地图操作（移动、缩放、拖拽）
Hmap.operation = function () {
    this.name = 10;
}
//移动地图
Hmap.operation.prototype.move = function (opts) {
    //mapId:显示地图的位置dom Id，lngStart、latStart:移动前的经纬度，lngEnd、latEnd:移动后的经纬度，level：地图级别，time:多少秒后移动
    // 百度地图API功能
    var map = new BMap.Map(opts.mapId);
    map.centerAndZoom(new BMap.Point(opts.lngStart, opts.latStart), opts.level);
    setTimeout(function () {
        map.panTo(new BMap.Point(opts.lngEnd, opts.latEnd));   //两秒后移动到广州
    }, opts.time);
}
//缩放地图
Hmap.operation.prototype.zoom = function (opts) {
    // alert(this.name);
    //mapId:显示地图的位置dom Id，lng、lat:待缩放的经纬度，levelStart：缩放前地图级别，levelEnd：缩放后地图级别，time:多少秒后缩放
    // 百度地图API功能
    var map = new BMap.Map(opts.mapId);
    map.centerAndZoom(new BMap.Point(opts.lng, opts.lat), opts.levelStart);
    setTimeout(function () {
        map.setZoom(opts.levelEnd);
    }, opts.time);  //2秒后放大到14级
    map.enableScrollWheelZoom(true);
}
//拖拽地图
Hmap.operation.prototype.drag = function (opts) {
    //mapId:显示地图的位置dom Id，lng、lat:待拖拽的经纬度，level：地图级别，time:多少秒后拖拽
    // 百度地图API功能
    var map = new BMap.Map(opts.mapId);            // 创建Map实例
    map.centerAndZoom(new BMap.Point(opts.lng, opts.lat), opts.level);  //初始化时，即可设置中心点和地图缩放级别。
    map.enableScrollWheelZoom(true);
    map.disableDragging();     //禁止拖拽
    setTimeout(function () {
        map.enableDragging();   //两秒后开启拖拽
        //map.enableInertialDragging();   //两秒后开启惯性拖拽
    }, opts.time);
}

//设置地图显示范围
Hmap.setMapShowRange = function (opts) {
    //mapId:显示地图的位置dom Id，lng、lat:经纬度,lngRangeStart、latRangeStart：起始经纬度范围,lngRangeEnd、latRangeEnd：结束经纬度范围，level：地图级别
    //百度地图API功能	
    var map = new BMap.Map(opts.mapId);
    map.centerAndZoom(new BMap.Point(opts.lngRangeStart, opts.latRangeStart), opts.level);
    map.enableScrollWheelZoom();
    var b = new BMap.Bounds(new BMap.Point(opts.lng, opts.lat), new BMap.Point(opts.lngRangeEnd, opts.latRangeEnd));
    try {
        BMapLib.AreaRestriction.setBounds(map, b);
    } catch (e) {
        alert(e);
    }
}

//获取地图显示范围
Hmap.getMapShowRange = function (opts) {
    //mapId:显示地图的位置dom Id，lng、lat:经纬度,lngRangeStart、latRangeStart：起始经纬度范围,lngRangeEnd、latRangeEnd：结束经纬度范围，level：地图级别
    // 百度地图API功能
    var map = new BMap.Map(opts.mapId);
    map.centerAndZoom(new BMap.Point(opts.lng, opts.lat), opts.level);
    var bs = map.getBounds();   //获取可视区域
    var bssw = bs.getSouthWest();   //可视区域左下角
    var bsne = bs.getNorthEast();   //可视区域右上角
    alert("当前地图可视范围是：" + bssw.lng + "," + bssw.lat + "到" + bsne.lng + "," + bsne.lat);
}

//获取两点之间的距离
Hmap.getDistance = function (opts) {
    //mapId:显示地图的位置dom Id，lng、lat:经纬度,lngDistanceStart、latDistancetart：起始经纬度,lngDistanceEnd、latDistanceEnd：结束经纬度，level：地图级别

    // 百度地图API功能
    var map = new BMap.Map(opts.mapId);
    map.centerAndZoom(opts.cityName, opts.level);  //初始化地图,设置城市和地图级别。
    var pointA = new BMap.Point(opts.lngDistanceStart, opts.latDistancetart);  // 创建点坐标A--大渡口区
    var pointB = new BMap.Point(opts.lngDistanceEnd, opts.latDistanceEnd);  // 创建点坐标B--江北区
    alert('从大渡口区到江北区的距离是：' + (map.getDistance(pointA, pointB)).toFixed(2) + ' 米。');  //获取两点距离,保留小数点后两位
    var polyline = new BMap.Polyline([pointA, pointB], { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 });  //定义折线
    map.addOverlay(polyline);     //添加折线到地图上

    //添加控件和比例尺
    Hmap.addControl(map);
    map.enableScrollWheelZoom();                 //启用滚轮放大缩小
}

//添加控件和比例尺、地图
Hmap.addControl = function (opts) {

    // 百度地图API功能
    var map = new BMap.Map(opts.mapId);
    map.centerAndZoom(new BMap.Point(opts.lng, opts.lat), opts.level);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.MapTypeControl({ offset: new BMap.Size(5, 5) }));
    map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT }));
}

//移除控件和比例尺、地图
Hmap.removeControl = function () {
      // 百度地图API功能
    var map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.MapTypeControl({ offset: new BMap.Size(5, 5) }));
    map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT }));
}
