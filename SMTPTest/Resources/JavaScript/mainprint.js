var mainprint = function () {
    var instance = {};

    window.addEventListener('load', init);

    function init() {
        logger.Setup(".status_bar");
        console.log("Initializing...");

        //OXPd print set up for printlabel page
        var futureTree = oxpddiscovery.GetOXPdDiscoveryTree();

        futureTree.then(
            function (tree) {
                try {
                    oxpdprint.Setup(tree);
                    console.log('Click "Send Print Job" to Print Label');
                } catch (error) {
                    console.error(error);
                }
            },
            function (error) {
                console.error(error);
            }
        );
    };


    instance.print = function (document_location) {
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
                        window.location.replace('index.html');
                        console.log('Print job completed');

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
