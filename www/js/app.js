	var domain = "http://aplikasilaundryonline.com/demo_dev/"; // DOMAIN URL ADMIN
	var admin_url = domain;
	var base_url = domain+"_api_/android"; // URL API
	var header_data = {'Content-Type': 'application/x-www-form-urlencoded'}; // URL API
	var token = 'weareadmin';
	var state = '';
	var number_version = 103;
	var page = 0;
	var total_cart;
	
	var app = angular.module('myApp', ['ionic', 'ui.router', 'ion-datetime-picker']);
	
	app.run(function($ionicPlatform,$ionicPopup,$rootScope,$location){
		$rootScope.dateValue = new Date();
		$rootScope.timeValue = new Date();
		$rootScope.datetimeValue = new Date();
		
		$rootScope.go = function() {
			window.open("http://github.com/katemihalikova/ion-datetime-picker", "_blank");
		};
		
		$ionicPlatform.registerBackButtonAction(function(event) {
			if($location.path() == '/page/dashboard')
			{
				
				if (true) { // your check here
				  $ionicPopup.confirm({
					title: 'Notifikasi',
					template: 'Anda yakin ingin keluar dari aplikasi?'
				  }).then(function(res) {
					if (res) {
						localStorage.setItem('status_banner','YES');
						ionic.Platform.exitApp();
					}
				  })
				 }
			}
			else if($location.path() == '/login')
			{
				if (true) { // your check here
				  $ionicPopup.confirm({
					title: 'Notifikasi',
					template: 'Anda yakin ingin keluar dari aplikasi?'
				  }).then(function(res) {
					if (res) {
					  ionic.Platform.exitApp();
					}
				  })
				 }
			}
			else
			{
				
				window.history.back();
			}
		}, 100);
	});
	app.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state(
			'page',
			{
				cache: false,
				abstract: true,
				url : '/page',
				views : {
					'MainIndex' : { templateUrl : 'templates/menu.html' }
				}
			}
		)
		.state(
			'page.dashboard',
			{
				cache: false,
				url : '/dashboard',
				views : {
					'Cuci' : { templateUrl : 'templates/dashboard.html' }
				}
			}
		)
		.state(
			'login',
			{
				cache: false,
				url : '/login',
				views : {
					'MainIndex' : { templateUrl : 'templates/login.html' }
				}
			}
		)
		.state(
			'register',
			{
				cache: false,
				url : '/register',
				views : {
					'MainIndex' : { templateUrl : 'templates/register.html' }
				}
			}
		)
		.state(
			'page.cuci',
			{
				cache: false,
				url : '/cuci',
				views : {
					'Cuci' : { templateUrl : 'templates/cuci.html' }
				}
			}
		)
		.state(
			'page.home',
			{
				cache: false,
				url : '/home',
				views : {
					'Home' : { templateUrl : 'templates/home.html' }
				}
			}
		)
		.state(
			'page.konfirmasi',
			{
				cache: false,
				url : '/konfirmasi',
				views : {
					'Order' : { templateUrl : 'templates/konfirmasi.html' }
				}
			}
		)
		.state(
			'page.cucikilo',
			{
				cache: false,
				url : '/cucikilo',
				views : {
					'Cuci' : { templateUrl : 'templates/cucikilo.html' }
				}
			}
		)
		.state(
			'page.cucipaket',
			{
				cache: false,
				url : '/cucipaket',
				views : {
					'Cuci' : { templateUrl : 'templates/cucipaket.html' }
				}
			}
		)
		.state(
			'page.cartpaket',
			{
				cache: false,
				url : '/cartpaket',
				views : {
					'Order' : { templateUrl : 'templates/cartpaket.html' }
				}
			}
		)
		.state(
			'page.myorder',
			{
				cache: false,
				url : '/myorder',
				views : {
					'Order' : { templateUrl : 'templates/myorder.html' }
				}
			}
		)
		.state(
			'page.addAlamat',
			{
				cache: false,
				url : '/addAlamat',
				views : {
					'Order' : { templateUrl : 'templates/addAlamat.html' }
				}
			}
		)
		.state(
			'page.kontak_kami',
			{
				cache: false,
				url : '/kontak_kami',
				views : {
					'Kontak' : { templateUrl : 'templates/kontak_kami.html' }
				}
			}
		)
		.state(
			'page.informasi',
			{
				cache: false,
				url : '/informasi',
				views : {
					'Kontak' : { templateUrl : 'templates/informasi.html' }
				}
			}
		)
		.state(
			'page.detailorder',
			{
				cache: false,
				url : '/detailorder',
				views : {
					'Order' : { templateUrl : 'templates/detailorder.html' }
				}
			}
		)
		.state(
			'page.account',
			{
				cache: false,
				url : '/account',
				views : {
					'Account' : { templateUrl : 'templates/account.html' }
				}
			}
		)
		;
		
		var loggedin = false;
		localStorage.getItem('Login') == 'YES' ? loggedin = true : loggedin = false;
		$urlRouterProvider.otherwise(loggedin ? "/page/home" : "/login");
	} );
	
	app.service('myorder', function() {
		this.myorder;
	})
	app.service('formKonfirmasi', function() {
		this.formKonfirmasi;
	})
	app.service('accountInfo', function() {
		this.accountInfo;
	})
	app.service('addAlamat', function() {
		this.addAlamat;
	})
	app.service('cucikilo', function() {
		this.cucikilo;
	})
	app.service('cucipaket', function() {
		this.cucipaket;
	})
	app.service('cartpaket', function() {
		this.cartpaket;
	})
	app.service('detailOrder', function() {
		this.detailOrder;
	})
	app.service('kontakKami', function() {
		this.kontakKami;
	})
	
	app.controller('accountInfo', function($state, $scope, $http, $ionicLoading, $rootScope, $ionicPopup, accountInfo) {
		//LOADING
		$scope.loadingView = function(){
			$ionicLoading.show({
				template: 'Loading'
			});
		};
		$scope.successUpdate = function() {
			$ionicPopup.alert({
				title: 'Notifikasi Success',
				template: 'Data profile telah berhasil diupdate'
			});
		}
		$scope.showNull = function() {
			$ionicPopup.alert({
				title: 'Notifikasi Error',
				template: 'Email dan nama tidak boleh kosong'
			});
		}
		// GET LIST CART
		
		$ionicLoading.show();
		
		$scope.accountInfo = accountInfo;
		if(localStorage.getItem('Login') == 'YES')
		{
			$http({
				method : 'POST',
				url : base_url+'/get_customer_info',
				headers: header_data ,
				data : {
						token : token,
						customer_id : accountInfo.customer,
						},
				timeout: 10000
			}).then(
			function(response) {
				var data = response.data;
				if(data.status == 'Success')
				{
					$scope.name = data.name;
					$scope.email = data.email;
					$scope.phone = data.phone;
					
					$ionicLoading.hide();
				}
				else
				{
					$state.go('page.dashboard');
					state = 'dashboard';
					alert(data.status);
					$ionicLoading.hide();
				}
			}, function(response) {
				$ionicLoading.hide();
				$state.go('page.dashboard');
				state = 'dashboard';
				alert('Gagal melanjutkan, periksa kembali internet anda');
			});
		}
		else
		{
			$ionicLoading.hide();
			$state.go('login');
			state = 'login';
		}
		$scope.sendUpdateProfile = function()
		{
			$ionicLoading.show();
			if($scope.email != null && $scope.name != null)
			{
				if($scope.password == '' || $scope.password == null)
				{
					var pass = 'kosong';
				}
				else
				{
					var pass = $scope.password;
				}
				
				var send = $http({
					method : 'POST',
					url : base_url+'/update_profile_proses',
					headers: header_data ,
					data : {
							customer_id : localStorage.getItem('user_id'),
							name : $scope.name,
							phone : $scope.phone,
							password : pass,
							email : $scope.email,
							},
					timeout: 10000
				 });
				 send.success(function(data) {
					if (data.status == 'Success') {
						$ionicLoading.hide();
						$scope.successUpdate();
					}
					
				}, function(response) {
					$ionicLoading.hide();
					alert('Gagal melanjutkan, periksa kembali internet anda');
				});
			}
			else
			{
				$ionicLoading.hide();
				$scope.showNull();
			}
		}
		$scope.logout = function() {
			$ionicLoading.show();
			localStorage.setItem('Login','NO');
			localStorage.setItem('user_id','');
			total_cart = 0;
			$rootScope.$broadcast('new-order', { any: {total_cart:total_cart} });
			$ionicLoading.hide();
			$scope.gotoLogin();
		};
		$scope.gotoLogin = function() {
			$state.go('login');
			state = 'login';
		};
		$scope.gotoDashboard = function() {
			$state.go('page.dashboard');
			state = 'dashboard';
		};
	});
	app.controller('detailOrder', function($state, $scope, $http, $ionicLoading, $ionicPopup, detailOrder,formKonfirmasi) {
		//LOADING
		$scope.loadingView = function(){
			$ionicLoading.show({
				template: 'Loading'
			});
		};
		
		// GET LIST CART
		
		$ionicLoading.show();
		
		$scope.detailOrder = detailOrder;
		
		$http({
			method : 'POST',
			url : base_url+'/detail_all_order',
			headers: header_data ,
			data : {
					token : token,
					order_id : detailOrder.order_id,
					},
			timeout: 10000
		}).then(
		function(response) {
			var data = response.data;
			if(data.status == 'Success')
			{
				$scope.order_id = detailOrder.order_id;
				$scope.status_konfirmasi = data.status_konfirmasi;
				$scope.tanggal = data.tanggal;
				$scope.phone = data.phone;
				$scope.alamat = data.alamat;
				$scope.catatan = data.catatan;
				$scope.kurir = data.kurir;
				$scope.tipe_pembayaran = data.tipe_pembayaran;
				$scope.kurir_status = data.kurir_status;
				$scope.area = data.area;
				$scope.pembayaran = data.pembayaran;
				$scope.status_order = data.status_order;
				$scope.status_pembayaran = data.status_pembayaran;
				$scope.ongkos_kurir = data.ongkos_kurir;
				$scope.estimasi_berat = data.estimasi_berat;
				$scope.real_berat = data.real_berat;
				$scope.estimasi_total = data.estimasi_total;
				$scope.real_total = data.real_total;
				$scope.total = data.total;
				$scope.tipe_order = data.tipe_order;
				$scope.tipe_paket = data.tipe_paket;
				$scope.harga_kilo = data.harga_kilo;
				$scope.tanggal_pengambilan = data.tanggal_pengambilan;
				$scope.items = data.items;
				$scope.posisi_lat = data.posisi_lat;
				$scope.posisi_lng = data.posisi_lng;
				$scope.tujuan_lat = data.tujuan_lat;
				$scope.tujuan_lng = data.tujuan_lng;
				$scope.potongan = data.potongan;
				//initMap(data.posisi_lat,data.posisi_lng,data.tujuan_lat,data.tujuan_lng);
				$ionicLoading.hide();
			}
			else
			{
				$state.go('page.dashboard');
				alert(data.status);
				state = 'dashboard';
				$ionicLoading.hide();
			}
		}, function(response) {
			$ionicLoading.hide();
			$state.go('page.dashboard');
			state = 'dashboard';
			alert('Gagal melanjutkan, periksa kembali internet anda');
		});
		$scope.gotoMaps = function(posisi_lat,posisi_lng,tujuan_lat,tujuan_lng)
		{
			window.open("https://www.google.co.id/maps/dir/"+posisi_lat+","+posisi_lng+"/"+tujuan_lat+","+tujuan_lng);
		}
		$scope.gotoFormKonfirmasi = function(id_data)
		{
			formKonfirmasi.id_data = id_data;
			$state.go('page.konfirmasi');
			state = 'konfirmasi';
		}
	});
	app.controller('formKonfirmasi', function($state, $scope, $http, $ionicLoading, $ionicPopup, formKonfirmasi, detailOrder) {
		//LOADING
		$scope.loadingView = function(){
			$ionicLoading.show({
				template: 'Loading'
			});
		};
		$scope.alertSuccess = function() {
			$ionicPopup.alert({
				title: 'Konfirmasi Berhasil',
				template: 'Konfirmasi telah berhasil dilakukan'
			});
		};
		$ionicLoading.show();
		
		$scope.formKonfirmasi = formKonfirmasi;
		if(localStorage.getItem('Login') == 'YES')
		{
			$http({
				method : 'POST',
				url : base_url+'/get_detail_konfirm',
				headers: header_data ,
				data : {
						customer_id : localStorage.getItem('user_id'),
						id_data : formKonfirmasi.id_data,
						},
				timeout: 10000
			}).then(
			function(response) {
				var data = response.data;
				if(data.status == 'Success')
				{
					$scope.id_data = formKonfirmasi.id_data;
					$scope.total = data.total;
					$scope.tanggal = data.tanggal;
					$ionicLoading.hide();
				}
				else
				{
					$ionicLoading.hide();
					alert(data.message);
				}
			}, function(response) {
				$ionicLoading.hide();
				alert('Gagal melanjutkan, periksa kembali internet anda');
				$state.go('page.dashboard');
				state = 'dashboard';
			});
		}
		else
		{
			$state.go('login');
			state='login';
			$ionicLoading.hide();
		}
		
		$scope.sendConfirmation = function()
		{
			$ionicLoading.show();
			$http({
				method : 'POST',
				url : base_url+'/send_konfirmasi',
				headers: header_data ,
				data : {
						name : $scope.name,
						bank_tujuan : $scope.bank_tujuan,
						rekening : $scope.rekening,
						bank_pengirim : $scope.bank_pengirim,
						nominal : $scope.nominal,
						id_data : $scope.id_data,
						customer_id : localStorage.getItem('user_id'),
						},
				timeout: 10000
			}).then(
			function(response) {
				var data = response.data;
				if(data.status == 'Success')
				{
					detailOrder.order_id = $scope.id_data;
					$state.go('page.detailorder');
					state = 'detailorder';
					alert('Konfirmasi telah berhasi dikirim');
					$ionicLoading.hide();
				}  
				else
				{
					detailOrder.order_id = $scope.id_data;
					$ionicLoading.hide();
					alert(data.message);
					$state.go('page.detailorder');
					state = 'detailorder';
				}
			}, function(response) {
				$ionicLoading.hide();
				alert('Gagal melanjutkan, periksa kembali internet anda');
				$state.go('dashboard');
				state = 'dashboard';
			});
		}
		
	});
	app.controller('myorder', function($state, $scope, $http, $ionicLoading, $ionicPopup, myorder, detailOrder) {
		
		//LOADING
		$scope.loadingView = function(){
			$ionicLoading.show({
				template: 'Loading'
			});
		};
		
		$scope.alertNull = function() {
			$ionicPopup.alert({
				title: 'Order Failed !!',
				template: 'Form tidak boleh ada yang kosong !!'
			});
		}
		
		$scope.NotifSukses = function() {
			$ionicPopup.alert({
				title: 'Order Sukses',
				template: 'Order anda berhasil ditambahkan ke keranjang pesanan, silahkan mencheckout order untuk menyelesaikan'
			});
		}
		
		// GET LIST CART
		
		$ionicLoading.show();
		
		$scope.myorder = myorder;
		
		$http({
			method : 'POST',
			url : base_url+'/get_list_order',
			headers: header_data ,
			data : {
					token : token,
					customer : myorder.customer,
					page : 1,
					},
			timeout: 10000
		}).then(
		function(response) {
			var data = response.data;
			if(data.status == 'Success')
			{
				page = 1;
				$scope.list_order = data.list_order;
				$ionicLoading.hide();
			}
			else
			{
				$scope.list_order = data.list_order;
				$ionicLoading.hide();
			}
		}, function(response) {
			$ionicLoading.hide();
			$state.go('page.dashboard');
			state = 'dashboard';
			alert('Gagal melanjutkan, periksa kembali internet anda');
		});
		$scope.loadMoreData = function()
		{
			$ionicLoading.show();
			var halaman = page+1;
			$http({
				method : 'POST',
				url : base_url+'/get_list_order',
				headers: header_data ,
				data : {
						token : token,
						customer : localStorage.getItem('user_id'),
						page : halaman,
						},
				timeout: 10000
			}).then(
			function(response) {
				var data = response.data;
				if(data.status == 'Success')
				{
					var length_j = Object.keys(data.list_order).length;
					//console.log(page+" "+length_j);
					console.log($scope.list_order.length+" "+data.total_pesanan);
					
					if($scope.list_order.length < data.total_pesanan){
						page += 1;
						for(var x=0;x<length_j;x++){
							$scope.list_order.push({id: data.list_order[x].id,tanggal: data.list_order[x].tanggal,total: data.list_order[x].total,tipe_order: data.list_order[x].tipe_order,status_order: data.list_order[x].status_order});
						}
						$scope.moredata = true;
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}else{
					  var alertPopup = $ionicPopup.alert({
						title: "Alert",
						template: "Tidak ada menu lagi"
					  });
					}
					$ionicLoading.hide();
				}
				else
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
						title: "Alert",
						template: "Tidak ada menu lagi"
					  });
				}
			}, function(response) {
				$ionicLoading.hide();
				$state.go('page.dashboard');
				state = 'dashboard';
				alert('Gagal melanjutkan, periksa kembali internet anda');
			});
		}
		$scope.detail_order = function(order_id){
			
			detailOrder.order_id = order_id;
			$state.go('page.detailorder');
			state = 'detailorder';

		}
	});
	app.controller('kontakKami', function($state, $scope, $http, $ionicLoading, $ionicPopup, kontakKami) {
		
		//LOADING
		$scope.loadingView = function(){
			$ionicLoading.show({
				template: 'Loading'
			});
		};
		
		// GET LIST CART
		
		$ionicLoading.show();
		
		$scope.kontakKami = kontakKami;
		
		$http({
			method : 'POST',
			url : base_url+'/get_kontak_kami',
			headers: header_data ,
			data : {
					token : kontakKami.token,
					customer : localStorage.getItem('user_id'),
					},
			timeout: 10000
		}).then(
		function(response) {
			var data = response.data;
			if(data.status == 'Success')
			{
				$scope.alamat = data.alamat;
				$scope.phone = data.phone;
				$scope.whatsapp = data.whatsapp;
				$scope.posisi_lat = data.posisi_lat;
				$scope.posisi_lng = data.posisi_lng;
				$scope.company = data.name;
				var telepon = 'tel:'+data.phone;
				$scope.telepon = data.telepon;
				$ionicLoading.hide();
			}
			else
			{
				$state.go('page.dashboard');
				alert(data.status);
				state = 'dashboard';
				$ionicLoading.hide();
			}
		}, function(response) {
			$ionicLoading.hide();
			$state.go('page.dashboard');
			state = 'dashboard';
			alert('Gagal melanjutkan, periksa kembali internet anda');
		});
		
		$scope.gotoWhatsapp = function(whatsapp) {
			var link = 'https://api.whatsapp.com/send?phone=62';
			window.open(link + whatsapp, '_system','location=yes,enableViewportScale=yes,hidden=no');
		}
		$scope.gotoMaps = function(posisi_lat,posisi_lng)
		{
			window.open("https://www.google.co.id/maps/dir/"+posisi_lat+","+posisi_lng);
		}
	});
	
	app.controller('addAlamat', function($state, $filter, $scope, $http, $ionicLoading, $rootScope,$ionicPopup, addAlamat, cartpaket) {
		
		//LOADING
		$scope.loadingView = function(){
			$ionicLoading.show({
				template: 'Loading'
			});
		};
		
		$scope.alertNull = function() {
			$ionicPopup.alert({
				title: 'Order Failed !!',
				template: 'Tidak ada item pesanan yang dipilih !!'
			});
		}
		$scope.alertInputNull = function() {
			$ionicPopup.alert({
				title: 'Proses Failed !!',
				template: 'Tidak boleh ada from yang kosong !!'
			});
		}
		$scope.alertFailed = function(jarak) {
			$ionicPopup.alert({
				title: 'Notifikasi Lokasi',
				template: 'Jarak terlalu jauh, maksimal jarak '+jarak+' Km dari toko'
			});
		}
		$scope.NotifSukses = function() {
			$ionicPopup.alert({
				title: 'Order Sukses',
				template: 'Order anda berhasil dibuat, silahkan melakukan proses pembayaran sesuai pilihan anda'
			});
		}
		
		// GET LIST CART
		
		$ionicLoading.show();
		
		$scope.addAlamat = addAlamat;
		
		if((addAlamat.order_id.length > 0) || (addAlamat.order_id2.length > 0))
		{
			
			$http({
				method : 'POST',
				url : base_url+'/get_detail_order',
				headers: header_data ,
				data : {
						token : token,
						customer : localStorage.getItem('user_id'),
						paket_id : addAlamat.order_id,
						kilo_id : addAlamat.order_id2,
						},
				timeout: 10000
			}).then(
			function(response) {
				var data = response.data;
				if(data.status == 'Success')
				{
					$scope.dafault_alamat = 'NO';
					$scope.harga_jasa = data.harga_jasa;
					$scope.subtotal = data.total;
					
					$scope.paket_id = addAlamat.order_id;
					$scope.kilo_id = addAlamat.order_id2;
					$scope.date_now = new Date();
					$scope.total_jasa = 0;
					$scope.voucher_id = 0;
					$scope.potongan = 0;
					$scope.timeValue = null;
					$scope.dateValue = null;
					//$scope.area = {repeatSelect: null, data : response.data.area};
					$scope.tipe_pembayaran = {repeatSelect: null, data : response.data.tipe_pembayaran};
					
					if(response.data.alamat_customer == null)
					{
						console.log('oke');
						$scope.alamat_customer = null;
						initAutocomplete2();
						$scope.alamat = '';
					}
					else
					{
						$scope.alamat_customer = response.data.alamat_customer;
						for(var i = 0;i < $scope.alamat_customer.length;i++){
							$scope.lokasi_lat = $scope.alamat_customer[i].tujuan_lat;
							$scope.lokasi_lng = $scope.alamat_customer[i].tujuan_lng;
							$scope.destination_address = $scope.alamat_customer[i].alamat_maps;
							$scope.origin_address = $scope.alamat_customer[i].alamat_maps;
							$scope.alamat = $scope.alamat_customer[i].detail_alamat;
						}
						
					}
					$scope.grand_total = parseFloat($scope.harga_jasa)+parseFloat($scope.subtotal);
					$ionicLoading.hide();
				}
				else
				{
					$state.go('page.home');
					alert(data.status);
					state = 'home';
					$ionicLoading.hide();
				}
			}, function(response) {
				$ionicLoading.hide();
				$state.go('page.home');
				state = 'home';
				alert('Gagal melanjutkan, periksa kembali internet anda');
			});
		}
		else
		{
			$ionicLoading.hide();
			$scope.alertNull();
			//cartpaket.token = token;
			$state.go('page.dashboard');
			state = 'dashboard';
		}
		$scope.ubah_alamat = function () {
			$scope.alamat_customer = null;
			initAutocomplete2();
			$scope.alamat = '';
			$scope.lokasi_lat = '';
			$scope.lokasi_lng = '';
			$scope.destination_address = '';
		}
		$scope.change_simpan = function (isChecked) {

			if (isChecked) {
				alert('Alamat akan tersimpan segabagai default untuk anda melakukan order selanjutnya');
				$scope.simpan_alamat = 'YES';
				$scope.dafault_alamat = 'YES';
			} else {
				$scope.simpan_alamat = 'NO';
				$scope.dafault_alamat = 'NO';
			}
		};
		
		function initAutocomplete2() {

		  var map = new google.maps.Map(document.getElementById('map2'), {
			center: {lat: -6.3583925, lng: 106.875833},
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true
		  });

		  // Create the search box and link it to the UI element.
		  var input = document.getElementById('pac-input');
		  var searchBox = new google.maps.places.SearchBox(input);
		  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

		  // Bias the SearchBox results towards current map's viewport.
		  map.addListener('bounds_changed', function() {
			searchBox.setBounds(map.getBounds());
		  });
		  
		 
			
			if (navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
				  lat: position.coords.latitude,
				  lng: position.coords.longitude
				};
				console.log(position);
				
				markers = [];
				$scope.my_lokasi(pos);
				// For each place, get the icon, name and location.
				var bounds = new google.maps.LatLngBounds();
				
				  // Create a marker for each place.
				   var marker = new google.maps.Marker({
					  draggable: true,
					  zoom: 6, 
					  position: pos, 
					  map: map,
					  title: "Your location"
				  });
				  
				 google.maps.event.addListener(marker, 'dragend', function (event) {

					console.log(event.latLng.lat());
					var lokasi_drag = {
					  lat: event.latLng.lat(),
					  lng: event.latLng.lng()
					};
					
					$scope.my_lokasi(lokasi_drag);

				});
				
				  markers.push(marker);
				 				
				 
				
					
			  }, function() {
				handleLocationError(true, infoWindow, map.getCenter());
			  });
			} else {
			  // Browser doesn't support Geolocation
			  handleLocationError(false, infoWindow, map.getCenter());
			}

		  // [START region_getplaces]
		  // Listen for the event fired when the user selects a prediction and retrieve
		  // more details for that place.
		  searchBox.addListener('places_changed', function() {
			var places = searchBox.getPlaces();

			if (places.length == 0) {
			  return;
			}

			// Clear out the old markers.
			markers.forEach(function(marker) {
			  marker.setMap(null);
			});
			markers = [];

			// For each place, get the icon, name and location.
			var bounds = new google.maps.LatLngBounds();
			places.forEach(function(place) {
			  var icon = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			  };
			  
			   var marker = new google.maps.Marker({
					  draggable: true,
					  zoom: 6, 
					  position: place.geometry.location, 
					  map: map,
					  title: place.name,
				  });
				  
				  google.maps.event.addListener(marker, 'dragend', function (event) {

					console.log(event.latLng.lat());
					var lokasi_drag = {
					  lat: event.latLng.lat(),
					  lng: event.latLng.lng()
					};
					
					$scope.my_lokasi(lokasi_drag);

				});
				
				  markers.push(marker);

			  if (place.geometry.viewport) {
				console.log(markers[0].position);
				$scope.set_lokasi();
				bounds.union(place.geometry.viewport);
			  } else {
				bounds.extend(place.geometry.location);
			  }
			});
			map.fitBounds(bounds);

		  });
		 
		  
		  // [END region_getplaces]
		}
		$scope.my_lokasi = function(pos) {
			$http({
				method : 'POST',
				url : base_url+"/check_jarak",
				headers: header_data ,
				data : {
				token : token,
				lokasi : pos,
				},
				timeout: 10000
				} ).then(
			function(response) {
				var data = response.data;
				$scope.jarak = data.jarak;
				$scope.lokasi_lat = data.lokasi_lat;
				$scope.lokasi_lng = data.lokasi_lng;
				$scope.jarak_fix = data.jarak_fix;
				$scope.harga_jasa = $scope.harga_jasa;
				$scope.harga_kilo = $scope.harga_kilo;
				$scope.berat = $scope.berat;
				$scope.total_jasa = $scope.harga_jasa*data.jarak_fix;
				$scope.jarak_max = data.jarak_max;
				$scope.origin_address = data.destination_address;
				//$scope.destination_address = data.destination_address;
				$scope.get_biaya_cuci($scope.berat,$scope.harga_kilo,$scope.total_jasa);
				
				//alert(data.destination_address);
				$ionicLoading.hide();
			});
		}
		$scope.set_lokasi = function() {
			
			console.log('in');
			$scope.lokasi = markers[0].position;
			if($scope.lokasi != '')
			{
				$ionicLoading.show();
				$http({
				method : 'POST',
				url : base_url+"/check_jarak",
				headers: header_data ,
				data : {
				token : token,
				lokasi : $scope.lokasi,
				},
				timeout: 10000
				} ).then(
				function(response) {
					var data = response.data;
					
					if(parseFloat(data.jarak) > data.jarak_max)
					{
						$scope.alertFailed(data.jarak_max);
						$scope.origin_address = '';
					}
					else
					{
						$scope.jarak = data.jarak;
						$scope.lokasi_lat = data.lokasi_lat;
						$scope.lokasi_lng = data.lokasi_lng;
						$scope.jarak_fix = data.jarak_fix;
						$scope.harga_jasa = $scope.harga_jasa;
						$scope.subtotal = $scope.subtotal;
						$scope.total_jasa = $scope.harga_jasa*data.jarak_fix;
						$scope.jarak_max = data.jarak_max;
						$scope.origin_address = data.destination_address;
						//$scope.destination_address = data.destination_address;
						//$scope.get_biaya_cuci($scope.berat,$scope.harga_kilo,$scope.total_jasa);
						$scope.grand_total = parseFloat($scope.total_jasa)+parseFloat($scope.subtotal);
						alert(data.destination_address);
					}
					$ionicLoading.hide();
				});
			}
		};
		$scope.check_tanggal = function(tanggal)
		{
			$http({
				method : 'POST',
				url : base_url+"/check_tanggal",
				headers: header_data ,
				data : {
				tanggal : $filter('date')(tanggal, 'yyyy-MM-dd','+0700'),
				},
				timeout: 10000
				} ).then(
				function(response) {
					var data = response.data;
					if(data.status == 'Failed')
					{
						alert(data.pesan);
						$scope.dateValue = null;
					}
				});
		}
		
		$scope.checkOrderPaket = function(){
			
			
			if($scope.lokasi_lat != '')
			{
				$ionicLoading.show();
				$http({
				method : 'POST',
				url : base_url+"/check_jarak_last",
				headers: header_data ,
				data : {
				token : token,
				lokasi_lat : $scope.lokasi_lat,
				lokasi_lng : $scope.lokasi_lng,
				},
				timeout: 10000
				} ).then(
				function(response) {
					var data = response.data;
					
					if(parseFloat(data.jarak) > data.jarak_max)
					{
						$scope.alertFailed(data.jarak_max);
						$scope.origin_address = '';
					}
					else
					{
						$scope.jarak = data.jarak;
						$scope.lokasi_lat = data.lokasi_lat;
						$scope.lokasi_lng = data.lokasi_lng;
						$scope.jarak_fix = data.jarak_fix;
						$scope.harga_jasa = $scope.harga_jasa;
						$scope.subtotal = $scope.subtotal;
						$scope.total_jasa = $scope.harga_jasa*data.jarak_fix;
						$scope.jarak_max = data.jarak_max;
						$scope.origin_address = data.destination_address;
						//$scope.destination_address = data.destination_address;
						//$scope.get_biaya_cuci($scope.berat,$scope.harga_kilo,$scope.total_jasa);
						$scope.grand_total = parseFloat($scope.total_jasa)+parseFloat($scope.subtotal);
						//alert(data.destination_address);
						$scope.sendOrderPaket();
					}
					$ionicLoading.hide();
				});
			}
			else
			{
				$ionicLoading.hide();
				alert('Pilih lokasi maps lebih dahulu !!!');
			}
		}
		$scope.check_voucher = function(voucher,total_biaya,harga_jasa){
			
			if(voucher != null)
			{
				var grand_total = parseFloat(total_biaya)+parseFloat(harga_jasa);
				$ionicLoading.show();
				$http({
				method : 'POST',
				url : base_url+"/check_voucher",
				headers: header_data ,
				data : {
				token : token,
				voucher : voucher,
				grand_total : grand_total,
				},
				timeout: 10000
				} ).then(
				function(response) {
					var data = response.data;
					if(data.status == 'Success')
					{
						$scope.grand_total = data.grand_total;
						$scope.potongan = data.potongan;
						$scope.voucher_id = data.voucher_id;
					}
					else
					{
						alert('Kode voucher tidak valid, atau tidak order memenuhi syarat');
					}
					
					$ionicLoading.hide();
				});
			}
		}
		$scope.sendOrderPaket = function(){
			
			$ionicLoading.show();
			if(localStorage.getItem('Login') == 'YES')
			{
			console.log($scope.lokasi_lat);	
				if($scope.lokasi_lng != null && $scope.lokasi_lat != null )
				{
					if($scope.paket_id != null || $scope.kilo_id != null )
					{
						if($scope.subtotal != null && $scope.tipe_pembayaran.repeatSelect != null)
						{
							if($scope.harga_jasa != null && $scope.timeValue != null && $scope.dateValue != null && $scope.origin_address != null )
							{
								var waktu_penjemputan = $filter('date')($scope.dateValue, 'yyyy-MM-dd','+0700')+' '+$filter('date')($scope.timeValue, 'HH:mm','+0700');
								$http({
									method : 'POST',
									url : base_url+'/create_orders_paket',
									headers: header_data ,
									data : {
											token : token,
											customer : localStorage.getItem('user_id'),
											subtotal : $scope.subtotal,
											paket_id : $scope.paket_id,
											kilo_id : $scope.kilo_id,
											pembayaran : $scope.tipe_pembayaran.repeatSelect,
											dafault_alamat : $scope.dafault_alamat,
											alamat : $scope.alamat,
											harga_jasa : $scope.harga_jasa,
											penjemputan : waktu_penjemputan,
											destination_address : $scope.origin_address,
											voucher_id : $scope.voucher_id,
											potongan : $scope.potongan,
											lokasi_lng : $scope.lokasi_lng,
											lokasi_lat : $scope.lokasi_lat,
											jarak : $scope.jarak,
											},
									timeout: 10000
								 }).then(function(respone) {
									 var data = respone.data;
									if (data.status == 'Success') {
										
										$state.go('page.dashboard');
										state = 'dashboard';
										$scope.NotifSukses();
										total_cart = parseInt(total_cart)-parseInt(data.jumlah_delete);
										$rootScope.$broadcast('new-order', { any: {total_cart:total_cart} });
										$ionicLoading.hide();
										
									}
									else
									{
										$ionicLoading.hide();
										$scope.showAlert();
									}
								}, function(response) {
									$ionicLoading.hide();
									alert('Gagal melanjutkan, periksa kembali internet anda');
								});
							}
							else
							{
								console.log($scope.origin_address);
								$ionicLoading.hide();
								$scope.alertInputNull();
							}
						}
						else
						{
							
							$ionicLoading.hide();
							$scope.alertInputNull();
						}
					}
					else
					{
						
						$ionicLoading.hide();
						$scope.alertInputNull();
					}
				}
				else
				{
					
					$ionicLoading.hide();
					$scope.alertInputNull();
				}
			}
			else
			{
				$ionicLoading.hide();
				$state.go('login');
				state = 'login';
			}
		}
	});
	
	app.controller('cartpaket', function($state, $scope, $http, $ionicLoading, $ionicPopup, cartpaket, addAlamat,$rootScope) {
		
		//LOADING
		$scope.loadingView = function(){
			$ionicLoading.show({
				template: 'Loading'
			});
		};
		
		$scope.alertNull = function() {
			$ionicPopup.alert({
				title: 'Order Failed !!',
				template: 'Form tidak boleh ada yang kosong !!'
			});
		}
		
		$scope.NotifSukses = function() {
			$ionicPopup.alert({
				title: 'Order Sukses',
				template: 'Order anda berhasil ditambahkan ke keranjang pesanan, silahkan mencheckout order untuk menyelesaikan'
			});
		}
		
		// GET LIST CART
		
		$ionicLoading.show();
		
		$scope.cartpaket = cartpaket;
		
		$http({
			method : 'POST',
			url : base_url+'/get_list_item',
			headers: header_data ,
			data : {
					token : cartpaket.token,
					customer : localStorage.getItem('user_id'),
					},
			timeout: 10000
		}).then(
		function(response) {
			var data = response.data;
			if(data.status == 'Success')
			{
				$scope.total = data.total;
				$scope.list_kilo = data.list_kilo;
				$scope.list_item = data.list_item;
				if(data.list_item == null)
				{
					$scope.datanull = 'Show';
				}
				else
				{
					$scope.datanull = 'Hide';
				}

				$ionicLoading.hide();
			}
			else
			{
				$state.go('page.dashboard');
				alert(data.status);
				state = 'dashboard';
				$ionicLoading.hide();
			}
		}, function(response) {
			$ionicLoading.hide();
			$state.go('page.dashboard');
			state = 'dashboard';
			alert('Gagal melanjutkan, periksa kembali internet anda');
		});
		
		$scope.selected = [];
		$scope.selected2 = [];
		$scope.array_ = angular.copy($scope.array);
		
		$scope.checkedOrNot = function (id, isChecked, index) {
			console.log("index:" + index + " " + isChecked);

			if (isChecked) {
				$scope.selected.push(id);
			} else {
				var _index = $scope.selected.indexOf(id);
				$scope.selected.splice(_index, 1);
			}
		};
		$scope.checkedOrNot2 = function (id, isChecked, index) {
			console.log("index:" + index + " " + isChecked);

			if (isChecked) {
				$scope.selected2.push(id);
			} else {
				var _index = $scope.selected2.indexOf(id);
				$scope.selected2.splice(_index, 1);
			}
		};
		
		$scope.sendCartOrder = function(){
			
			$ionicLoading.show();
			
			addAlamat.order_id = $scope.selected;
			addAlamat.order_id2 = $scope.selected2;
			console.log(addAlamat.order_id);
			console.log(addAlamat.order_id2);
			$state.go('page.addAlamat');
			state = 'addAlamat';
			
		}
		$scope.sendCartDelete = function(){
			
			$ionicLoading.show();
			
			if($scope.selected != '')
			{
				$http({
					method : 'POST',
					url : base_url+'/delete_item_cart',
					headers: header_data ,
					data : {
							token : token,
							array : $scope.selected,
							},
					timeout: 10000
				}).then(
				function(response) {
					var data = response.data;
					if(data.status == 'Success')
					{
						total_cart = parseInt(total_cart)-parseInt(data.jumlah_delete);
						$rootScope.$broadcast('new-order', { any: {total_cart:total_cart} });
						$scope.selected = [];
						$scope.gotoCartPaket();
						
						$ionicLoading.hide();
					}
					else
					{
						$state.go('page.dashboard');
						alert(data.status);
						state = 'dashboard';
						$ionicLoading.hide();
					}
				}, function(response) {
					$ionicLoading.hide();
					$state.go('page.dashboard');
					state = 'dashboard';
					alert('Gagal melanjutkan, periksa kembali internet anda');
				});
			}
		}
		$scope.gotoCartPaket = function(){
			if(localStorage.getItem('Login') == 'YES')
			{
				$http({
					method : 'POST',
					url : base_url+'/get_list_item',
					headers: header_data ,
					data : {
							token : token,
							customer : localStorage.getItem('user_id'),
							},
					timeout: 10000
				}).then(
				function(response) {
					var data = response.data;
					if(data.status == 'Success')
					{
						$scope.list_item = data.list_item;
						if(data.list_item == null)
						{
							$scope.datanull = 'Show';
						}
						else
						{
							$scope.datanull = 'Hide';
						}
						$ionicLoading.hide();
					}
					else
					{
						$state.go('page.dashboard');
						alert(data.status);
						state = 'dashboard';
						$ionicLoading.hide();
					}
				}, function(response) {
					$ionicLoading.hide();
					$state.go('page.dashboard');
					state = 'dashboard';
					alert('Gagal melanjutkan, periksa kembali internet anda');
				});
			}
			else
			{
				$state.go('login');
				state = 'login';
			}
		};
		$scope.gotoAddAlamat = function(order_id){
			
			addAlamat.order_id = order_id;
			$state.go('page.addAlamat');
			state = 'addAlamat';
		};
	});
	app.controller('cucipaket', function($state, $scope, $http, $ionicLoading, $rootScope, $ionicPopup, cucipaket, cartpaket) {
		$scope.paket_qty = {};
		$scope.paket_id = {};
		//LOADING
		$scope.loadingView = function(){
			$ionicLoading.show({
				template: 'Loading'
			});
		};
		
		$scope.alertNull = function() {
			$ionicPopup.alert({
				title: 'Order Failed !!',
				template: 'Form tidak boleh ada yang kosong !!'
			});
		}
		
		$scope.NotifSukses = function() {
			$ionicPopup.alert({
				title: 'Order Sukses',
				template: 'Order anda berhasil ditambahkan ke keranjang pesanan, silahkan mencheckout order untuk menyelesaikan'
			});
		}
		
		// GET LIST PAKET
		
		$ionicLoading.show();
		
		$scope.cucipaket = cucipaket;
		
		$http({
			method : 'POST',
			url : base_url+'/get_list_paket',
			headers: header_data ,
			data : {
					token : cucipaket.token,
					},
			timeout: 10000
		}).then(
		function(response) {
			var data = response.data;
			if(data.status == 'Success')
			{
				$scope.list_paket = data.paket;
				$ionicLoading.hide();
			}
			else
			{
				$state.go('page.dashboard');
				alert(data.status);
				state = 'dashboard';
				$ionicLoading.hide();
			}
		}, function(response) {
			$ionicLoading.hide();
			$state.go('page.dashboard');
			state = 'dashboard';
			alert('Gagal melanjutkan, periksa kembali internet anda');
		});
		
		 // Triggered on a button click, or some other target
		$scope.showPopup = function(id_data) {
			
			if(localStorage.getItem('Login') == 'YES')
			{
				$scope.data = {}
					   
					var myPopup = $ionicPopup.show({
						template: '<input type="number" ng-model="data.jumlah">',
						title: 'Masukan Keranjang Pesanan',
						subTitle: 'Isi jumlah item pesanan',
						scope: $scope,
						buttons: [
						  { text: 'Cancel' },
						  {
							text: '<b>Add</b>',
							type: 'button-positive',
							onTap: function(e) {
							  if (!$scope.data.jumlah) {
								//don't allow the user to close unless he enters wifi password
								e.preventDefault();
							  } else {
								$ionicLoading.show();
								$http({
									method : 'POST',
									url : base_url+'/order_paket_proses',
									headers: header_data ,
									data : {
											token : token,
											qty : $scope.data.jumlah,
											id_data : id_data,
											customer : localStorage.getItem('user_id'),
											},
									timeout: 10000
								 }).then(function(respone) {
									var data = respone.data;
									if (data.status == 'Success') {

										$scope.NotifSukses();
										total_cart = parseInt(total_cart)+1;
										$rootScope.$broadcast('new-order', { any: {total_cart:total_cart} });
										$ionicLoading.hide();
										
									}
									else
									{
										$ionicLoading.hide();
										alert('Gagal melanjutkan, periksa kembali data yang anda masukan');
									}
								}, function(response) {
									$ionicLoading.hide();
									alert('Gagal melanjutkan, periksa kembali internet anda');
								});
							  }
							}
						  }
						]
					  });

					myPopup.then(function(res) {
						console.log('Tapped!', res);
					});
			}
			else
			{
				$ionicLoading.hide();
				$state.go('login');
				state = 'login';
			}
		};
		
	});
		
	app.controller('cucikilo', function($state, $scope, $http, $ionicModal,$filter,$ionicLoading, $rootScope, $ionicPopup, cucikilo, addAlamat) {
		
		//LOADING
		$scope.loadingView = function(){
			$ionicLoading.show({
				template: 'Loading'
			});
		};
		
		//ionic modal
		$ionicModal.fromTemplateUrl('templates/banner_promo.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
			
		});
		$scope.openModal = function() {
			$scope.modal.show();
		};
		 $scope.hideModal = function() {
			$scope.modal.hide();
		};
		//ionic alert
		$scope.alertNull = function() {
			$ionicPopup.alert({
				title: 'Order Failed !!',
				template: 'Form tidak boleh ada yang kosong !!'
			});
		}
		$scope.alertFailed = function(jarak) {
			$ionicPopup.alert({
				title: 'Notifikasi Lokasi',
				template: 'Jarak terlalu jauh, maksimal jarak '+jarak+' Km dari toko'
			});
		}
		
		$scope.NotifSukses = function() {
			$ionicPopup.alert({
				title: 'Order Sukses',
				template: 'Order anda selanjutnya akan diproses admin, silahkan lanjutkan pembayaran sesuai dengan Tipe Pembayaran yang anda pilih'
			});
		}
		
		$scope.plusOne = function(q, id,harga,biaya_cuci) {
			var qty_after = q + 1;
			$scope.biaya_cuci = parseFloat($scope.biaya_cuci) + parseFloat(harga);
			return q + 1;
		}
		$scope.minOne = function(q, id, harga,biaya_cuci) {
			var qty_after = q - 1;
			$scope.biaya_cuci = parseFloat($scope.biaya_cuci) - parseFloat(harga);
			return q - 1;
		}
		$scope.plusOneKilo = function(berat, harga_kilo,biaya_cuci) {
			//alert(harga_kilo);
			if(harga_kilo != 0)
			{
				//alert(berat);
				var berat_after = berat + 1;
				$scope.biaya_cuci = parseFloat($scope.biaya_cuci) + parseFloat(harga_kilo);
				$scope.berat = berat_after;
				//return berat_after;
			}
			else
			{
				alert("Pilih paket cuci kilo terlebih dahulu");
			}
		}
		$scope.minOneKilo = function(berat, harga_kilo,biaya_cuci) {
			
			if(berat > 0)
			{
				var berat_after = berat - 1;
				$scope.biaya_cuci = parseFloat($scope.biaya_cuci) - parseFloat(harga_kilo);
				$scope.berat = berat_after;
			}
			//return berat_after;
		}
		
		$scope.NotifSukses = function() {
			$ionicPopup.alert({
				title: 'Order Sukses',
				template: 'Order anda berhasil ditambahkan ke keranjang pesanan, silahkan mencheckout order untuk menyelesaikan'
			});
		}
		
		$scope.submitOrder = function() {
			// array list paket
			//console.log($scope.berat);
			var items = [];
			
			
			console.log($scope.list_paket.length);
			for(i = 0;i < $scope.list_paket.length;i++) {
				if ($scope.list_paket[i].qty != 0 ) {
					items.push({
						id : $scope.list_paket[i].id,
						qty : $scope.list_paket[i].qty,
						harga : $scope.list_paket[i].harga,
					});
				}
			}
			
			
			//check order
			if($scope.berat > 0 && $scope.berat != 'undefined' || items.length != '' && items.length > 0)
			{
				//console.log($scope.berat+'barat');
				if(($scope.berat != null || $scope.berat > 0) && $scope.berat != 'undefined' || items.length != '' && items.length > 0)
				{
					$ionicLoading.show();
					
					$http({
						method : 'POST',
						url : base_url+'/order_paket_proses',
						headers: header_data ,
						data : {
								token : token,
								items : items,
								kilo_paket : $scope.paket.repeatSelect,
								berat : $scope.berat,
								catatan : $scope.catatan,
								customer : localStorage.getItem('user_id'),
								},
						timeout: 10000
					 }).then(function(respone) {
						var data = respone.data;
						if (data.status == 'Success') {

							$scope.NotifSukses();
							if($scope.paket.repeatSelect !=null)
							{
								var new_cart = parseInt(items.length)+1;
							}
							else
							{
								var new_cart = parseInt(items.length);
							}
							total_cart = parseInt(total_cart)+parseInt(new_cart);
							$rootScope.$broadcast('new-order', { any: {total_cart:total_cart} });
							$state.go('page.home');
							state = 'home';
							$ionicLoading.hide();
							
						}
						else
						{
							$ionicLoading.hide();
							alert('Gagal melanjutkan, periksa kembali data yang anda masukan');
						}
					}, function(response) {
						$ionicLoading.hide();
						alert('Gagal melanjutkan, periksa kembali internet anda');
					});
				}
				else
				{
					alert('Isi berat lebih dulu atau kosongkan paket cuci kilo yang dipilih');
				}
					
			}
			else
			{
				alert('Isi pesanan terlebih dahulu');
			}
		}
		
		$ionicLoading.show();
		
		$scope.cucikilo = cucikilo;
		
		$http({
			method : 'POST',
			url : base_url+'/get_detail_cucikilo',
			headers: header_data ,
			data : {
					token : token,
					customer : localStorage.getItem('user_id'),
					},
			timeout: 10000
		}).then(
		function(response) {
			var data = response.data;
			var pembayaran = 'Melalui Kurir';
			if(data.status == 'Success')
			{
				$scope.paket = {repeatSelect: null, data : response.data.paket};
				$scope.harga_kilo = data.harga_kilo;
				$scope.catatan = '';
				$scope.minimal_cuci = 0;
				$scope.biaya_cuci = 0;
				
				$scope.list_paket = data.cuci_satuan;
				$ionicLoading.hide();
				
			}
			else
			{
				$state.go('page.dashboard');
				alert(data.status);
				state = 'dashboard';
				$ionicLoading.hide();
			}
		}, function(response) {
			$ionicLoading.hide();
			$state.go('page.dashboard');
			state = 'dashboard';
			alert('Gagal melanjutkan, periksa kembali internet anda');
		});
		
		$scope.check_banner = function() {
			var show_banner = localStorage.getItem('status_banner');
			$scope.check_versi();
			if(show_banner == 'YES' || show_banner == null)
			{
				$http({
					method : 'POST',
					url : base_url+"/check_banner",
					headers: header_data ,
					data : {
					token : token,
				},
				timeout: 10000
				} ).then(
				function(response) {
					var data = response.data;
					if(data.status == 'Success')
					{
						$scope.banner_image = data.banner;
						$scope.openModal();
						localStorage.setItem('status_banner','NO');
					}
				});
			}
		}
		$scope.showConfirm = function(link) {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Notifikasi Update',
				template: 'Tersedia pembaharuan aplikasi diplaystore, silahkan download aplikasi versi terbaru untuk melanjutkan proses'
			});

			confirmPopup.then(function(res) {
				if(res) {
					window.open("market://details?id=com.laundryonline.alo", "_system");
					localStorage.setItem('status_banner','YES');
					ionic.Platform.exitApp();
					navigator.app.exitApp(); // exit the app
				} else {
					window.close();
					localStorage.setItem('status_banner','YES');
					ionic.Platform.exitApp();
					navigator.app.exitApp(); // exit the app
				}
			});
		};
		$scope.check_versi = function() {
			
			$http({
				method : 'POST',
				url : base_url+"/check_versi",
				headers: header_data ,
				data : {
				number_version : number_version,
			},
			timeout: 10000
			} ).then(
			function(response) {
				var data = response.data;
				if(data.status == 'Update')
				{
					$scope.showConfirm(data.link);
				}
			});
		}
		
		$scope.set_lokasi = function() {
			
			$ionicLoading.show();
			$scope.lokasi = markers[0].position;
			if($scope.lokasi != '')
			{
				$http({
				method : 'POST',
				url : base_url+"/check_jarak",
				headers: header_data ,
				data : {
				token : token,
				lokasi : $scope.lokasi,
				},
				timeout: 10000
				} ).then(
				function(response) {
					var data = response.data;
					$scope.jarak = data.jarak;
					$scope.lokasi_lat = data.lokasi_lat;
					$scope.lokasi_lng = data.lokasi_lng;
					$scope.jarak_fix = data.jarak_fix;
					$scope.harga_jasa = $scope.harga_jasa;
					$scope.harga_kilo = $scope.harga_kilo;
					$scope.berat = $scope.berat;
					$scope.total_jasa = $scope.harga_jasa*data.jarak_fix;
					$scope.jarak_max = data.jarak_max;
					$scope.origin_address = data.destination_address;
					//$scope.destination_address = data.destination_address;
					$scope.get_biaya_cuci($scope.berat,$scope.harga_kilo,$scope.total_jasa);
					if(parseFloat(data.jarak) > data.jarak_max)
					{
						$scope.alertFailed(data.jarak_max);
					}
					alert(data.destination_address);
					$ionicLoading.hide();
				});
			}
		};
		
		$scope.get_biaya_cuci = function(berat,harga_kilo,harga_jasa)
		{
			var biaya_cuci = harga_kilo*berat;
			$scope.biaya_cuci = biaya_cuci;
			$scope.total_biaya = parseFloat(biaya_cuci)+parseFloat(harga_jasa);
		}
		
		
		$scope.changeFunc = function(id_data)
		{
			$ionicLoading.show();
			if(id_data != '')
			{
				$http({
				method : 'POST',
				url : base_url+'/get_price_kilo',
				headers: header_data ,
				data : {
						token : token,
						id_data : id_data,
						},
				timeout: 10000
				}).then(
				function(response) {
					var data = response.data;
					if(data.status == 'Success')
					{
						$scope.harga_kilo = data.harga;
						$scope.biaya_cuci = 0;
						//$scope.berat = '';
						$scope.total_biaya = 0;
						$scope.minimal_cuci = data.minimal_cuci;
						$scope.berat = null;
						$ionicLoading.hide();
					}
					else
					{
						$state.go('page.dashboard');
						alert(data.status);
						state = 'dashboard';
						$ionicLoading.hide();
					}
				}, function(response) {
					$ionicLoading.hide();
					$state.go('page.dashboard');
					state = 'dashboard';
					alert('Gagal melanjutkan, periksa kembali internet anda');
				});
			}
			else
			{
				$scope.harga_kilo = 0;
				$ionicLoading.hide();
			}
		}
		
	});
	
	
	app.controller('myCtrl', function($state, $scope, $http, $ionicLoading, $ionicPopup, $rootScope,cucikilo, cucipaket, myorder, cartpaket, kontakKami, accountInfo) {
		$scope.checkLogin = function() {
			
			if (localStorage.getItem('Login') == 'YES') {
				$scope.gotoHome();
				
			} 
			else
			{
				$scope.gotoLogin();
			}
		};
		$scope.gotoHome = function() {
			$state.go('page.home');
			state = 'home';
		};

		$scope.loadLogin = function() {

			if (localStorage.getItem('Login') == 'YES') {
				$scope.login_status = 'YES';
				//Push notifikasi FCM
				document.addEventListener("deviceready", function () {
					FCMPlugin.getToken(
						function(token){
							console.log(token);
							localStorage.setItem('registration_id',token);
							$scope.init_push(token);
						},
						function(err){
							console.log('error retrieving token: ' + err);
						}
					);

					FCMPlugin.subscribeToTopic('adminlaundry');

					FCMPlugin.onNotification(
					  function(data){
						var alertPopup = $ionicPopup.alert({
							title: "Notifikasi",
							template: data.text
						  });
						  console.log(data);
					  },
					  function(msg){
						console.log('onNotification callback successfully registered: ' + msg);
					  },
					  function(err){
						console.log('Error registering onNotification callback: ' + err);
					  }
					);
				}, false);
				
				//check status Customer
				$http( {
					method : 'POST',
					url: base_url + '/check_status_customer',
					headers: header_data ,
					data : {
						id : localStorage.getItem('user_id'),
					},
					timeout : 10000
				} ).then(
					function(response) {
						var data = response.data;
						if(data.status != 'Success')
						{
							localStorage.setItem('Login','NO');
							localStorage.setItem('user_id','');
							
							//alert('aaa');
							$state.go('login');
							state = 'login';
							$ionicLoading.hide();
							alert(response.data.status);
						}
						else
						{
							$scope.list_outlet = {repeatSelect: null, data : data.list_outlet};
							$scope.outlet_id = data.outlet_id;
							$scope.outlet_name = data.outlet_name;
						}
					}, function(response) {
						$ionicLoading.hide();
					});
			}
			else
			{
				$scope.login_status = 'NO';
			}
		};
		$scope.loadOutlet = function()
		{
			$http( {
				method : 'POST',
				url: base_url + '/load_outlet',
				headers: header_data ,
				data : {
					token : token,
				},
				timeout : 10000
			} ).then(
				function(response) {
					var data = response.data;
					if(data.status == 'Success')
					{
						$scope.list_outlet = {repeatSelect: null, data : data.list_outlet};
						$scope.outlet_id = data.outlet_id;
						$scope.outlet_name = data.outlet_name;
					}
				}, function(response) {
					$ionicLoading.hide();
				});
		}
		$scope.showPopup = function() {
			$scope.data = {};

			// An elaborate, custom popup
			var myPopup = $ionicPopup.show({
				template: '<select ng-model="list_outlet.repeatSelect" class="select_box" required><option value="">Pilih Outlet</option><option ng-repeat="outlet in list_outlet.data" value="{{outlet.id}}"  >{{outlet.name}}</option></select>',	
				title: 'Rubah Outlet',
				scope: $scope,
				buttons: [
				  { text: 'Cancel' },
				  {
					text: '<b>Save</b>',
					type: 'button-positive',
					onTap: function(e) {
					  if (!$scope.list_outlet.repeatSelect) {
						//don't allow the user to close unless he enters wifi password
						e.preventDefault();
					  } else {
						console.log($scope.list_outlet.repeatSelect);
						$ionicLoading.show();
						$http( {
							method : 'POST',
							url: base_url + '/update_outlet',
							headers: header_data ,
							data : {
								customer : localStorage.getItem('user_id'),
								outlet_id : $scope.list_outlet.repeatSelect,
							},
							timeout : 10000
						} ).then(
							function(response) {
								var data = response.data;
								if(data.status == 'Success')
								{
									alert('Data outlet telah berubah');
									$scope.outlet_name = data.outlet_name;
									total_cart = parseInt(data.total);
									$rootScope.$broadcast('new-order', { any: {total_cart:total_cart} });
								}
								
								$ionicLoading.hide();
								//$gotoHome();
							}, function(response) {
								$ionicLoading.hide();
							});
					  }
					}
				  }
				]
			});
		}
		$scope.get_cart_total = function()
		{
			$http({
			method : 'POST',
			url : base_url+'/get_cart_total',
			headers: header_data ,
			data : {
					user_id : localStorage.getItem('user_id'),
					},
			timeout: 10000
			}).then(
			function(response) {
				var data = response.data;
				
				$scope.total_cart = data.total;
				total_cart = data.total;
			});
		}
		$scope.init_push = function(reg_id)
		{
			$http( {
				method : 'POST',
				url: base_url + '/update_reg_id',
				headers: header_data ,
				data : {
					id : localStorage.getItem('user_id'),
					registration_id : reg_id
				},
				timeout : 10000
			} ).then(
				function(response) {
					$ionicLoading.hide();
					console.log(response.data.status);
				}, function(response) {
					$ionicLoading.hide();
				});
		}
		$scope.gotoCartPaket = function(){
			if(localStorage.getItem('Login') == 'YES')
			{
				cartpaket.token = token;
				$state.go('page.cartpaket');
				state = 'cartpaket';
			}
			else
			{
				$state.go('login');
				state = 'login';
			}
		};
		//LOADING
		$scope.loadingView = function(){
			$ionicLoading.show({
				template: 'Loading'
			});
		};
		
		$scope.alertNull = function() {
			$ionicPopup.alert({
				title: 'Register Failed !!',
				template: 'Form tidak boleh ada yang kosong !!'
			});
		}
		$scope.showAlert = function(status) {
			$ionicPopup.alert({
				title: 'Login Failed !!',
				template: status
			});
		}
		
		$scope.sendPost = function() {
			 
			$ionicLoading.show();
			
			if($scope.name != null && $scope.password != null && $scope.email != null && $scope.phone != null&& $scope.list_outlet.repeatSelect != null){
				var res = $http({
					method : 'POST',
					url : base_url+'/register_proses',
					headers: header_data ,
					data : {
							name : $scope.name, 
							password : $scope.password,
							email : $scope.email,
							phone : $scope.phone,
							outlet : $scope.list_outlet.repeatSelect
							},
					timeout: 10000
				 });
				res.success(function(data) {
					if (data.status == 'Success') {
						$scope.name = null;
						$scope.password = null;
						$scope.email = null;
						$scope.phone = null;
						
						localStorage.setItem('Login','YES');
						localStorage.setItem('user_id',data.user_id);
						$scope.total_cart = 0;
						total_cart = 0;
						$ionicLoading.hide();
						$scope.gotoHome();
					}
					else
					{						
						$ionicLoading.hide();
						alert(data.status);
					}
				}, function(data) {
					$ionicLoading.hide();
					alert('Gagal melanjutkan, periksa kembali internet anda');
				});
			}
			else
			{
				$scope.name = null;
				$scope.password = null;
				$scope.email = null;
				$scope.phone = null;
				
				$ionicLoading.hide();
				$scope.alertNull();
			}
		}
		
		$scope.sendLogin = function(){
			
			$ionicLoading.show();
			if($scope.email != null && $scope.password != null)
			{
				var send = $http({
					method : 'POST',
					url : base_url+'/login_proses',
					headers: header_data ,
					data : {
							password : $scope.password,
							email : $scope.email,
							},
					timeout: 10000
				 });
				 send.success(function(data) {
					if (data.status == 'Success') {

						$scope.password = "";
						$scope.email = "";
						
						$ionicLoading.hide();
						localStorage.setItem('Login','YES');
						localStorage.setItem('user_id',data.user_id);
						$scope.gotoHome();
						total_cart = data.total;
						$rootScope.$broadcast('new-order', { any: {total_cart:total_cart} });
						
						//window.location = 'dashboard.html';
					}
					else
					{
						$scope.password = "";
						$scope.email = "";
						
						$ionicLoading.hide();
						$scope.showAlert(data.message);
					}
				}, function(response) {
					$ionicLoading.hide();
					alert('Gagal melanjutkan, periksa kembali internet anda');
				});
			}
			else
			{
				$ionicLoading.hide();
				$scope.showNull();
			}
		}
		
		$scope.get_phone = function()
		{
			$http({
				method : 'POST',
				url : base_url+'/get_phone',
				headers: header_data ,
				data : {
						token : token,
						},
				timeout: 10000
			}).then(
			function(response) {
				var data = response.data;
				if(data.status == 'Success')
				{
					$scope.phone = data.phone;
					$ionicLoading.hide();
				}
				else
				{
					$state.go('page.dashboard');
					alert(data.status);
					state = 'dashboard';
					$ionicLoading.hide();
				}
			}, function(response) {
				$ionicLoading.hide();
				$state.go('page.dashboard');
				state = 'dashboard';
				alert('Gagal melanjutkan, periksa kembali internet anda');
			});
		};
		$scope.get_info = function()
		{
			$http({
				method : 'POST',
				url : base_url+'/get_info',
				headers: header_data ,
				data : {
						token : token,
						},
				timeout: 10000
			}).then(
			function(response) {
				var data = response.data;
				if(data.status == 'Success')
				{
					$scope.informasi = data.info;
					$ionicLoading.hide();
				}
				else
				{
					$state.go('page.dashboard');
					alert(data.status);
					state = 'dashboard';
					$ionicLoading.hide();
				}
			}, function(response) {
				$ionicLoading.hide();
				$state.go('page.dashboard');
				state = 'dashboard';
				alert('Gagal melanjutkan, periksa kembali internet anda');
			});
		};
		$scope.gotoCuci = function() {
			$state.go('page.cuci');
			state = 'cuci';
		};
		
		$scope.gotoDashboard = function() {
			$state.go('page.dashboard');
			state = 'dashboard';
		};
		$scope.gotoRegister = function() {
			$state.go('register');
			state = 'register';
		};
		$scope.gotoListPaket = function() {
			cucipaket.token = token;
			$state.go('page.cucipaket');
			state = 'cucipaket';
		};
		$scope.gotoMyOrder = function() {
			if(localStorage.getItem('Login') == 'YES')
			{
				myorder.customer = localStorage.getItem('user_id');
				$state.go('page.myorder');
				state = 'myorder';
			}
			else
			{
				$state.go('login');
				state = 'login';
			}
		};
		$scope.gotoCuciKilo = function() {
			cucikilo.token = token;
			$state.go('page.cucikilo');
			state = 'cucikilo';
			
		};
		$scope.gotoAccount = function() {

			accountInfo.customer = localStorage.getItem('user_id');
			$state.go('page.account');
			state = 'account';
			
		};
		$scope.gotoKontak = function() {
			kontakKami.token = token;
			$state.go('page.kontak_kami');
			state = 'kontak_kami';
		};
		$scope.gotoInfo = function() {
			$state.go('page.informasi');
			state = 'informasi';
		};
		
		if(localStorage.getItem('Login') == 'YES')
		{
			$http({
			method : 'POST',
			url : base_url+'/get_cart_total',
			headers: header_data ,
			data : {
					user_id : localStorage.getItem('user_id'),
					},
			timeout: 10000
			}).then(
			function(response) {
				var data = response.data;
				
				$scope.total_cart = data.total;
				total_cart = data.total;
			});
		}
		else
		{
			$scope.total_cart = 0;
			total_cart = 0;
		}
		$scope.$on('new-order', function(event, args) {
			var anyThing = args.any.total_cart;
			$scope.total_cart = anyThing;
		});
		/*
		//	init push notification using sender ID -> 363089005953
		var push;
		var initPush = function() {
			document.addEventListener("deviceready",
			function() {
				push = PushNotification.init({
					android: {
						// senderID: "976168007456",	// FCM
						// senderID: "363089005953",	// GCM

						senderID : "893528700728",	// FCM (Firebase based) Resto Mobile Kuliner Malinau

						sound : true,
						vibrate : true,
						forceShow : true
					},
					browser: {
						pushServiceURL: 'http://push.api.phonegap.com/v1/push'
					},
					ios: {
						alert: "true",
						badge: "true",
						sound: "true"
					},
					windows: {}
				});

				push.on('registration', function(data) {
					console.log("registration event");
					console.log(JSON.stringify(data));
					$ionicLoading.show();
					$http( {
						method : 'POST',
						url: base_url + '/update_reg_id',
						headers: header_data ,
						data : {
							id : localStorage.getItem('user_id'),
							registration_id : data.registrationId
						},
						timeout : 10000
					} ).then(
						function(response) {
							$ionicLoading.hide();
							console.log(response.data.status);
						}, function(response) {
							$ionicLoading.hide();
						});
				});


				push.on('notification', function(data) {
					console.log("notification event");
					console.log(JSON.stringify(data));
					alert(data.message);
					push.finish(function () {
						console.log('finish successfully called');
					});
				});

				push.on('error', function(e) {
					console.log(e);
					console.log("push error");
				});
			} ,false);
		};
		*/
		$scope.loadLogin();
		
	});
	