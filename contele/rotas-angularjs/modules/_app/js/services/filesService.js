angular.module('filesService')
    .service('files', ['$q', '$http', 'appUrls', 'msgsService',
        function($q, $http, appUrls, msgsService) {
            return {
                convertXlsxToJson: function(inputFile) {
                    var fileProm = $q.defer();
                    var reader = new FileReader();

                    reader.onload = function(e) {
                        var fileRead = e.target.result;
                        var fileJs = XLSX.read(fileRead, { type: 'binary' });
                        var json = XLSX.utils.sheet_to_json(fileJs.Sheets[fileJs.SheetNames[0]], { raw: true, header: 1 });
                        fileProm.resolve(json);
                    };
                    reader.onerror = function(e) {
                        fileProm.reject(e);
                    }
                    reader.readAsBinaryString(inputFile);
                    return fileProm.promise;
                },
                getInfoFiles: function(inputFile, typeFiles) {
                    var fileProm = $q.defer();
                    var fileParts = inputFile.name.split('.');
                    var type = fileParts[(fileParts.length - 1)];
                    var fileAcceptable = false;

                    fileParts.splice(-1, 1);
                    fileParts.join('.');

                    for (var i = 0; i < typeFiles.length; i++) {
                        if (type == typeFiles[i]) {
                            fileAcceptable = true;
                        }
                    }
                    if (fileAcceptable) {
                        fileProm.resolve({
                            "fileName": inputFile.name,
                            "size": inputFile.size,
                            "type": type,
                            "name": fileParts[0]
                        });
                    } else {
                        fileProm.reject(msgsService.getMsg('app', 7));
                    }

                    return fileProm.promise;
                },
                uploadFiles: function(location, files, action) {
                    var uploadFileProm = $q.defer();
                    var form = new FormData();

                    form.append('file', files);
                    form.append('locationFile', location);
                    form.append('action', action);

                    var request = {
                        method: 'POST',
                        url: appUrls.getUrl(''),
                        data: form,
                        headers: {
                            'Content-Type': undefined
                        }
                    };
                    $http(request).then(function(filePostResult) {
                        uploadFileProm.resolve(filePostResult.data);
                    }).catch(function(filePostError) {
                        uploadFileProm.reject(filePostError);
                    });
                    return uploadFileProm.promise;
                },
                getCsvToExcel: function(JSONData, ReportTitle, ShowLabel) {
                    this.jsonToExcelFile(JSONData);
                    return;

                    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
                    var CSV = '';
                    if (ShowLabel) {
                        var row = "";
                        for (var index in arrData[0]) {
                            row += index + ';';
                        }
                        row = row.slice(0, -1);
                        CSV += row + '\r\n';
                    }
                    for (var i = 0; i < arrData.length; i++) {
                        var row = [];
                        for (var index in arrData[i]) {
                            var value = arrData[i][index];
                            row.push(String((value == undefined || value == null) ? "" : arrData[i][index]));
                        }
                        row = row.join(';');
                        CSV += row + '\r\n';
                    }

                    if (CSV == '') {
                        return msgsService('portugues', 'app', 3);
                    }

                    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
                    report = document.createElement('a')
                    angular.element(report)
                        .attr('href', uri)
                        .attr('download', ReportTitle + '.csv')
                    report.click();
                    return true;
                },
                jsonToExcelFile: function(jsonData, FileName, sheetName) {
                    var jsonToXlsData = XLSX.utils.json_to_sheet(jsonData);
                    var jsSheetWorkSpace = XLSX.utils.book_new();

                    // é possivel adicionar 2 tabs no xls
                    // exemplo.:
                    // var jsonToXlsData2 = XLSX.utils.json_to_sheet([{'a':1,'b':32},{'a':1,'b':32},{'a':1,'b':32},{'a':1,'b':32}]);
                    // XLSX.utils.book_append_sheet(jsSheetWorkSpace,jsonToXlsData2, 'nome da segunda tab');

                    XLSX.utils.book_append_sheet(jsSheetWorkSpace, jsonToXlsData, sheetName);
                    var excelDataToFile = XLSX.write(jsSheetWorkSpace, { bookType: 'xlsx', type: 'binary' });
                    var blobXls = this.createBlobData(excelDataToFile, { type: "application/octet-stream" });
                    return this.downloadBlob(blobXls, FileName);

                },
                createBlobData: function(dataToBlob, typeBlob) {
                    var buf = new ArrayBuffer(dataToBlob.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != dataToBlob.length; ++i) view[i] = dataToBlob.charCodeAt(i) & 0xFF;
                    return new Blob([buf], { type: typeBlob });
                },
                downloadBlob: function(blobFile, fileName) {
                    var linkHtml = document.createElement("a");
                    document.body.appendChild(linkHtml);
                    linkHtml.style = "display: none";
                    var urlToDownload = window.URL.createObjectURL(blobFile);
                    linkHtml.href = urlToDownload;
                    linkHtml.download = fileName;
                    linkHtml.click();
                    window.URL.revokeObjectURL(urlToDownload);
                    return true;
                }
            }
        }
    ])