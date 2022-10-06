# sleeve


Fetch (request) HTML from the website
Extract the HTML from the response
Traverse the DOM and extract the table containing exchange rates
Format table elements (tbody, tr, and td) and extract exchange rate values
Store exchange rate values in an object and send it to a worker thread using worker.postMessage()
Accept message from parent thread in worker thread using parentPort.on()
Store message in Firestore (Firebase database)