//	function loadJScript() {
//		var script = document.createElement("script");
//		script.type = "text/javascript";
//		script.src = "http://api.map.baidu.com/api?v=2.0&ak=XGvfZRcqMC056a6GSpg81vIO&callback=init";
//		document.body.appendChild(script);
//
//		var heatscript = document.createElement("script");
//		heatscript.type = "text/javascript";
//		heatscript.src = "http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js";
//		document.body.appendChild(heatscript);
//	}
	var map;
	var point;
	var mk;

    function MapInit(points) {
            map = new BMap.Map("maps");            // 创建Map实例
            map.disableInertialDragging();  //关闭惯性拖拽
            point = new BMap.Point(116.418261, 39.921984); // 创建点坐标
            map.centerAndZoom(point,5);
            map.enableScrollWheelZoom();                 //启用滚轮放大缩小
            //获取定位
//            var geolocation = new BMap.Geolocation();//地理位置
//            geolocation.getCurrentPosition(function(r)
//            {
//                if(this.getStatus() == BMAP_STATUS_SUCCESS)
//                {
//
//                }
//                else {
//                    alert('定位失败，请手动选择城市'+this.getStatus());
//                }
//            },{enableHighAccuracy: true})
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
//
//     var points =[
//        {"lng":116.418261,"lat":39.921984,"count":50},
//
//     ];

    if(!isSupportCanvas()){
    	alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
    }
	//详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
	//参数说明如下:
	/* visible 热力图是否显示,默认为true
     * opacity 热力的透明度,1-100
     * radius 势力图的每个点的半径大小
     * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
     *	{
			.2:'rgb(0, 255, 255)',
			.5:'rgb(0, 110, 255)',
			.8:'rgb(100, 0, 255)'
		}
		其中 key 表示插值的位置, 0~1.
		    value 为颜色值.
     */
	heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
	map.addOverlay(heatmapOverlay);
	heatmapOverlay.setDataSet({data:points,max:100});
	//是否显示热力图
	heatmapOverlay.show();
	}

//    function openHeatmap(){
//        heatmapOverlay.show();
//    }
////	function closeHeatmap(){
////        heatmapOverlay.hide();
////
    function setGradient(){
     	/*格式如下所示:
		{
	  		0:'rgb(102, 255, 0)',
	 	 	.5:'rgb(255, 170, 0)',
		  	1:'rgb(255, 0, 0)'
		}*/
     	var gradient = {};
     	var colors = document.querySelectorAll("input[type='color']");
     	colors = [].slice.call(colors,0);
     	colors.forEach(function(ele){
			gradient[ele.getAttribute("data-key")] = ele.value;
     	});
        heatmapOverlay.setOptions({"gradient":gradient});
    }
	//判断浏览区是否支持canvas
    function isSupportCanvas(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }


//    window.onload = loadJScript;



