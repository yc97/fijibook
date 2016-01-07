	function loadJScript() {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://api.map.baidu.com/api?v=2.0&ak=XGvfZRcqMC056a6GSpg81vIO&callback=init";
		document.body.appendChild(script);
	}
	var map;
	var point;
	var mk;
    function init() {
            map = new BMap.Map("maps");            // 创建Map实例
            map.disableInertialDragging();  //关闭惯性拖拽
            point = new BMap.Point(116.331398, 39.897445); // 创建点坐标
            map.centerAndZoom(point,16);
            map.enableScrollWheelZoom();                 //启用滚轮放大缩小
            //获取定位
            var geolocation = new BMap.Geolocation();//地理位置
            geolocation.getCurrentPosition(function(r)
            {
                if(this.getStatus() == BMAP_STATUS_SUCCESS)
                {
                    //添加标记
                    var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25),
                    {
                        offset: new BMap.Size(10, 25),
                        imageOffset: new BMap.Size(0, 0 - 12 * 25)
                    });
                    var mk = new BMap.Marker(r.point, {icon: myIcon});
                    point = r.point;
                    map.addOverlay(mk);
                    mk.enableDragging();
                    mk.setTop(true);
                    map.panTo(r.point);//把定位点转到
                    //mk.addEventListener("dragend",function(e){
                     //   point=mk.getPosition();
                   // });
                   geiPOI(point);
                }
                else {
                    alert('failed'+this.getStatus());
                }
            },{enableHighAccuracy: true})
            //关于状态码
            //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
            //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
            //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
            //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
            //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
            //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
            //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
            //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
            //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
            map.addEventListener("dragging",function(e){
                var pt = map.getBounds().getCenter();
                mk.setPosition(pt);
                //alert("LON:" + pt.lng + " LAT:" + pt.lat);
            });

            map.addEventListener("moveend",function(e){
            //alert('响应！');
                map.clearOverlays();
                var pt = map.getBounds().getCenter();
                //alert("LON:" + pt.lng + " LAT:" + pt.lat);
                var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25),
                    {
                       offset: new BMap.Size(10, 25),
                       imageOffset: new BMap.Size(0, 0 - 12 * 25)
                    });
                mk = new BMap.Marker(pt, {icon: myIcon});
                mk.enableDragging();
                map.addOverlay(mk);
                mk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                document.getElementById("locationSel").innerHTML='<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
                point=pt;
                geiPOI(pt);
                mk.setAnimation(null); //停止跳动
            });
    }

    window.onload = loadJScript;
    //监听展开折叠事件
	$('#collapseOne').on('shown.bs.collapse', function () {
        map.panTo(point);//map重定向到中心点
    })


    function geiPOI(pt){
        var poiR = 500//设定poi半径
        var poiNum = 10//设定poi数量
        var gc = new BMap.Geocoder();//位置编码
        //POI参数
        var mOption = {
            poiRadius : poiR,
            numPois : poiNum}
        gc.getLocation(pt, function(rs)
                    {
                        document.getElementById("locationSel").innerHTML='<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
                        //GeocoderResult对象里有addressComponments和surroundingPois
                        var addComp = rs.addressComponents;
                        var surPois = rs.surroundingPois;
                        var business = rs.business;
                        document.getElementById("lng").value = pt.lng;
                        document.getElementById("lat").value = pt.lat;
                        var locationStreet = (addComp.province + ", " + addComp.city + ", " +
                            addComp.district + ", " + addComp.street + ", " + addComp.streetNumber + ", ")
                        document.getElementById("street").value = locationStreet;
                        document.getElementById("inputLocation").value = locationStreet + surPois[0].title;
                        if (surPois.length < 10)
                            var maxI = surPois.length;
                        else
                            var maxI = 10;
                        for (var i=0;i<surPois.length;i++)
                        {
                            var title = String.fromCharCode('A'.charCodeAt()+i) + '.' + surPois[i].title;
                            if (i==0)
                                document.getElementById("locationSel").innerHTML += ('<div class="col-md-6 col-xs-12"><p><input type="radio" onClick="javascript:check()" checked="checked" name="locationSel" value="'
                                + surPois[i].title + '"/> ' + title + '</p></div>');
                            else
                                document.getElementById("locationSel").innerHTML += ('<div class="col-md-6 col-xs-12"><p><input type="radio" onClick="javascript:check()" name="locationSel" value="'
                                + surPois[i].title + '"/> ' + title + '</p></div>');
                            var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25),
                            {
                                offset: new BMap.Size(10, 25),
                                imageOffset: new BMap.Size(0, 0 - i * 25)
                            });
                            var mk1 = new BMap.Marker(surPois[i].point, {icon: myIcon});
                            map.addOverlay(mk1);
                        }
                    }
                    ,mOption);
    }

    function check()
	{
        var flag=0;
        for(i=0; i<document.info.locationSel.length;i++)
            if(document.info.locationSel[i].checked==true)
            {
                document.info.inputLocation.value = document.info.street.value + document.info.locationSel[i].value;
                break;
            }
    }