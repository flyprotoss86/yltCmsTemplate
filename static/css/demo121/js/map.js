var map;
		var bounds;
		var circle;
		var local;
		var lng = '91.125103';
		var lat = '29.660384'; //指定位置的经度纬度可以到百度定位拾取系统去拿 http://api.map.baidu.com/lbsapi/getpoint/index.html  
//		var lng,lat;
		var search = '景区';
//		var lng, lat;
		$(function() {
			map = new BMap.Map("allmap"); // 创建Map实例
			navigator.geolocation.getCurrentPosition(function (position) {  
			    lng = position.coords.longitude;  
			    lat = position.coords.latitude;  
			});
			var mPoint = new BMap.Point(lng, lat);
			map.enableScrollWheelZoom();
			map.centerAndZoom(mPoint, 15);
			
			//获取浏览器坐标
//			var geolocation = new BMap.Geolocation();
//			geolocation.getCurrentPosition(function(r){
//				if(this.getStatus() == BMAP_STATUS_SUCCESS){
//					var mk = new BMap.Marker(r.point);
//					map.addOverlay(mk);
//					map.panTo(r.point);
//					alert('您的位置：'+r.point.lng+','+r.point.lat);
//				}
//				else {
//					alert('failed'+this.getStatus());
//				}        
//			},{enableHighAccuracy: true})
//			map.addEventListener("click", function(e) {
//				mPoint = new BMap.Point(e.point.lng, e.point.lat);
//				Search(search, mPoint);
//			});
			
			//点击选项列表
			var mOption = {
				poiRadius: 500, //半径为1000米内的POI,默认100米
				numPois: 12 //列举出50个POI,默认10个
			}
			var myGeo = new BMap.Geocoder();
			$('.tuijian_list2 li').each(function(index) {
				$(this).click(function() {
					$(this).parents('.tuijian_list2').find('.tuijian_in').removeClass('tuijian_in');
					$(this).addClass("tuijian_in");
					search = $(this).attr('val_class');
					Search(search, mPoint);
					
					//显示列表
//					myGeo.getLocation(mPoint,
//						function mCallback(rs) {
//							var allPois = rs.surroundingPois; //获取全部POI（该点半径为100米内有6个POI点）
//							for(i = 0; i < allPois.length; ++i) {
//								document.getElementById("panel").innerHTML += "<li>" + (i + 1) + "、" + allPois[i].title + ",地址:" + allPois[i].address + "</li>";
//							}
//						}, mOption
//					);
					
				});
			});
//			Search(search, mPoint);

			
		})
		
		/**  
		 * 得到圆的内接正方形bounds  
		 * @param {Point} centerPoi 圆形范围的圆心  
		 * @param {Number} r 圆形范围的半径  
		 * @return 无返回值     
		 */
		function getSquareBounds(centerPoi, r) {
			var a = Math.sqrt(2) * r; //正方形边长  
			var mPoi = getMecator(centerPoi);
			var x0 = mPoi.x,
				y0 = mPoi.y;
			var x1 = x0 + a / 2,
				y1 = y0 + a / 2; //东北点  
			var x2 = x0 - a / 2,
				y2 = y0 - a / 2; //西南点  
			var ne = getPoi(new BMap.Pixel(x1, y1)),
				sw = getPoi(new BMap.Pixel(x2, y2));
			return new BMap.Bounds(sw, ne);
		};
		//根据球面坐标获得平面坐标。  
		function getMecator(poi) {
			return map.getMapType().getProjection().lngLatToPoint(poi);
		};
		//根据平面坐标获得球面坐标。  
		function getPoi(mecator) {
			return map.getMapType().getProjection().pointToLngLat(mecator);
		};
		//点击标点
		function Search(search, mPoint) {
			map.clearOverlays();
			circle = new BMap.Circle(mPoint, 1000, {
				stroke: "white",
				strokeWeight: 1,
				fillOpacity: 0.3,
				strokeOpacity: 0.3
			});
			map.addOverlay(circle);
			local = new BMap.LocalSearch(map, {
				renderOptions: {
					map: map,
					autoViewport: false
				}
			});
			bounds = getSquareBounds(circle.getCenter(), circle.getRadius());
			local.searchInBounds(search, bounds);
			//				map.addOverlay(MyMarker);
			/*  
			map.centerAndZoom(mPoint, 16);  
			var local = new BMap.LocalSearch(map, {  
			    renderOptions: {map: map, panel: "r-result"}  
			});  
			local.search(search);  
			*/
		};