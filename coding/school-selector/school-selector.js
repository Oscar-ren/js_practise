(function() {
	//获取省份和学校元素，以及省份和学校的副本
	var provinceDiv = document.querySelector(".school-box-provinces"),
		schoolDiv = document.querySelector(".school-box-schools"),
		schoolName = document.getElementById("schoolName"),
		schoolId = document.getElementById("schoolId"),
		provinceCopy = document.createElement("a"),
		schoolCopy = document.createElement("a");

	provinceCopy.className = "province-item";
	schoolCopy.className = "school-item";

	var provinces = SCHOOL_LIST;
	var curProvince = -1;	//current province id

	//初始化provinces区域代码,将省份id和name加入到省份div中
	var initProvinces = function() {
		for(var i=0; i<provinces.length; i++) {
			var province = provinces[i];
			var _province = provinceCopy.cloneNode(true);
			_province.setAttribute('data-province',province.id);
			_province.appendChild(document.createTextNode(province['name']));
			provinceDiv.appendChild(_province);
		}
	};

	//初始化学校，根据传入的provinceId
	var getProvinceId = function(pid) {
		for(var i=0; i<provinces.length; i++) {
			if(Number(provinces[i]['id']) == Number(pid)) {
				return provinces[i];	//返回对应id的省份对象
			}
		}
		return undefined;
	}

	var initSchools = function(pid) {
		var province = getProvinceId(pid);
		if(typeof province != 'undefined') {
			var schools = province['school'];	//得到对应省份id的学校对象
			var child = schoolDiv.childNodes;
			for(var i=child.length-1; i>=0; i--) {
				schoolDiv.removeChild(child[i]);
			}

			//同初始化province区域代码，赋值school的id和name
			for(var i=0; i<schools.length; i++) {
				var school = schools[i];
				var _school = schoolCopy.cloneNode(true);
				_school.setAttribute('data-school',school['id']);
				_school.appendChild(document.createTextNode(school['name']));
				schoolDiv.appendChild(_school);
			}

		}
		return false;
	}

	//给province绑定click事件
	function onProvinceClick() {
		var pid = this.getAttribute('data-province');
		
		if(curProvince != pid) {
			var provinces_a = provinceDiv.getElementsByTagName("a");
			var alen = provinces_a.length;
			for(var i=0; i<alen; i++) {
				if(provinces_a[i].getAttribute("data-province") == curProvince) {
					provinces_a[i].classList.remove("choose");
				}
				this.classList.add("choose");
			}
		}
		curProvince = pid;
		initSchools(pid);
		clacSchool();
	}

	//给school绑定click事件
	function onSchoolClick() {
		schoolName.value = this.innerText;
		schoolId.value = this.getAttribute("data-school");
		console.log(this.getAttribute("data-school"));
		slideup.call(schoolBox);
		show.call(button);
	}

	var clacSchool = function() {
		var school_a = schoolDiv.getElementsByTagName("a"),
				sch_alen = school_a.length;
		for(var i=0; i<sch_alen; i++) {
			school_a[i].addEventListener("click",onSchoolClick,false);
		}
	}

	//统一初始化
	var init = function() {
		initProvinces();
		var provinces_a = provinceDiv.getElementsByTagName("a"),
				pro_alen = provinces_a.length;
		for(var i=0; i<pro_alen; i++) {
			provinces_a[i].addEventListener("click",onProvinceClick,false);
		}
		provinces_a[0].click();
	}

	return init();
})();