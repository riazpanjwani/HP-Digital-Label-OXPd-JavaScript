var serial, host, os, mod, ip, prod, mac, test = "N/A";

var main = function () {
	var instance = {};

	window.addEventListener('load', init);

	function init() {
		logger.Setup(".status_bar");
		console.log("Initializing...");

		var futureTree = oxpddiscovery.GetOXPdDiscoveryTree();

		futureTree.then(function (discoveryTree) {
			try {
				oxpdprint.Setup(discoveryTree);
				oxpddeviceinfo.Setup(discoveryTree);
				oxpddeviceinfo.GetManufacturerInfo()
					.then(function (deviceinfo) {
						try {
							oxpddeviceinfo.GetManufacturerInfo();
							serial = deviceinfo.deviceSerialNumber;
							host = deviceinfo.hostName;
							os = deviceinfo.firmwareVersion;
							mod = deviceinfo.modelName;
							ip = deviceinfo.ipAddress;
							prod = deviceinfo.productNumber;
							mac = deviceinfo.macAddress;

							document.getElementById("serialnumber").innerHTML = serial;
							document.getElementById("hostname").innerHTML = host;
							document.getElementById("firmware").innerHTML = os;
							document.getElementById("model").innerHTML = mod;
							document.getElementById("network").innerHTML = ip;
							document.getElementById("productnum").innerHTML = prod;
							document.getElementById("mac").innerHTML = mac;

							//host = String(deviceinfo.hostName); //test with String conversion
							//serial = deviceinfo.deviceSerialNumber; //test without String conversion
							localStorage.setItem("serialprint", serial);
							console.log("STORING SERIAL: " + serial);
							localStorage.setItem("hostprint", host);
							console.log("STORING HOST: " + host);
							localStorage.setItem("osprint", os);
							console.log("STORING FIRMWARE: " + os);
							localStorage.setItem("modprint", mod);
							console.log("STORING MODEL: " + mod);
							localStorage.setItem("ipprint", ip);
							console.log("STORING NETWORK: " + ip);
							localStorage.setItem("prodprint", prod);
							console.log("STORING PRODUCT: " + prod);
							localStorage.setItem("macprint", mac);
							console.log("STORING MAC: " + mac);
							console.log("Ready");
						}
						catch (err) {
							console.log('ManufacturerInfo: ' + 'err.name="' + err.name + '", ' + 'err.message="' + err.message);
						}
					}
					);
			}
			catch (err) {
				console.log('DiscoveryTree: ' + 'err.name="' + err.name + '", ' + 'err.message="' + err.message);
			}
		}
		);
	};

	instance.print = function (document_location) {
		/*var ip = "localhost";
		oxpddiscovery.Setup(ip);
		var printTree = oxpddiscovery.GetOXPdDiscoveryTree();

		//Setup OXPd Print
		printTree.then(
			function (tree) {
				try{
					oxpdprint.Setup(tree, ip);
					console.log("Initializing printer...");
				} catch {
					console.error(error);
				}
			},
			function(error){
				console.error(error);
			}
		);*/
		// Submit the print job
		var futurePrint = oxpdprint.PrintUri({
			documentUri: document_location
		});

		// Monitor the job progress using polling
		futurePrint.then(function (jobId) {
			var interval = setInterval(function () {
				var futureJob = oxpdprint.GetJobAttributes(jobId);
				futureJob.then(function (job) {

					if (job.jobState === oxpdprint.JobState.Aborted ||
						job.jobState === oxpdprint.JobState.Canceled ||
						job.jobState === oxpdprint.JobState.Completed) {
						// Job is complete
						console.log(document_location + " : " + job.jobStateReasons);
						clearInterval(interval);

					} else {
						// Job is still being processed
						console.log(document_location + " : " + job.jobState + " job " + jobId + "...");
					}
				},
					function (error) {
						console.error(error);
						clearInterval(interval);
					})
			}, 200);
		},
			function (error) {
				console.error(error);
				alert("Uh oh...\nLooks like something went wrong!\n\n" + document_location + "\n\n" + error);
			});
	};

	return instance;
}();