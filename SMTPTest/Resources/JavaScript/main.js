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
				//Setup OXPd Discovery tree
				oxpdprint.Setup(discoveryTree);
				oxpddeviceinfo.Setup(discoveryTree);
				oxpddeviceinfo.GetManufacturerInfo()
					.then(function (deviceinfo) {
						try {
							//Save device information values
							oxpddeviceinfo.GetManufacturerInfo();
							serial = deviceinfo.deviceSerialNumber;
							host = deviceinfo.hostName;
							os = deviceinfo.firmwareVersion;
							mod = deviceinfo.modelName;
							ip = deviceinfo.ipAddress;
							prod = deviceinfo.productNumber;
							mac = deviceinfo.macAddress;

							//Display device information on html
							document.getElementById("serialnumber").innerHTML = serial;
							document.getElementById("hostname").innerHTML = host;
							document.getElementById("firmware").innerHTML = os;
							document.getElementById("model").innerHTML = mod;
							document.getElementById("network").innerHTML = ip;
							document.getElementById("productnum").innerHTML = prod;
							document.getElementById("mac").innerHTML = mac;

							//Store device information to local memory
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